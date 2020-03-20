const BaseDao = require('../dao/trailit_file_baseDao');
const trailitFileDao = new BaseDao('user_tour_file', 'user_tour_sort');

function newTrailitFile(data) {
    return trailitFileDao.insertTrailitFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function uploadProfileImage(data) {
    return trailitFileDao.profileImage(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function uploadMedia(data) {
    return trailitFileDao.mediaUploadToCloud(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function uploadFile(data) {
    return trailitFileDao.fileUploadToCloud(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
}

function getTrailitFileFromDb(data) {
    return trailitFileDao.readTrailitFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailitFilesFromDb() {
    return trailitFileDao.readTrailitFiles()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailitFileIntoDb(data) {
    return trailitFileDao.updateTrailitFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailitFileFromDb(data) {
    return trailitFileDao.deleteTrailitFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    newTrailitFile,
    uploadProfileImage,
    uploadMedia,
    uploadFile,
    getTrailitFileFromDb,
    getTrailitFilesFromDb,
    updateTrailitFileIntoDb,
    deleteTrailitFileFromDb
};