const taskService = require('./trailit_filesService');

function createSingleTrailitFile(data) {
    return taskService.createTrailitFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function uploadProfileImage(data) {
    return taskService.profileImage(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function uploadMedia(data) {
    return taskService.mediaUpload(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function uploadFile(data) {
    return taskService.fileUpload(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        })
}

function getTrailitFile(data) {
    return taskService.getSingleTrailitFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailitFiles() {
    return taskService.getAllTrailitFiles()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailtFile(data) {
    return taskService.trailitUpdateFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailitFile(data) {
    return taskService.trailitDeleteFile(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createSingleTrailitFile,
    uploadProfileImage,
    uploadMedia,
    uploadFile,
    getTrailitFile,
    getTrailitFiles,
    updateTrailtFile,
    deleteTrailitFile
};