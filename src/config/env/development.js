module.exports = {
    environment: 'development',
    port: 3008,
    protocol : 'http',
    TAG: "development",
    pg: {
        dbName: 'trailit',
        dbHost: '127.0.0.1',
        dbUser: 'postgres',
        dbPassword: 'postgres',
        dbUrl: 'postgres://postgres:postgres@localhost/trailit?sslmode=require'
    },
    isDev:true
};
