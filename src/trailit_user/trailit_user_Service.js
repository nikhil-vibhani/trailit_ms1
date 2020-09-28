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

function updateTrail(data) {
	return trailUserDao.updateTrail(data)
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

function getUserTrailId(data) {
	return trailUserDao.getTrailId(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};

function getUserTourData(data) {
	return trailUserDao.getUserTourData(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};

function deleteUserTrail(data) {
	return trailUserDao.deleteUserTrail(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
}

//========================== Export Module Start ==============================
module.exports = {
	createUserTrail,
	updateTrail,
	getAllUserTrail,
	getUserTrailId,
	getUserTourData,
	deleteUserTrail
};

//========================== Export Module End ===============================
