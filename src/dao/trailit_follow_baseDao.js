const { db } = require('../config');
const trailitFollowMapper = require('../trailit_trail_follow/trailit_follow_Mapper');

class BaseDao {
    constructor(dbTable, userTable) {
        this.table = dbTable;
        this.userTable = userTable;
    };

    /*
       ===========================  TRAILIT FOLLOW  ===========================
    */

    // Check for trailit follow
    async getPreviewUserTrails(data) {
        try {            
            // Check for existing trailit detail using Knex
            const result = await db.select().from(this.userTable).where({ user_id: data.previewUserId });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    // Insert new Trailit_Detail
    async insertTrailit_follow(data) {
        try {            
            // Get all preview user trails
            const response = await this.getPreviewUserTrails(data);

            if (response.length === 0) {
                return trailitFollowMapper.notTrailFound();
            }

            const previewUserTrails = response.map(el => {
                return {
                    follower_id: data.follower_id,
                    followed_id: el.trail_id.toString()
                };
            });

            // Insert follow data into table
            const res = await db(this.table).insert(previewUserTrails, ['*']);
            
            if (!res || res.length == 0) {
                return trailitFollowMapper.trailitFollowNotCreated();
            }
    
            // Return results
            return {
                result: res,
                statusCode: '201'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Read all trails that user followed of privewUser
    async readTrailits_follow(data) {
        try {
            // Get all preview user trails
            const response = await this.getPreviewUserTrails(data);

            if (response.length === 0) {
                return trailitFollowMapper.trailitFollowNotExist();
            }

            const trailIds = response.map(el => {
                return el.trail_id.toString();
            });

            // Read trailit detail using Knex
            const result = await db.select().from(this.table).whereIn('followed_id', trailIds);

            if (!result || result == 0) {
                return trailitFollowMapper.trailitFollowNotExist();
            }

            const userFollowedTrails = result.filter(el => {
                if (el.follower_id === data.follower_id) {
                    return el;
                }
            });

            return {
                result: {
                    message: userFollowedTrails.length > 0 ? 'Following' : 'Not following',
                    count: userFollowedTrails
                },
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);   
        }
    };

    // Delete trailit_follow
    async deleteTrailit_follow(data) {
        try {
            // Get all preview user trails
            const response = await this.getPreviewUserTrails(data);

            if (response.length === 0) {
                return trailitFollowMapper.trailitFollowNotExist();
            }

            const trailIds = response.map(el => {
                return el.trail_id.toString();
            });

            // Read trailit detail using Knex
            const res = await db.select().from(this.table).whereIn('followed_id', trailIds);

            if (!res || res == 0) {
                return trailitFollowMapper.trailitFollowNotExist();
            }

            const userFollowedTrailIds = res.map(el => {
                if (el.follower_id === data.follower_id) {
                    return el.followed_id;
                }
            });

            // Deleting trailit detail using Knex
            const result = await db(this.table).whereIn('followed_id', userFollowedTrailIds).delete();

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