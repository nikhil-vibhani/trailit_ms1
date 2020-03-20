const task_detail_Service = require('./trailit_detail_Service');

function createSingleTrailit(data) {
    return task_detail_Service.createTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailit(data) {
    return task_detail_Service.getSingleTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailits() {
    return task_detail_Service.getAllTrailit()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailt(data) {
    return task_detail_Service.trailitUpdate(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailit(data) {
    return task_detail_Service.trailitDelete(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createSingleTrailit,
    getTrailit,
    getTrailits,
    updateTrailt,
    deleteTrailit
};