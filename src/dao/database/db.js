const { Client } = require('pg');

const config = require('../../config');
let client;

// Connect database
const connectDb = async () => {    
    return config.dbConfig(config.cfg, async (err) => {	
        if (err == 'error') {
            console.log("errr", err)
            return;
        }

        client = new Client({
            connectionString: config.cfg.pg.dbUrl
        });

        await client.connect();
        console.log('Database connected.');
        return client;
        
            // .then(() => {
            // })
            // .catch(err => {
            //     console.log('Error while connection database!');
            // });

    });

};

// Disconnect database
const disconnectDb = () => {
    return client.end()
        .then(() => {
            console.log('Database disconnected');
        })
        .catch(err => {
            console.log('Error while disconnecting database!');
        });
};

module.exports = {
    connectDb,
    disconnectDb
};