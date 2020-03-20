const { db } = require('../config');
const trailitDetailMapper = require('../trailit_detail/trailit_detail_Mapper');

class BaseDao {
    constructor(dbTable, sortTable) {
        this.table = dbTable;
        this.sortTable = sortTable;
    };

    /*
       ===========================  TRAILIT DETAIL  ===========================
    */

    // Disconnect database
    disconnectDatabase() {
        return db.destroy()
            .then(res => {
                console.log('Database disconnected');
            })
            .catch(err => console.log(err)); 
    };

    // Check for trailit detail
    async checkForExistingTrailitDetail(data) {
        try {            
            // Check for existing trailit detail
            // const result = await client.query(`SELECT * FROM ${this.table} WHERE trail_detail_id = ${data.trail_detail_id}`);

            // Check for existing trailit detail using Knex
            const result = await db.select().from(this.table).where({ trail_detail_id: data.trail_detail_id });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    // Insert new Trailit_Detail
    async insertTrailit_detail(data) {
        try {    
            // // Check for existing trailit file
            // const res = await this.checkForExistingTrailitDetail(data);
            
            // if (!res || res.length > 0) {
            //     console.log('Trailit File is already exist!');

            //     // Disconnect database
            //     await this.disconnectDatabase();

            //     // const result = trailitDetailMapper.trailitDetailExist();
            //     return trailitDetailMapper.trailitDetailExist();
            // }

            // Query for inserting data into database

                // Query with returning inserted data
                // const query = `INSERT INTO ${this.table} (trail_id, title, description, web_url, is_active, created, element_content) VALUES ('${data.trail_id}', '${data.title}', '${data.description}', '${data.web_url}', '${data.is_active}', '${data.created}', '${data.element_content}') RETURNING *`;

                // // Query without returning inserted data
                // const query = {
                //     text: `INSERT INTO ${this.table} (trail_id, title, web_url, element_content, file_type, created_date) VALUES($1, $2, $3, $4, $5, $6)`,
                //     values: [data.trail_id, data.title, data.web_url, data.element_content, data.file_type, data.created_date]               
                // };

            // // Database query
            // const res = await client.query(query);

            const res = await db(this.table).insert({ trail_id: data.trail_id, title: data.title, description: data.description, web_url: data.web_url, is_active: data.is_active, created: data.created, element_content: data.element_content }, ['*']);
            
            // // Disconnect database
            // await this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitDetailMapper.trailitDetailNotCreated();
            }

            // Insert trail_id into sorting table
            const response = await db(this.sortTable).insert({ trail_id: res[0].trail_detail_id }, ['*']);

            console.log(response[0]);

            if (!response || response.length == 0) {
                return trailitDetailMapper.trailitNotAddedToSort();
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

    // Read single trailit_detail
    async readTrailit_detail(data) {
        try {
            // Check for existing trailit detail
            const res = await this.checkForExistingTrailitDetail(data);

            // // Disconnect database
            // await this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitDetailMapper.trailitDetailNotExist();
            }

            // Return result
            return {
                result: res[0],
                statusCode: '200'
            };
            
        } catch (err) {
            // // Disconnect database
            // await this.disconnectDatabase();

            console.log(err);
        }
    };

    // Read trailit_details
    async readTrailit_details() {
        try {
            // Get all trailit details
            // const res = await client.query(`SELECT * FROM ${this.table}`);

            // Get all trailit details usign Knex
            const res = await db.select().from(this.table);

            // // Disconnect database
            // await this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitDetailMapper.trailitDetailNotExist();
            }
            
            // return results
            return {
                result: res,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
            
            // Disconnect database
            // await this.disconnectDatabase();
        }
    };
    
    // Update trailit_detail
    async updateTrailit_detail(data) {
        try {    
            // Check if trailit exist
            const result = await this.checkForExistingTrailitDetail(data);
    
            if (!result || result.length == 0) {
                // // Disconnect database
                // await this.disconnectDatabase();
    
                return trailitDetailMapper.trailitDetailNotExist();
            }

            let trail_id, title, description, web_url, is_active, created, updated, element_content;
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

            if (!data.updateValue.is_active) {
                is_active = result[0].is_active;
            } else {
                is_active = data.updateValue.is_active;
            }

            if (!data.updateValue.created) {
                created = result[0].created;
            } else {
                created = data.updateValue.created;
            }

            if (!data.updated) {
                updated = result[0].updated;
            } else {
                updated = data.updated;
            }
    
            // Update query
            // const query = `UPDATE ${this.table} SET trail_id = '${trail_id}', title = '${title}', description = '${description}', web_url = '${web_url}', is_active = '${is_active}', created = '${created}', updated = '${updated}', element_content = '${element_content}' WHERE trail_detail_id = '${data.trail_detail_id}' RETURNING *`;
    
            // Update task
            // const res = await client.query(query);

            // Update trailit detail using Knex
            const res = await db(this.table).where({ trail_detail_id: data.trail_detail_id }).update({ trail_id: trail_id, title: title, description: description, web_url: web_url, is_active: is_active, created: created, updated: updated, element_content: element_content }, ['*']);

            // // Disconnect database
            // await this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitDetailMapper.trailitDetailNotUpdated();
            }
    
            // Return result
            return {
                result: res[0],
                statusCode: '200'
            };

        } catch (err) {
            // // Disconnect database
            // await this.disconnectDatabase();

            console.log(err);
        }
    };

    // Delete trailit_detail
    async deleteTrailit_detail(data) {
        try {
            // Check if trailit detail exist
            const res = await this.checkForExistingTrailitDetail(data);

            if (!res || res.length == 0) {
                // // Disconnect database
                // await this.disconnectDatabase();

                return trailitDetailMapper.trailitDetailNotExist();
            }

            // Query for deleting trailit detail
            // const query = `DELETE FROM ${this.table} WHERE trail_detail_id = '${res[0].trail_detail_id}' RETURNING *`;
            // const result = await client.query(query);

            // Deleting trailit detail using Knex
            const result = await db(this.table).where({ trail_detail_id: res[0].trail_detail_id }).delete();

            // // Disconnect database
            // await this.disconnectDatabase();

            if (!result || result == 0) {
                return trailitDetailMapper.trailitDetailNotDeleted();
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

            // // Disconnect database
            // await this.disconnectDatabase();            
        }
    };
};

module.exports = BaseDao;