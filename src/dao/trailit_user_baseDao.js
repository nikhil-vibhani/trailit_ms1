const { db } = require('../config');
const trailUserMapper = require('../trailit_user/trailit_user_Mapper');
const _ = require('lodash');

class BaseDao {
    constructor(
        user_table,
        trail_user_action_table,
        trail_user_comment_like_table,
        
        user_tour_sort_table, 
        user_tour_trail_data_table,
        user_tour_trail_follow_table,
        user_tour_trail_notification_table,
        categoryTable,
        userCategoryTable
    ) {
        this.userTable = user_table;
        this.trailUserActionTable = trail_user_action_table;
        this.trailUserCommentLikeTable = trail_user_comment_like_table;
        this.userTourSortTable = user_tour_sort_table;
        this.userTourTrailDataTable = user_tour_trail_data_table;
        this.userTourTrailFollowTable = user_tour_trail_follow_table;
        this.userTourTrailNotificationTable = user_tour_trail_notification_table;
        this.categoryTable = categoryTable;
        this.userCategoryTable = userCategoryTable;
    };

    // Check for user's trail id
    async indexTrailId(data) {
        try {
            // Get user's trail id
            const result = await db.select().from(this.userTable).where({ user_id: data.userId });
            return result[0];
        } catch (err) {
            console.log(err);
        }
    };
    
    // Check uniq trail name
    async checkUniqTraiName(trailTitle, trail_id) {
        try {
            let condition = "";
            // Get user's trail id
            if(trail_id===undefined) {
                condition = ` trail_name='${trailTitle}'`;
            } else {
                condition = ` trail_name='${trailTitle}' AND trail_id!=${trail_id}`;
            }
            
            const result = await db.raw(`SELECT * FROM ${this.userTable} WHERE ${condition}`);
            
            return result.rowCount
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch user tour data
    async getUserTourData(data) {
        try {
            // Get user's trail id
            const result = await db.raw(`SELECT * FROM ${this.userTable} WHERE user_id='${data.userId}' ORDER BY trail_id asc`);
            
            return result.rows;
        } catch (err) {
            console.log(err);
        }
    };
    
    // Get All Category
    async getAllCategory() {
        try {
            const result = await db.select().from(this.categoryTable);
            return {
                result: result,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };
    
    // Create user trail
    async createUserTrail(data) {
        try {
            let checkTrail = await this.checkUniqTraiName(data.trailName);
            
            if(checkTrail > 0) {
                return trailUserMapper.trailitExist();
            }
            
            let obj = {
                user_id: data.userId,
                trail_name: data.trailName,
                trail_description: data.trail_description,
                trail_categor_id: data.trail_categor_id,
                trail_user_status: data.trail_user_status,
                cover_image_url: data.cover_image_url
            }
            
            // Insert into USER_TOUR table 
            const res = await db(this.userTable).insert(obj, ['*']);

            return res; 
        } catch (err) {
            console.log(err);
        }
    };

    // Update user trail
    async updateTrail(data) {
        try {
           
            let checkTrail = await this.checkUniqTraiName(data.trailName, data.trail_id);
            
            if(checkTrail > 0) {
                return trailUserMapper.trailitExist();
            }
            
            const objData = {
                trail_name: data.trailName,
                trail_description: data.trail_description,
                trail_categor_id: data.trail_categor_id,
                trail_user_status: data.trail_user_status,
                cover_image_url: data.cover_image_url
            };

            // Update USER_TOUR table 
            const res = await db(this.userTable).where({ trail_id: data.trail_id }).update(objData, ['*']);
            
            return res;
        } catch (err) {
            console.log(err);
        }
    };

    // Update user trail
    async UpdateTrailData(data) {
        try {
                        
            let objData = {
                unique_target_one: data.unique_target_one,
                responsive: data.responsive,
                mobile_media_type: data.mobile_media_type,
                mobile_title: data.mobile_title,
                mobile_description: data.mobile_description
            };
            
            // Update USER_TOUR table 
            const res = await db(this.userTourTrailDataTable).where({ trail_data_id: data.trail_data_id }).update(objData, ['*']);
            
            return res;
        } catch (err) {
            console.log(err);
        }
    };
    
    async deleteUserTrail(data) {
        try {
            // Delete trail_id
            const res = await db(this.userTable).where({ trail_id: data.trail_id }).delete();
            await db(this.trailUserActionTable).where({ trail_id: data.trail_id }).delete();
            await db(this.trailUserCommentLikeTable).where({ trail_id: data.trail_id }).delete();
            await db(this.userTourSortTable).where({ trail_id: data.trail_id }).delete();
            await db(this.userTourTrailDataTable).where({ trail_id: data.trail_id }).delete();
            await db(this.userTourTrailFollowTable).where({ followed_id: data.trail_id }).delete();
            await db(this.userTourTrailNotificationTable).where({ trail_id: data.trail_id }).delete();
            
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    // Get trail by category
    
    async getTrailByCategory(categories) {
        try {
            const { category_1, category_2, category_3 } = categories;
            const result = await db.raw(`SELECT * FROM ${this.userTable} WHERE trail_categor_id IN ('${category_1}', '${category_2}', '${category_3}') and trail_user_status = 'public' ORDER BY trail_categor_id asc`);

            return {
                result: result.rows,
                statusCode: '200'
            };
        } catch (err) {
            console.log(err);
        }
    };

    async addUserCategories(data) {
        try {
            let obj = {
                user_id: data.user_id,
                categories_list: data.categories_list
            }
            
            // Insert into USER_Category table 
            const res = await db(this.userCategoryTable).insert(obj, ['*']);

            return {
                result: res,
                statusCode: '200'
            }; 
        } catch (err) {
            console.log(err);
        }
    };

    async checkCategoriesExists(user_id) {
        try{
            const result = await db.raw(`SELECT * FROM ${this.userCategoryTable} WHERE user_id='${user_id}'`);
            
            let response = {};
            response.result = {};
            response.result.exists = result.rowCount > 0 ? true : false;
            response.statusCode = '200';
            if(response.result.exists){
                response.result.categories_list = result.rows[0].categories_list;
            }
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    // // Get user's all trails
    // async getAllTrails(data) {
    //     try {
    //         // Get user's trail id
    //         const res = await this.indexTrailId(data);
    
    //         // Get all trailit file of user
    //         const fileResult = await db.select().from(this.trailFileTable).where({ trail_id: res.trail_id });

    //         // Get all trailit detail of user
    //         const detailResult = await db.select().from(this.trailDetailTable).where({ trail_id: res.trail_id });

    //         const allTrails = fileResult.concat(detailResult);

    //         // Sort allTrails array by created property
    //         allTrails.sort((a, b) => {
    //             return a.created - b.created;
    //         });

    //         return {
    //             result: allTrails
    //         };
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
};

module.exports = BaseDao;