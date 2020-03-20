const BaseDao = require('../dao/trailit_sort_baseDao');
const trailSortDao = new BaseDao('user_tour_sort');
//========================== Load Modules End ==============================================

function getAllTrail(data) {
    return trailSortDao.sortingTrails(data)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};

//========================== Export Module Start ===============================

module.exports = {
    getAllTrail
};