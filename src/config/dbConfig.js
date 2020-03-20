'use strict';

//=================================== Load Modules start ===================================

//=================================== Load external modules=================================
const { Pool, Client } = require('pg');

//=================================== Load Modules end =====================================

// Connect to Db
function connectDb(env, callback) {
	const { dbUrl } = env.pg;
	if (env.isProd) {
		console.info('configuring db in ' + env.TAG + ' mode');
		let connection = '';
		let errorConnection = false;
		try {
			connection = require('knex')({
				client: 'pg',
				connection: dbUrl,
			});
			errorConnection = false;
		} catch(e) {
			errorConnection = false;
		}
		
		callback(errorConnection);
	} else {
		console.info('configuring db in ' + env.TAG + ' mode');
		let connection = '';
		let errorConnection = false;
		try {
			connection = require('knex')({
				client: 'pg',
				connection: dbUrl,
			});	
			errorConnection = false;
		} catch(e) {
			errorConnection = false;
			
		}
		
		callback(errorConnection);
	}
}

module.exports = connectDb;


