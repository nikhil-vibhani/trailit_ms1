module.exports = {
    environment: 'production',
    port: process.env.PRODUCTION_PORT,
    protocol : 'http',
    TAG: "production",
    pg: {
        dbName: process.env.PRODUCTION_DBNAME,
        dbHost: process.env.PRODUCTION_DBHOST,
        dbUser: process.env.PRODUCTION_DBUSER,
        dbPassword: process.env.PRODUCTION_DBPASSWORD,
        dbUrl: process.env.PRODUCTION_PG_URL
    },
    // swagger_port : 80,
    isProd: true  
};
