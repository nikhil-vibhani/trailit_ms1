const { db } = require('../config');
const trailUserMapper = require('../trailit_user/trailit_user_Mapper');

class BaseDao {
    constructor(trail, trailFileTable, trailDetailTable) {
        this.trailTable = trail;
        this.trailFileTable = trailFileTable;
        this.trailDetailTable = trailDetailTable;
    };

    // Check for user's trail id
    async getTrailIdOfUser(data) {
        try {
            // Get user's trail id
            const result = await db.select().from(this.trailTable).where({ user_id: data.userId });
            
            return result[0];
        } catch (err) {
            console.log(err);
        }

    };

    // Get user's all trails
    async getAllTrails(data) {
        try {
            // Get user's trail id
            const res = await this.getTrailIdOfUser(data);

            console.log(res);

            // Get all trailit file of user
            const fileResult = await db.select().from(this.trailFileTable).where({ trail_id: res.trail_id });

            // Get all trailit detail of user
            const detailResult = await db.select().from(this.trailDetailTable).where({ trail_id: res.trail_id });

            const allTrails = fileResult.concat(detailResult);

            // Sort allTrails array by created property
            allTrails.sort((a, b) => {
                return a.created - b.created;
            });

            return {
                result: allTrails
            };
        } catch (err) {
            console.log(err);
        }
    };
};

module.exports = BaseDao;