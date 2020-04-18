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
            const result = await db.select().from(this.notifiTable).where({ user_id: data.user_id });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    // Read single readTrailit_notification
    async readTrailit_notification(data) {
        try {
            // Check for existing trailit notification
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

    // Read all trailit_notifications
    async readTrailit_notifications(data) {
        try {
            // Get all trailit notification usign Knex
            const res = await db.select().from(this.notifiTable).where({ user_id: data.user_id, flag: data.flag });

            if (!res || res.length == 0) {
                return trailitNotifiMapper.trailitNotifiNotExist();
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
    
    // Update trailit_detail
    async updateTrailit_notification(data) {
        try {    
            console.log(data);
            // Check if trailit exist
            const result = await this.checkForExistingNotifiDetail(data);
    
            if (!result || result.length == 0) {    
                return trailitNotifiMapper.trailitNotifiNotExist();
            }

            console.log(result);

            let flag = data.updateValue.flag;

            // Update trailit detail using Knex
            const res = await db(this.notifiTable).where({ user_id: data.user_id }).update({ flag: flag, updated: data.updated }, ['*']);

            if (!res || res.length == 0) {
                return trailitNotifiMapper.trailitNotifiNotUpdated();
            }
    
            // Return result
            return {
                result: res,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Delete trailit_detail
    async deleteTrailit_notification(data) {
        try {
            // Check if trailit detail exist
            const res = await this.checkForExistingNotifiDetail(data);

            if (!res || res.length == 0) {
                return trailitNotifiMapper.trailitDetailNotExist();
            }

            const notificationIds = res.map(el => {
                if (el.flag === 'unread') {
                    return el.trail_notification_id;
                }
            });

            if (notificationIds.length > 0) {
                // Deleting trailit detail using Knex
                const result = await db(this.notifiTable).whereIn('trail_notification_id', notificationIds).delete();
                
                if (!result || result == 0) {
                    return trailitNotifiMapper.trailitDetailNotDeleted();
                }           
            }

            return {
                result: {
                    message: 'Trail notification removed!'
                },
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);          
        }
    };
};

module.exports = BaseDao;