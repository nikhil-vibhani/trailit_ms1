const trailit_detail_Dao = require('./trailit_detail_Dao');

function createTrailit(data) {
    return trailit_detail_Dao.newTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getSingleTrailit(data) {
    return trailit_detail_Dao.getTrailitFromDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getAllTrailit() {
    return trailit_detail_Dao.getTrailitsFromDb()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitUpdate(data) {
    return trailit_detail_Dao.updateTrailitIntoDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitDelete(data) {
    return trailit_detail_Dao.deleteTrailitFromDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createTrailit,
    getSingleTrailit,
    getAllTrailit,
    trailitUpdate,
    trailitDelete
};