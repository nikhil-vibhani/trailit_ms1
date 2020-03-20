const trailitDao = require('./trailit_filesDao');

function createTrailitFile(data) {
    return trailitDao.newTrailitFile(data)
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

function getSingleTrailitFile(taskData) {
    return trailitDao.getTrailitFileFromDb(taskData)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getAllTrailitFiles() {
    return trailitDao.getTrailitFilesFromDb()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitUpdateFile(data) {
    return trailitDao.updateTrailitFileIntoDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitDeleteFile(data) {
    return trailitDao.deleteTrailitFileFromDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createTrailitFile,
    profileImage,
    mediaUpload,
    fileUpload,
    getSingleTrailitFile,
    getAllTrailitFiles,
    trailitUpdateFile,
    trailitDeleteFile
};