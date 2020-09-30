'use strict';

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// import promise from 'bluebird';
//========================== Load internal modules ====================

// Load user service
const trailUserService = require('./trailit_user_Service');
//========================== Load Modules End ==============================================

/**
 * @function testUserTour
*/

function createNewTrail(data) {
	return trailUserService.createUserTrail(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};

function updateTrail(data) {
	return trailUserService.updateTrail(data)
	.then(result => {
		return result;		
	})
	.catch(err => console.log(err));
}

function getAllTrails(data) {
	return trailUserService.getAllUserTrail(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};

function getTrailId(data) {
	return trailUserService.getUserTrailId(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};
function getUserTourData(data) {
	return trailUserService.getUserTourData(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};
function getAllCategory() {
	return trailUserService.getAllCategory()
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};
function deleteUserTrail(data) {
	return trailUserService.deleteUserTrail(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
}


//========================== Export Module Start ==============================

module.exports = {
	createNewTrail,
	updateTrail,
	getAllTrails,
	getTrailId,
	getUserTourData,
	getAllCategory,
	deleteUserTrail
};

//========================== Export Module End ===============================
