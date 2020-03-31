module.exports = {
    environment: 'production',
    port: 7820,
    protocol : 'http',
    TAG: "production",
    pg: {
        dbName: 'trailit_detail',
        dbHost: '3.18.139.243',
        dbUser: 'postgres',
        dbPassword: 'Codezeros@123',
        dbUrl: 'postgres://postgres:Codezeros@123@3.18.139.243/trailit_detail?sslmode=require'
    },
    // swagger_port : 80,
    isProd: true  
};
