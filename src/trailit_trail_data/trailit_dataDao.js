const BaseDao = require('../dao/trailit_data_baseDao');
const trailitFileDao = new BaseDao(
    'user_tour_trail_data', 
    'user_tour_sort', 
    'user_tour', 
    'user_tour_trail_follow',
    'user_tour_trail_notification'
);

function newTrailit(data) {
    return trailitFileDao.insertTrailitData(data)
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

function indexSingleTrail(data) {
    return trailitFileDao.indexTrailData(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailitFromDb(data) {
    return trailitFileDao.readTrailitData(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailitsFromDb(data) {
    return trailitFileDao.readTrailitAllData(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};
function getUserTrailitsFromDb(data) {
    return trailitFileDao.readTrailitUserData(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};


function updateTrailIntoDb(data) {
    return trailitFileDao.updateTrailData(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailitIntoDb(data) {
    return trailitFileDao.updateTrailitData(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailitFromDb(data) {
    return trailitFileDao.deleteTrailitData(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    newTrailit,
    uploadProfileImage,
    uploadMedia,
    uploadFile,
    indexSingleTrail,
    getTrailitFromDb,
    getTrailitsFromDb,
    updateTrailIntoDb,
    updateTrailitIntoDb,
    deleteTrailitFromDb,
    getUserTrailitsFromDb
};