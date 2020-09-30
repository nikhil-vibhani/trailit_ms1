const BaseDao = require('../dao/trailit_user_baseDao');
const trailUserDao = new BaseDao('user_tour', 'trail_user_action', 'trail_user_comment_like', 'user_tour_sort', 'user_tour_trail_data', 'user_tour_trail_follow', 'user_tour_trail_notification', 'trail_category');
//========================== Load Modules End ==============================================

function createNewTrail(data) {
    return trailUserDao.createUserTrail(data)
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

function getUserTourData(data) {
    return trailUserDao.getUserTourData(data)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};

function getAllCategory() {
    return trailUserDao.getAllCategory()
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
};


//========================== Export Module Start ===============================

module.exports = {
    createNewTrail,
    updateTrail,
    getAllTrail,
    getTrailId,
    getUserTourData,
    getAllCategory,
    deleteUserTrail
};