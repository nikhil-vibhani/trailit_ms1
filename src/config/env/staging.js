module.exports = {
	environment: 'staging',
	port: 4009,
	protocol: 'http',
	TAG: 'staging',
	pg: {
		dbName: process.env.STAGING_DBNAME,
		dbHost: process.env.STAGING_DBHOST,
		dbUser: process.env.STAGING_DBUSER,
        dbPassword: process.env.STAGING_DBPASSWORD,
        dbUrl: process.env.STAGING_PG_URL
	},
	swagger_port: 80,
	isStag: true,
};
