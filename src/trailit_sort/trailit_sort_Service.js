'use strict';
//========================== Load internal modules ====================

const trailSortDao = require('./trailit_sort_Dao');
const AppUtil = require('../appUtils');

//========================== Load Modules End ==============================================

function getAllSortedTrails(data) {
	return trailSortDao.getAllTrail(data)
		.then(result => {
			return result;
		})
		.catch(err => console.log(err));
};

//========================== Export Module Start ==============================

module.exports = {
	getAllSortedTrails,
};

//========================== Export Module End ===============================
