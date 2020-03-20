const BaseDao = require('../dao/trailit_user_baseDao');
const trailUserDao = new BaseDao('user_tour', 'user_tour_file', 'user_tour_detail');
//========================== Load Modules End ==============================================

function getAllTrail(data) {
    return trailUserDao.getAllTrails(data)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};

//========================== Export Module Start ===============================

module.exports = {
    getAllTrail
};