const _ = require("lodash");
const dbConfig = require('./dbConfig');
const expressConfig = require('./expressConfig');
const path = require('path');
var envConfig = {};
var cfg = {};
var environment = process.env.NODE_ENV || 'prod';

//ENV Config
switch (environment) {    
    case 'dev' :
    case 'development' :
        envConfig = require('./env/development');
        break;
    case 'prod' :
    case 'start' :
    case 'production' :
        envConfig = require('./env/production');
        break;
    case 'stag' :
    case 'staging' :
        envConfig = require('./env/staging');
        break;
}

var defaultConfig = {
    environment: "development",
    ip: 'localhost',
    port: 3007,
    protocol : 'http',
    TAG: "development",
    uploadDir : path.resolve("./uploads"),
    pg: {
        dbName: process.env.DEFAULT_DBNAME,
        dbHost: process.env.DEFAULT_DBHOST,
        dbUser: process.env.DEFAULT_DBUSER,
        dbPassword: process.env.DEFAULT_DBPASSWORD,
        dbUrl: process.env.DEFAULT_PG_URL
    },
    swagger_port : 80
};
//Create Final Config JSON by extending env from default
var cfg = _.extend(defaultConfig, envConfig);

let db = require('knex')({
    client: 'pg',
    connection: {
        host: cfg.pg.dbHost,
        user: cfg.pg.dbUser,
        password: cfg.pg.dbPassword,
        database: cfg.pg.dbName
    },
});
const { attachPaginate } = require('knex-paginate');
attachPaginate();
//Export config module
module.exports = {
    cfg,
    dbConfig,
    expressConfig,
    db
};