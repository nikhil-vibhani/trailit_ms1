'use strict';
//========================== Load internal modules ====================

const trailUserDao = require('./trailit_user_Dao');
const AppUtil = require('../appUtils');

//========================== Load Modules End ==============================================

function createUserTrail(data) {
	return trailUserDao.createNewTrail(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};

function getAllUserTrail(data) {
	return trailUserDao.getAllTrail(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};

//========================== Export Module Start ==============================

module.exports = {
	createUserTrail,
	getAllUserTrail
};

//========================== Export Module End ===============================
