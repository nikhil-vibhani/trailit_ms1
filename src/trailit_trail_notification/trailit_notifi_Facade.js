const trailit_notifi_Service = require('./trailit_notifi_Service');

function getTrailit(data) {
    return trailit_notifi_Service.getSingleTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailits(data) {
    return trailit_notifi_Service.getAllTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailt(data) {
    return trailit_notifi_Service.trailitUpdate(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailit(data) {
    return trailit_notifi_Service.trailitDelete(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    getTrailit,
    getTrailits,
    updateTrailt,
    deleteTrailit
};