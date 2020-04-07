const taskService = require('./trailit_dataService');

function createSingleTrailit(data) {
    return taskService.createTrailit(data)
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

function getSingleTrailit(data) {
    return taskService.getTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailits(data) {
    return taskService.getAllTrailits(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailt(data) {
    return taskService.trailitUpdate(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailit(data) {
    return taskService.trailitDelete(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createSingleTrailit,
    uploadProfileImage,
    uploadMedia,
    uploadFile,
    getSingleTrailit,
    getTrailits,
    updateTrailt,
    deleteTrailit
};