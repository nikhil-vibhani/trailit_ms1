const { db } = require('../config');
const trailitNotifiMapper = require('../trailit_trail_notification/trailit_notifi_Mapper');

class BaseDao {
    constructor(notifiTable) {
        this.notifiTable = notifiTable;
    };

    /*
       ===========================  TRAILIT NOTIFICATION  ===========================
    */

    // Check for trailit detail
    async checkForExistingNotifiDetail(data) {
        try {
            // Check for existing trailit detail using Knex
            const result = await db.select().from(this.table).where({ trail_notification_id: data.trail_notification_id });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    // Read single trailit_detail
    async readTrailit_detail(data) {
        try {
            // Check for existing trailit detail
            const res = await this.checkForExistingNotifiDetail(data);

            if (!res || res.length == 0) {
                return trailitNotifiMapper.trailitNotifiNotExist();
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

    // // Read trailit_details
    // async readTrailit_details() {
    //     try {
    //         // Get all trailit details
    //         // const res = await client.query(`SELECT * FROM ${this.table}`);

    //         // Get all trailit details usign Knex
    //         const res = await db.select().from(this.table);

    //         // // Disconnect database
    //         // await this.disconnectDatabase();

    //         if (!res || res.length == 0) {
    //             return trailitNotifiMapper.trailitDetailNotExist();
    //         }
            
    //         // return results
    //         return {
    //             result: res,
    //             statusCode: '200'
    //         };

    //     } catch (err) {
    //         console.log(err);
            
    //         // Disconnect database
    //         // await this.disconnectDatabase();
    //     }
    // };
    
    // Update trailit_detail
    async updateTrailit_detail(data) {
        try {    
            // Check if trailit exist
            const result = await this.checkForExistingNotifiDetail(data);
    
            if (!result || result.length == 0) {    
                return trailitNotifiMapper.trailitNotifiNotExist();
            }

            let flag;
            if (!data.updateValue.flag) {
                flag = result[0].flag;
            } else {
                flag = data.updateValue.flag;
            }

            // Update trailit detail using Knex
            const res = await db(this.table).where({ trail_notification_id: data.trail_notification_id }).update({ flag: data.flag }, ['*']);

            if (!res || res.length == 0) {
                return trailitNotifiMapper.trailitNotifiNotUpdated();
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

    // Delete trailit_detail
    async deleteTrailit_detail(data) {
        try {
            // Check if trailit detail exist
            const res = await this.checkForExistingNotifiDetail(data);

            if (!res || res.length == 0) {
                return trailitNotifiMapper.trailitDetailNotExist();
            }

            // Deleting trailit detail using Knex
            const result = await db(this.table).where({ trail_detail_id: res[0].trail_detail_id }).delete();
            
            if (!result || result == 0) {
                return trailitNotifiMapper.trailitDetailNotDeleted();
            }           

            return {
                result: {
                    message: 'Trail detail deleted!',
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