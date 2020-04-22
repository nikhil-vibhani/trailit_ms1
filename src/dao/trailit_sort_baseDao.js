const { db } = require('../config');
const trailitSortMapper = require('../trailit_sort/trailit_sort_Mapper');

class BaseDao {
    constructor(dbTable) {
        this.table = dbTable;
    };

    // Sort perticular user's all trails
    async sortingTrails(data) {
        const user_id = data[0].userId;

        // Add sort_id and trail_id in new array
        const updateArray = data.map((el, i) => {
            return {
                trail_id: el.trail_id,
                trail_sortid: i + 1,
                user_id: user_id
            };
        });
        
        // // Update sort table using update array
        // const res = await db(this.table).where({ user_id}).update(updateArray, ['*']);

        // if (!res || res.length === 0) {
        //     return trailitSortMapper.sortingFaild();
        // }

        // Performing transaction to update multiple row in table
        db.transaction(trx => {
            const queries = updateArray.map(el => {
                return db(this.table)
                    .where({ user_id: el.user_id, trail_id: el.trail_id })
                    .update({ trail_sortid: el.trail_sortid })
                    .transacting(trx)
            });

            Promise.all(queries)
                .then(trx.commit)
                .catch(trx.rollback);
        });

        return {
            result: 'Sorted trails updated!',
            status: '200'
        };
    };
};

module.exports = BaseDao;