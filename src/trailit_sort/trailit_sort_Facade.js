'use strict';

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// import promise from 'bluebird';
//========================== Load internal modules ====================
// Load user service
const trailSortService = require('./trailit_sort_Service');
//========================== Load Modules End ==============================================

/**
 * @function testUserTour
 */

function getAllTrails(data) {
	return trailSortService.getAllSortedTrails(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};


//========================== Export Module Start ==============================

module.exports = {
	getAllTrails,
};

//========================== Export Module End ===============================
