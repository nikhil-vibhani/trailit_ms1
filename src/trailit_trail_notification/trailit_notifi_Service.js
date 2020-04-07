const trailit_notifi_Dao = require('./trailit_notifi_Dao');

function getSingleTrailit(data) {
    return trailit_notifi_Dao.getTrailitFromDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getAllTrailit(data) {
    return trailit_notifi_Dao.getTrailitsFromDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitUpdate(data) {
    return trailit_notifi_Dao.updateTrailitIntoDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitDelete(data) {
    return trailit_notifi_Dao.deleteTrailitFromDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    getSingleTrailit,
    getAllTrailit,
    trailitUpdate,
    trailitDelete
};