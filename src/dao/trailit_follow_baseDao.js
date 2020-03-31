const { db } = require('../config');
const trailitFollowMapper = require('../trailit_trail_follow/trailit_follow_Mapper');

class BaseDao {
    constructor(dbTable, sortTable) {
        this.table = dbTable;
        this.sortTable = sortTable;
    };

    /*
       ===========================  TRAILIT FOLLOW  ===========================
    */

    // Check for trailit follow
    async checkForExistingTrailitFollow(data) {
        try {            
            // Check for existing trailit detail using Knex
            const result = await db.select().from(this.table).where({ followed_id: data.followed_id });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    // Insert new Trailit_Detail
    async insertTrailit_follow(data) {
        try {
            // Check for existing trailit follow
            const response = await this.checkForExistingTrailitFollow(data);

            if (response.length !== 0) {
                return trailitFollowMapper.trailitFollowExist();
            }

            // Insert data into table
            const res = await db(this.table).insert({ follower_id: data.follower_id, followed_id: data.followed_id }, ['*']);
            
            if (!res || res.length == 0) {
                return trailitFollowMapper.trailitFollowNotCreated();
            }
    
            // Return results
            return {
                result: res[0],
                statusCode: '201'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Delete trailit_follow
    async deleteTrailit_follow(data) {
        try {
            // Deleting trailit detail using Knex
            const result = await db(this.table).where({ followed_id: data.followed_id, follower_id: data.follower_id }).delete();

            if (!result || result == 0) {
                return trailitFollowMapper.trailitFollowNotDeleted();
            }           

            return {
                result: {
                    message: 'Trail follow deleted!',
                    count: result
                },
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);   
        }
    };
};

module.exports = BaseDao;