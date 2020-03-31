const { db } = require('../config');
const trailitSortMapper = require('../trailit_sort/trailit_sort_Mapper');

class BaseDao {
    constructor(dbTable) {
        this.table = dbTable;
    };

    // Sort perticular user's all trails
    async sortingTrails(data) {
        // If array comes then this will work
        // data.trailList.forEach(el => {
        //     console.log(el);
        // });

        // // if object comes then this will work
        // const res = await db(this.table).where({ trail_id: data.trail_id }).update({ trail_sort_id: data.trail_sort_id });
    };
};

module.exports = BaseDao;