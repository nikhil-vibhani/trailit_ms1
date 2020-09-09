const { db } = require('../config');
const trailUserMapper = require('../trailit_user/trailit_user_Mapper');

class BaseDao {
    constructor(user_table) {
        this.userTable = user_table;
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

    // Fetch user tour data
    async getUserTourData(data) {
        try {
            // Get user's trail id
            const result = await db.select().from(this.userTable).where({ user_id: data.userId });
            
            return result[0];
        } catch (err) {
            console.log(err);
        }
    };

    // Create user trail
    async createUserTrail(data) {
        try {
            // Insert into USER_TOUR table 
            const res = await db(this.userTable).insert({ user_id: data.userId, trail_name: data.trailName }, ['*']);

            return res;
        } catch (err) {
            console.log(err);
        }
    };

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