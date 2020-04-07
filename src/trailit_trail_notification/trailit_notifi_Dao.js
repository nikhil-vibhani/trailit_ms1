const BaseDao = require('../dao/trailit_notifi_baseDao');
const trailit_notifi_Dao = new BaseDao('user_tour_trail_notification');

function getTrailitFromDb(data) {
    return trailit_notifi_Dao.readTrailit_detail(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailitsFromDb() {
    return trailit_notifi_Dao.readTrailit_details(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailitIntoDb(data) {
    return trailit_notifi_Dao.updateTrailit_detail(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailitFromDb(data) {
    return trailit_notifi_Dao.deleteTrailit_detail(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    getTrailitFromDb,
    getTrailitsFromDb,
    updateTrailitIntoDb,
    deleteTrailitFromDb
};