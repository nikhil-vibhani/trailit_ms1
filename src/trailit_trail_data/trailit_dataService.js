const trailitDao = require('./trailit_dataDao');

function createTrailit(data) {
    return trailitDao.newTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function profileImage(data) {
    return trailitDao.uploadProfileImage(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function mediaUpload(data) {
    return trailitDao.uploadMedia(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function fileUpload(data) {
    return trailitDao.uploadFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        })
};

function getTrailit(taskData) {
    return trailitDao.getTrailitFromDb(taskData)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getAllTrailits() {
    return trailitDao.getTrailitsFromDb()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitUpdate(data) {
    return trailitDao.updateTrailitIntoDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitDelete(data) {
    return trailitDao.deleteTrailitFromDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createTrailit,
    profileImage,
    mediaUpload,
    fileUpload,
    getTrailit,
    getAllTrailits,
    trailitUpdate,
    trailitDelete
};