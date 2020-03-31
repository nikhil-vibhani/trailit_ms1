"use strict";

//========================== Import module start =======================
const { Client } = require('pg');

const { db } = require('../config');
const trailitMapper = require('../trailit/trailitMapper');
const trailitDetailMapper = require('../trailit_detail/trailit_detail_Mapper');
const trailitFileMapper = require('../trailit_files/trailit_filesMapper');
const { connectDb, disconnectDb } = require('./database/db');

//========================== Import module end =======================

//========================== Class Definitions Start =====================

let client;

class BaseDao {
    constructor(dbTable) {
        //Get Model
        this.table = dbTable;
        // this.client = null;
    };    

    // Connect database
    // connectDatabase() {
    //     config.dbConfig(config.cfg, err => {	
    //         if (err == 'error') {
    //             console.log("errr", err)
    //             return;
    //         }

    //         this.client = new Client({
    //             connectionString: config.cfg.pg.dbUrl
    //         });

    //         return this.client.connect()
    //             .then(() => {
    //                 console.log('Database connected.');
    //             })
    //             .catch(err => {
    //                 console.log('Error while connection database!');
    //             })
    //     });        
    // };

    // // Disconnect database
    // disconnectDatabase() {
    //     return this.client.end()
    //         .then(() => {
    //             console.log('Database disconnected');
    //         })
    //         .catch(err => {
    //             console.log('Error while disconnecting database!');
    //         });
    // };

    // Check for trailit file
    async checkForExistingTrailitFile(data) {
        try {            
            // Check for existing trailit file
            const result = await client.query(`SELECT * FROM ${this.table} WHERE trail_file_id = ${data.trail_file_id}`);

            return result.rows;
        } catch (err) {
            console.log(err);
        }
    };

    // Check for trailit detail
    async checkForExistingTrailitDetail(data) {
        try {            
            // Check for existing trailit detail
            const result = await client.query(`SELECT * FROM ${this.table} WHERE trail_detail_id = ${data.trail_detail_id}`);

            return result.rows;
        } catch (err) {
            console.log(err);
        }
    };

    /*
       ===========================  TRAILIT  ===========================
    */

    // Create new Trailit
    async createNewTrailit(data) {
        try {
            // Connect to database
            await this.connectDatabase();

            // Query for inserting data into database
            const query = `INSERT INTO ${this.table} (user_id, trail_name) VALUES ('${data.user_id}', '${data.trail_name}') RETURNING *`;

            const res = await client.query(query);

            if (!res.rows || res.rows.length == 0) {
                // Disconnect database
                await this.disconnectDatabase();

                return trailitMapper.trailNotCreated();
            }

            // Disconnect database
            await this.disconnectDatabase();

            return {
                result: res.rows[0],
                statusCode: '201'
            };

        } catch (err) {
            console.log(err);

            // Disconnect database
            await this.disconnectDatabase();
        }
    };


    /*
       ===========================  TRAILIT DETAIL  ===========================
    */

    // Insert new Trailit_Detail
    async insertTrailit_detail(data) {
        try {
            // Connect to database
            await this.connectDatabase();
    
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
                const query = `INSERT INTO ${this.table} (trail_id, title, description, web_url, is_active, created, element_content) VALUES ('${data.trail_id}', '${data.title}', '${data.description}', '${data.web_url}', '${data.is_active}', '${data.created}', '${data.element_content}') RETURNING *`;

                // // Query without returning inserted data
                // const query = {
                //     text: `INSERT INTO ${this.table} (trail_id, title, web_url, element_content, file_type, created_date) VALUES($1, $2, $3, $4, $5, $6)`,
                //     values: [data.trail_id, data.title, data.web_url, data.element_content, data.file_type, data.created_date]               
                // };

            // Database query
            const res = await client.query(query);
            
            // Disconnect database
            await this.disconnectDatabase();

            if (!res.rows || res.rows.length == 0) {
                return trailitDetailMapper.trailitDetailNotCreated();
            }
    
            // Return results            
            return {
                result: res.rows,
                statusCode: '201'
            };

        } catch (err) {            
            // Disconnect database
            await this.disconnectDatabase();

            console.log(err);
        }
    };    

    // Read single trailit_detail
    async readTrailit_detail(data) {
        try {
            // Connect to database
            await this.connectDatabase();

            // Check for existing trailit detail
            const res = await this.checkForExistingTrailitDetail(data);

            // Disconnect database
            await this.disconnectDatabase();

            if (!res || res.length == 0) {
                return trailitDetailMapper.trailitDetailNotExist();
            }

            // Return result
            return {
                result: res,
                statusCode: '200'
            };
            
        } catch (err) {
            console.log(err);

            // Disconnect database
            await this.disconnectDatabase();
        }
    };

    // Read trailit_details
    async readTrailit_details() {
        try {
            // Connect to databse
            await this.connectDatabase();

            // Get all trailit details
            const res = await client.query(`SELECT * FROM ${this.table}`);

            // Disconnect database
            await this.disconnectDatabase();

            if (!res.rows || res.rows.length == 0) {
                return trailitDetailMapper.trailitDetailNotExist();
            }
            
            // return results
            return {
                result: res.rows,
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
            
            // Disconnect database
            await this.disconnectDatabase();
        }
    };
    
    // Update trailit_detail
    async updateTrailit_detail(data) {
        try {
            // Connect database
            await this.connectDatabase();
    
            // Check if trailit exist
            const result = await this.checkForExistingTrailitDetail(data);
    
            if (!result || result.length == 0) {
                // Disconnect database
                await this.disconnectDatabase();
    
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
            const query = `UPDATE ${this.table} SET trail_id = '${trail_id}', title = '${title}', description = '${description}', web_url = '${web_url}', is_active = '${is_active}', created = '${created}', updated = '${updated}', element_content = '${element_content}' WHERE trail_detail_id = '${data.trail_detail_id}' RETURNING *`;
    
            // Update task
            const res = await client.query(query);

            // Disconnect database
            await this.disconnectDatabase();

            if (!res.rows || res.rows.length == 0) {
                return trailitDetailMapper.trailitDetailNotUpdated();
            }
    
            // Return result
            return {
                result: res.rows[0],
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);

            // Disconnect database
            await this.disconnectDatabase();
        }
    };

    // Delete trailit_detail
    async deleteTrailit_detail(data) {
        try {
            // Connect to database
            await this.connectDatabase();

            // Check if trailit detail exist
            const res = await this.checkForExistingTrailitDetail(data);

            if (!res || res.length == 0) {
                // Disconnect database
                await this.disconnectDatabase();

                return trailitDetailMapper.trailitDetailNotExist();
            }

            // Query for deleting trailit detail
            const query = `DELETE FROM ${this.table} WHERE trail_detail_id = '${res[0].trail_detail_id}' RETURNING *`;

            const result = await client.query(query);

            // Disconnect database
            await this.disconnectDatabase();

            if (!result.rows || result.rows.length == 0) {
                return trailitDetailMapper.trailitDetailNotDeleted();
            }           

            return {
                result: {
                    message: 'Trail detail deleted!',
                    trail_detail_id: result.rows[0].trail_detail_id
                },
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);

            // Disconnect database
            await this.disconnectDatabase();            
        }
    };

    /*
        ===========================  TRAILIT FILE  ===========================
    */

    // Insert new Trailit file task
    async insertTrailitFile(data) {
        try {
            // Connect to database
            await this.connectDatabase();
    
            // // Check for existing trailit file
            // const res = await this.checkForExistingTrailitFile(data);
            
            // if (res.length > 0) {
            //     console.log('Trailit File is already exist!');

            //     // Disconnect database
            //     await this.disconnectDatabase();

            //     // const result = trailitFileMapper.trailitFileExist();
            //     return trailitFileMapper.trailitFileExist();
            // }

            // Query for inserting data into database

                // Query with returning inserted data
                const query = `INSERT INTO ${this.table} (trail_id, title, description, web_url, element_content, file_type, created) VALUES ('${data.trail_id}', '${data.title}', '${data.description}', '${data.web_url}', '${data.element_content}', '${data.file_type}', '${data.created}') RETURNING *`;

                // // Query without returning inserted data
                // const query = {
                //     text: `INSERT INTO ${this.table} (trail_id, title, web_url, element_content, file_type, created) VALUES($1, $2, $3, $4, $5, $6)`,
                //     values: [data.trail_id, data.title, data.web_url, data.element_content, data.file_type, data.created]               
                // };

            // Database query
            const res = await client.query(query);

            // Disconnect database
            await this.disconnectDatabase();    

            if (!res.rows || res.rows.length == 0) {
                return trailitFileMapper.trailitFileNotCreated();
            }            
    
            // Return results            
            return {
                result: res.rows,
                statusCode: '201'
            };

        } catch (err) {
            // Disconnect database
            await this.disconnectDatabase();

            console.log(err);
        }
    };

    // Read single trailit file
    async readTrailitFile(data) {
        try {
            // Check for existing task
            const res = await this.checkForExistingTrailitFile(data);

            if (!res || res.length == 0) {
                return trailitFileMapper.trailitFileNotExist();
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

    // Read trailit files
    async readTrailitFiles() {
        try {
            // // Connect to databse
            // await this.connectDatabase();

            // connnect database
            // console.log(await connectDb());
            
            // console.log('line: 472 ', dbConnection.select().from('user_tour_file'));

            dbConnection.select().from('user_tour_file')
                .then(data => {
                    console.log(data);
                })
                .catch(err => console.log(err));

            if (client) {
                // Get all results
                const res = await config.dbConnection.client.query(`SELECT * FROM ${this.table}`);
    
                console.log('line: 477: ', res);
                // Disconnect database
                await this.disconnectDatabase();
    
                if (!res || res.rows.length == 0) {
                    return trailitFileMapper.trailitFileNotExist();
                }
    
                // return results
                return {
                    result: res.rows,
                    statusCode: '200'
                };
            }

        } catch (err) {
            console.log(err);
        }
    };
    
    // Update trailit file
    async updateTrailitFile(data) {
        try {
            // Connect database
            await this.connectDatabase();
    
            // Check if trailit file exist
            const result = await this.checkForExistingTrailitFile(data);
    
            if (!result || result.length == 0) {
                // Disconnect database
                await this.disconnectDatabase();
    
                return trailitFileMapper.trailitFileNotExist();
            }

            let trail_id, title, description, file_type, web_url, element_content, updated;
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

            if (!data.updateValue.file_type) {
                file_type = result[0].file_type;
            } else {
                file_type = data.updateValue.file_type;
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

            if (!data.updated) {
                updated = result[0].updated;
            } else {
                updated = data.updated;
            }
    
            // Update query
            const query = `UPDATE ${this.table} SET trail_id = '${trail_id}', title = '${title}', description = '${description}', file_type = '${file_type}', web_url = '${web_url}', element_content = '${element_content}', updated = '${updated}' WHERE trail_file_id = '${data.trail_file_id}' RETURNING *`;
    
            // Update trailit file
            const res = await client.query(query);

            // Disconnect database
            await this.disconnectDatabase();

            if (!res || res.rows.length == 0) {
                return trailitFileMapper.trailitFileNotUpdated();
            }
    
            // Return result
            return {
                result: res.rows[0],
                statusCode: '200'
            };

        } catch (err) {
            console.log(err);
        }
    };

    // Delete trailit file
    async deleteTrailitFile(data) {
        try {
            // Connect to database
            await this.connectDatabase();
    
            // Check if trailit file exist
            const res = await this.checkForExistingTrailitFile(data);
    
            if (!res || res.length == 0) {
                // Disconnect database
                await this.disconnectDatabase();
    
                return trailitFileMapper.trailitFileNotExist();
            }
    
            // Query for deleting trailit file
            const query = `DELETE FROM ${this.table} WHERE trail_file_id = '${res[0].trail_file_id}' RETURNING *`;
    
            const result = await client.query(query);

            // Disconnect database
            await this.disconnectDatabase();

            if (!result.rows || result.rows.length == 0) {
                return trailitFileMapper.trailitFileNotDeleted();
            }
            
            return {
                result: {
                    message: 'Trail file deleted!',
                    trail_file_id: result.rows[0].trail_file_id
                },
                statusCode: '200'
            };

        } catch (err) {
            // Disconnect database
            await this.disconnectDatabase();

            console.log(err);
        }
    };
}
//========================== Class Definitions End =====================


//========================== Helper methods start =======================

//========================== Helper methods end =======================

//========================== Export module start =======================

module.exports = BaseDao;

//========================== Export module End =======================
