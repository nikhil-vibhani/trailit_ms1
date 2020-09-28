const { db } = require('../config');
const trailitMapper = require('../trailit/trailitMapper');

class BaseDao {
    constructor(dbTable) {
        this.table = dbTable;
    };

    /*
       ===========================  TRAILIT  ===========================
    */
    
    // Disconnect database
    disconnectDatabase() {
        return db.destroy()
            .then(res => {
                console.log('Database disconnected');
            })
            .catch(err => console.log(err)); 
    };

    // Create new Trailit
    async createNewTrailit(data) {
        try {
            // // Query for inserting data into database
            // const query = `INSERT INTO ${this.table} (user_id, trail_name) VALUES ('${data.user_id}', '${data.trail_name}') RETURNING *`;
            // const res = await client.query(query);

            // Inserting trailtit data using Knex
            const res = await db(this.table).insert({ user_id: data.user_id, trail_name: data.trail_name }, ['*']);

            if (!res || res.length == 0) {
                // // Disconnect database
                // await this.disconnectDatabase();

                return trailitMapper.trailNotCreated();
            }
            
            // // Disconnect database
            // await this.disconnectDatabase();

            return {
                result: res[0],
                statusCode: '201'
            };

        } catch (err) {
            console.log(err);

            // // Disconnect database
            // await this.disconnectDatabase();
        }
    };
};

module.exports = BaseDao;