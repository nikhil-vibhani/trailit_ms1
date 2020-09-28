"use strict";

//========================== Import module start =======================

const { db } = require('../config');
const trailitFileMapper = require('../trailit_files/trailit_filesMapper');
const IBMCOS = require('./cloud/ibm_cloud');
const cloud = new IBMCOS();

/*
    ===========================  TRAILIT FILE  ===========================
*/

class BaseDao {
    constructor(dbTable, sortTable) {
        this.table = dbTable;
        this.sortTable = sortTable;
    };

    // Disconnect database
    disconnectDatabase() {
        return db.destroy()
            .then(res => {
                console.log('Database disconnected');
            })
            .catch(err => console.log(err)); 
    };

    // Check for trailit file
    async checkForExistingTrailitFile(data) {
        try {            
            // Check for existing trailit file
            // const result = await client.query(`SELECT * FROM ${this.table} WHERE trail_file_id = ${data.trail_file_id}`);

            // Checking existing trailit file using KNEX
            const result = await db.select().from(this.table).where({ trail_file_id: data.trail_file_id });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    // Insert new Trailit file task
    async insertTrailitFile(data) {
        try {    
            // // Check for existing trailit file
            // const res = await this.checkForExistingTrailitFile(data);
            
            // if (res.length > 0) {
            //     console.log('Trailit File is already exist!');

            //     // Disconnect database
            //     await this.disconnectDatabase();

            //     // const result = trailitFileMapper.trailitFileExist();
            //     return trailitFileMapper.trailitFileExist();
            // }

            // Query for inserting data into database

                // Query with returning inserted data
                // const query = `INSERT INTO ${this.table} (trail_id, title, description, web_url, element_content, file_type, created) VALUES ('${data.trail_id}', '${data.title}', '${data.description}', '${data.web_url}', '${data.element_content}', '${data.file_type}', '${data.created}') RETURNING *`;

                // // Query without returning inserted data
                // const query = {
                //     text: `INSERT INTO ${this.table} (trail_id, title, web_url, element_content, file_type, created) VALUES($1, $2, $3, $4, $5, $6)`,
                //     values: [data.trail_id, data.title, data.web_url, data.element_content, data.file_type, data.created]               
                // };

            // Database query
            // const res = await client.query(query);

            // Inserting data using knex
            const res = await db(this.table).insert({ trail_id: data.trail_id, title: data.title, description: data.description, web_url: data.web_url, element_content: data.element_content, file_type: data.file_type, created: data.created }, ['*']);

            // // Disconnect database
            // await this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitFileMapper.trailitFileNotCreated();
            }

            // Insert trail_id into sorting table
            const response = await db(this.sortTable).insert({ trail_id: res[0].trail_file_id }, ['*']);
            
            if (!response || response.length == 0) {
                return trailitFileMapper.trailitNotAddedToSort();
            }
    
            // Return results            
            return {
                result: res[0],
                statusCode: '201'
            };

        } catch (err) {
            // // Disconnect database
            // await this.disconnectDatabase();

            console.log(err);
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

    // Read single trailit file
    async readTrailitFile(data) {
        try {
            // Check for existing task
            const res = await this.checkForExistingTrailitFile(data);

            // Disconnect database
            // await this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitFileMapper.trailitFileNotExist();
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

    // Read trailit files
    async readTrailitFiles() {
        try {
            // // Connect to databse
            // await this.connectDatabase();

            // connnect database
            // console.log(await connectDb());

            // Get all result using Knex 
            const res = await db.select().from(this.table);

            // Get all results
            // const res = await config.dbConnection.client.query(`SELECT * FROM ${this.table}`);

            // this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitFileMapper.trailitFileNotExist();
            }

            // return results
            return {
                result: res,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };
    
    // Update trailit file
    async updateTrailitFile(data) {
        try {    
            // Check if trailit file exist
            const result = await this.checkForExistingTrailitFile(data);

            if (!result || result.length == 0) {
                // // Disconnect database
                // await this.disconnectDatabase();
    
                return trailitFileMapper.trailitFileNotExist();
            }
            
            let trail_id, title, description, file_type, web_url, element_content, updated;
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

            if (!data.updateValue.file_type) {
                file_type = result[0].file_type;
            } else {
                file_type = data.updateValue.file_type;
            }

            if (!data.updateValue.web_url) {
                web_url = result[0].web_url;
            } else {
                web_url = data.updateValue.web_url;
            }

            if (!data.updateValue.element_content) {
                element_content = result[0].element_content;
            } else {
                element_content = data.updateValue.element_content;
            }
            
            if (!data.updated) {
                updated = result[0].updated;
            } else {
                updated = data.updated;
            }

            // // Update query
            // const query = `UPDATE ${this.table} SET trail_id = '${trail_id}', title = '${title}', description = '${description}', file_type = '${file_type}', web_url = '${web_url}', element_content = '${element_content}', updated = '${updated}' WHERE trail_file_id = '${data.trail_file_id}' RETURNING *`;
            
            // // Update trailit file
            // const res = await client.query(query);

            // Updating trailit file using Knex
            const res = await db(this.table).where({ trail_file_id: data.trail_file_id }).update({ trail_id: trail_id, title: title, description: description, file_type: file_type, web_url: web_url, element_content: element_content, updated: updated }, ['*']);
            // // Disconnect database
            // await this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitFileMapper.trailitFileNotUpdated();
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
    async deleteTrailitFile(data) {
        try {    
            // Check if trailit file exist
            const res = await this.checkForExistingTrailitFile(data);
    
            if (!res || res.length == 0) {
                // // Disconnect database
                // await this.disconnectDatabase();
    
                return trailitFileMapper.trailitFileNotExist();
            }
    
            // // Query for deleting trailit file
            // const query = `DELETE FROM ${this.table} WHERE trail_file_id = '${res[0].trail_file_id}' RETURNING *`;
            // const result = await client.query(query);

            // Deleting trailit file using Knex
            const result = await db(this.table).where({ trail_file_id: res[0].trail_file_id }).delete();    
            
            // // Disconnect database
            // await this.disconnectDatabase();

            if (!result || result == 0) {
                return trailitFileMapper.trailitFileNotDeleted();
            }
            
            return {
                result: {
                    message: 'Trail file deleted!',
                    count: result
                },
                statusCode: '200'
            };

        } catch (err) {
            // // Disconnect database
            // await this.disconnectDatabase();

            console.log(err);
        }
    };
}


module.exports = BaseDao;