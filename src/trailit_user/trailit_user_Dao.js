const BaseDao = require('../dao/trailit_user_baseDao');
const trailUserDao = new BaseDao('user_tour');
//========================== Load Modules End ==============================================

function createNewTrail(data) {
    return trailUserDao.createUserTrail(data)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};

function getAllTrail(data) {
    return trailUserDao.getAllTrails(data)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};

function getTrailId(data) {
    return trailUserDao.indexTrailId(data)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};

//========================== Export Module Start ===============================

module.exports = {
    createNewTrail,
    getAllTrail,
    getTrailId
};