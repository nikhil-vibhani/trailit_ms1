"use strict";

//========================== Import module start =======================

const { db } = require('../config');
const trailitDataMapper = require('../trailit_trail_data/trailit_dataMapper');
const IBMCOS = require('./cloud/ibm_cloud');
const cloud = new IBMCOS();

/*
    ===========================  TRAILIT FILE  ===========================
*/

let socketIo;
let ioSocket;
let userId;
let userDbTable;
let followDbTable;
let notifiDbTable;

class BaseDao {
    constructor(dbTable, sortTable, userTable, followTable, notificationTable) {
        this.table = dbTable;
        this.sortTable = sortTable;
        this.userTable = userTable;
        this.followTable = followTable;
        this.notfiTable = notificationTable

        userDbTable = userTable;
        followDbTable = followTable;
        notifiDbTable = notificationTable;
    };

    // Check for trailit data
    async checkForExistingTrailitData(data) {
        try {
            let result;
            if (data.trail_id) {
                // Checking existing trailit data using KNEX
                result = await db.select().from(this.table).where({ trail_id: data.trail_id });

            } else if (data.trail_data_id) {
                // Checking existing trailit data using KNEX
                result = await db.select().from(this.table).where({ trail_data_id: data.trail_data_id });
            }

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    // Insert new Trailit data task
    async insertTrailitData(data) {
        try {
            // Create new array for user_tour table table and get userId and title
            const userDataArray = data.map(obj => {
                return {
                    user_id: obj.user_id,
                    trail_name: obj.title
                };  
            });       

            // Insert into USER_TOUR table 
            const res = await db(this.userTable).insert(userDataArray, ['*']);

            if (!res || res.length == 0) {
                return trailitDataMapper.trailitNotCreated();
            }

            // Create new array for user_tour_trail_data table and remove userId and trailIndex from data array
            const dataArray = data.map((obj, i) => {
                for (let j = 0; j <res.length; j++) {
                    if (i === j) {
                        return {
                            trail_id: res[j].trail_id,
                            title: obj.title,
                            description: obj.description,
                            web_url: obj.web_url,
                            url: obj.url,
                            type: obj.type,
                            media_type: obj.media_type,
                            path: obj.path,
                            selector: obj.selector,
                            class: obj.class,
                            unique_target: obj.unique_target,
                            created: obj.created
                        };
                    }
                }
            });

            // // Modified array
            // const dataArray = data.map(obj => {
            //     return {
            //         trail_id: obj.trail_id,
            //         title: obj.title,
            //         description: obj.description,
            //         web_url: obj.web_url,
            //         url: obj.url,
            //         type: obj.type,
            //         media_type: obj.media_type,
            //         path: obj.path,
            //         selector: obj.selector,
            //         class: obj.class,
            //         unique_target: obj.unique_target,
            //         created: obj.created
            //     };
            // });

            // Inserting data into USER_TOUR_TRAIL_DATA
            let dataRes = await db(this.table).insert(dataArray, ['*']);

            if (!dataRes || dataRes.length == 0) {
                return trailitDataMapper.trailitDataNotCreated();
            }

            // Create array for user_tour_sort table and get trail_id 
            const sortArray = dataRes.map((el, i) => {
                for (let i = 0; i < data.length; i++) {
                    if (el.created == data[i].created) {
                        return {
                            trail_id: el.trail_id,
                            user_id: data[i].user_id,
                            trail_sortid: data[i].trailIndex
                        };
                    }
                }
            });

            // Insert trail_id into USER_TOUR_SORT
            const response = await db(this.sortTable).insert(sortArray, ['*']);

            if (!response || response.length == 0) {
                return trailitDataMapper.trailitNotAddedToSort();
            }

            return {
                result: dataRes,
                statusCode: '201'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Socket connection
    socket(socket, io) {
        socketIo = socket;
        ioSocket = io;        
        let ids = [];

        // Get userId from client using socket
        socket.on('userId', async (data) => {
            userId = data;
            socket.join(data);

            try {
                const res = await this.getFollowers();

                if (res.followersList && res.followersList.length > 0) {
                    // Create new Map with unique followers
                    const followerMap = new Map();
        
                    res.followersList.forEach(el => {
                        followerMap.set(el.follower_id, el);
                    });

                    const userIds = [];

                    followerMap.forEach((value, key) => {
                        userIds.push(key);
                    });
                    
                    socket.emit('followerList', userIds);
                } else {
                    socket.emit('followerList', []);
                }

            } catch (err) {
                console.log(err);
            }
        });
        
        // Get send notification
        socket.on('sendNotification', async (creatorId) => {
            try {
                // // Get all trails of user
                // const allTrails = await db.select().from(userDbTable).where({ user_id: userId });
    
                // // Create new array with followed_ids
                // const followedIds = allTrails.map(trail => {
                //     return trail.trail_id;
                // });
    
                // // Get followers list
                // const followersList = await db.select().from(followDbTable).whereIn('followed_id', followedIds);
    
                const res = await this.getFollowers();

                if (res.followersList && res.followersList.length > 0) {
                    // Create new Map with unique followers
                    const followerMap = new Map();
        
                    res.followersList.forEach(el => {
                        followerMap.set(el.follower_id, el);
                    });
        
                    // Adding trail_id and followed_id in ids array
                    followerMap.forEach((value, key) => {
                        for (let i = 0; i < res.allTrails.length; i++) {
                            if (value.followed_id == res.allTrails[i].trail_id) {
                                ids.push({
                                    trail_id: res.allTrails[i].trail_id,
                                    trail_follow_id: value.trail_follow_id,
                                    follower_id: value.follower_id
                                });
                            }
                        }
                    });

                    // Create notification of latest trail
                    const lastTrailId = res.allTrails[res.allTrails.length - 1].trail_data_id;

                    const notificationData = [{
                        trailUrl: `https://trail.codezeros.com/trailit/api/v1/userTourDataDetail/readTrailit_trail_data_tour/${lastTrailId}?user_id=${userId}`
                    }];                    
        
                    // Creating notification url
                    // res.allTrails.forEach(el => {
                    //     // Url changable as per domain
                    //     notificationUrl.push(`https://trail.codezeros.com/trailit/api/v1/userTourDataDetail/readTrailit_trail_data_tour/${el.trail_data_id}?user_id=${userId}`);
                    // });
        
                    // Creating notification array to bulk insert
                    const notifiArray = ids.map(el => {
                        return {
                            trail_follow_id: el.trail_follow_id,
                            trail_id: el.trail_id,
                            notification: notificationData,
                            flag: 'unread',
                            created: new Date().getTime(),
                            user_id: el.follower_id,
                            creator_id: creatorId
                        };  
                    });
        
                    const notifiRes = await db(notifiDbTable).insert(notifiArray, ['*']);
        
                    if (!notifiRes || notifiRes == 0) {
                        return trailitDataMapper.trailitNotifiNotAdded();
                    }
    
                    // Send notification using Socket.io
                    followerMap.forEach(key => {
                        // Send message to each rooms
                        io.in(key.follower_id).emit('notification', notificationData);
                    });
                } 
                
            } catch (err) {
                console.log(err);
                socket.emit('notification', { errorMsg: 'Error while sending notification' });
            }
        });

        // Disconnecting socket
        socket.on('disconnect', () => {
            console.log('Socket is disconnected');
        });
    };

    async getFollowers() {
        try {
            // Get all trails of user
            const allTrails = await db.select().from(userDbTable).where({ user_id: userId });
    
            // Create new array with followed_ids
            const followedIds = allTrails.map(trail => {
                return trail.trail_id;
            });

            // Get followers list
            const followersList = await db.select().from(followDbTable).whereIn('followed_id', followedIds);

            return {
                followersList,
                allTrails
            };
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    // Uploading profile image file into cloud
    async profileImage(data) {
        try {
            // Post profile image into cloud
            const res = await cloud.createObjectInBucket(data.file);

            return {
                result: res,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Uploading media file into cloud
    async mediaUploadToCloud(data) {
        try {
            // Post media file in cloud
            const res = await cloud.createObjectInBucket(data.file);

            return {
                result: res,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Uploading image file into cloud
    async fileUploadToCloud(data) {
        try {
            // Post image file in cloud
            const res = await cloud.createObjectInBucket(data.file);

            return {
                result: res,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Read single trailit file by trail_id and user_id
    async indexTrailData(data) {
        const { trail_id, user_id } = data;

        try {
            // Check for existing trail by trail_id and user_id
            const res = await db.select().from(this.userTable).where({ trail_id: trail_id, user_id });

            if (!res || res.length == 0) {
                return trailitDataMapper.trailitDataNotExist();
            }

            // Get trail data by trail_id
            const result = await db.select().from(this.table).where({ trail_id: res[0].trail_id });

            if (!result || result.length == 0) {
                return trailitDataMapper.trailitDataNotExist();
            }

            return {
                result,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Read single trailit file
    async readTrailitData(data) {
        try {
            // Check for existing trail
            const res = await this.checkForExistingTrailitData(data);

            if (!res || res.length == 0) {
                return trailitDataMapper.trailitDataNotExist();
            }

            // Get user_id by trail_id
            const userRes = await db.select().from(this.userTable).where({ trail_id: res[0].trail_id });

            // Get follower of that trail
            const response = await db.select().from(this.followTable).where({ followed_id: res[0].trail_id });

            // Get followers and follower count in new variable
            const followers = [];
            let followerCount = 0;
            response.forEach(el => {
                followers.push(el.follower_id);
            });

            followerCount = followers.length;

            // Final obj with followers and follower count properties
            const finalObj = {
                ...res[0],
                user_id: userRes[0].user_id,
                follower_id: followers,
                follower_count: followerCount
            };

            // Return result
            return {
                result: finalObj,
                statusCode: '200'
            };
            
        } catch (err) {
            console.log(err);
        }
    };

    // Read trailit files
    async readTrailitAllData(data) {        
        try {
            // Get user's all trails result using Knex 
            const userData = await db.select().from(this.userTable).where({ user_id: data.userId });

            // Get sorting value of trails using user_id
            const sortedTrails = await db.select().from(this.sortTable).where({ user_id: data.userId });

            // Pushing trial ids into new array            
            const userTrailIds = userData.map(el => {
                return el.trail_id;
            });

            // Get trails details by trail_ids
            let res = await db.select().from(this.table).whereIn('trail_id', userTrailIds);

            if (!res || res.length == 0) {
                return trailitDataMapper.trailitDataNotExist();
            }

            if (sortedTrails && sortedTrails.length > 0) {
                res.forEach(el => {
                    for (let i = 0; i < sortedTrails.length; i++) {
                        if (el.trail_id === sortedTrails[i].trail_id) {
                            el.trail_sortId = sortedTrails[i].trail_sortid;
                        }
                    }
                });

                // Sort res array by sort id
                res.sort((a, b) => {
                    return a.trail_sortId - b.trail_sortId;
                });
            }

            // Get all trail's id in array
            const trail_idArray = res.map(el => {
                return el.trail_id;
            });

            // Get followers of that trails
            const response = await db.select().from(this.followTable).whereIn('followed_id', trail_idArray);

            // Get all followers of trail in follower object
            let followerObj = {};
            for (let j = 0; j < response.length; j++) {                    
                res.forEach((el, i) => {
                    if (el.trail_id === response[j].followed_id) {
                        if (typeof followerObj[el.trail_id] !== 'object') {
                            followerObj[el.trail_id] = new Array(response[j].follower_id);
                        } else {
                            followerObj[el.trail_id].push(response[j].follower_id);
                        }
                    }
                });
            };
            
            // Merge follower of trail and res in new Array
            let finalArray = [...res];
            finalArray.forEach(obj => {
                for (let el in followerObj) {
                    if (obj.trail_id === el) {
                        obj.follower_id = followerObj[el];
                        obj.follower_count = followerObj[el].length;
                    } else {
                        if (!obj.follower_id && !obj.follower_count ) {
                            obj.follower_id = [];
                            obj.follower_count = 0;
                        }
                    }
                };
            });

            // return results
            return {
                result: finalArray,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Update trailit file using trail id and flag
    async updateTrailData(data) {
        try {
            // Check if trailit file exist
            const result = await this.checkForExistingTrailitData(data);

            if (!result || result.length == 0) {    
                return trailitDataMapper.trailitDataNotExist();
            }

            // Check for previeous continue flag
            const response = await db.select().from(this.table).where({ flag: 'continue' });

            if (response && response.length > 0) {
                // Remove that flag from that trail
                await db(this.table).where({ trail_id: response[0].trail_id }).update({ flag: '' });
            }

            // Updating trailit file using Knex
            const res = await db(this.table).where({ trail_id: data.trail_id }).update({ flag: data.flag }, ['*']);
            
            if (!res || res.length == 0) {
                return trailitDataMapper.trailitDataNotUpdated();
            }
    
            // Return result
            return {
                result: res[0],
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };
    
    // Update trailit file
    async updateTrailitData(data) {
        try {    
            // Check if trailit file exist
            const result = await this.checkForExistingTrailitData(data);

            if (!result || result.length == 0) {    
                return trailitDataMapper.trailitDataNotExist();
            }

            let trail_id, title, description, type, mediaType, web_url, url, path, selector, uniqueTarget, dataClass, updated;
            
            if (!data.updateValue.trail_id) {
                trail_id = result[0].trail_id;
            } else {
                trail_id = data.updateValue.trail_id;
            }

            if (!data.updateValue.title) {
                title = result[0].title;
            } else {
                title = data.updateValue.title;
            }

            if (!data.updateValue.description) {
                description = result[0].description;
            } else {
                description = data.updateValue.description;
            }

            if (!data.updateValue.type) {
                type = result[0].type;
            } else {
                type = data.updateValue.type;
            }

            if (!data.updateValue.mediaType) {
                mediaType = result[0].mediaType;
            } else {
                mediaType = data.updateValue.mediaType;
            }

            if (!data.updateValue.web_url) {
                web_url = result[0].web_url;
            } else {
                web_url = data.updateValue.web_url;
            }

            if (!data.updateValue.url) {
                url = result[0].url;
            } else {
                url = data.updateValue.url;
            }

            if (!data.updateValue.path) {
                path = result[0].path;
            } else {
                path = data.updateValue.path;
            }

            if (!data.updateValue.selector) {
                selector = result[0].selector;
            } else {
                selector = data.updateValue.selector;
            }

            if (!data.updateValue.uniqueTarget) {
                uniqueTarget = result[0].uniqueTarget;
            } else {
                uniqueTarget = data.updateValue.uniqueTarget;
            }

            if (!data.updateValue.dataClass) {
                dataClass = result[0].dataClass;
            } else {
                dataClass = data.updateValue.dataClass;
            }

            if (!data.updated) {
                updated = result[0].updated;
            } else {
                updated = data.updated;
            }

            // Updating trailit file using Knex
            const res = await db(this.table).where({ trail_data_id: data.trail_data_id }).update({ trail_id: trail_id, title: title, description: description, type: type, media_type: mediaType, web_url: web_url, url: url, path: path, selector: selector, unique_target: uniqueTarget, class: dataClass, updated: updated }, ['*']);
            
            if (!res || res.length == 0) {
                return trailitDataMapper.trailitDataNotUpdated();
            }
    
            // Return result
            return {
                result: res[0],
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Delete trailit file
    async deleteTrailitData(data) {
        try {    
            // Check if trailit file exist
            const res = await this.checkForExistingTrailitData(data);
    
            if (!res || res.length == 0) {
                return trailitDataMapper.trailitDataNotExist();
            }

            // Deleting trailit data using Knex
            const result = await db(this.table).where({ trail_data_id: res[0].trail_data_id }).delete();    

            if (!result || result == 0) {
                return trailitDataMapper.trailitdataNotDeleted();
            }

            // remove trailit data from sort table
            const response = await db(this.sortTable).where({ trail_id: res[0].trail_id }).delete();

            if (!response || response == 0) {
                return trailitDataMapper.trailitNotRemovedFromSort();
            }

            // // remove trailit data from user tour table 
            // const delRes = await db(this.userTable).where({ trail_id: res[0].trail_id }).delete();

            // console.log('delRes', delRes);

            // if (!delRes || delRes == 0) {
            //     return trailitDataMapper.trailitMainTableDataNotDeleted();
            // }

            // // remove trailit follow data from user tour follow table
            // const delFollow = await db(this.followTable).where({ followed_id: res[0].trail_id }).delete();

            // if (!delFollow || delFollow == 0) {
            //     return trailitDataMapper.trailitFollowNotDeleted();
            // }

            return {
                result: {
                    message: 'Trail data deleted!',
                    count: result
                },
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };
}


module.exports = BaseDao;