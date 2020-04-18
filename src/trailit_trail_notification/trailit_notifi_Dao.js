const BaseDao = require('../dao/trailit_notifi_baseDao');
const trailit_notifi_Dao = new BaseDao('user_tour_trail_notification');

function getTrailitFromDb(data) {
    return trailit_notifi_Dao.readTrailit_notification(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailitsFromDb(data) {
    return trailit_notifi_Dao.readTrailit_notifications(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailitIntoDb(data) {
    return trailit_notifi_Dao.updateTrailit_notification(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailitFromDb(data) {
    return trailit_notifi_Dao.deleteTrailit_notification(data)
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