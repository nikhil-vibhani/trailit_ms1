const BaseDao = require('../dao/trailit_detail_baseDao');
const trailit_detail_Dao = new BaseDao('user_tour_detail', 'user_tour_sort');

function newTrailit(data) {
    return trailit_detail_Dao.insertTrailit_detail(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailitFromDb(data) {
    return trailit_detail_Dao.readTrailit_detail(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function getTrailitsFromDb() {
    return trailit_detail_Dao.readTrailit_details()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function updateTrailitIntoDb(data) {
    return trailit_detail_Dao.updateTrailit_detail(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailitFromDb(data) {
    return trailit_detail_Dao.deleteTrailit_detail(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    newTrailit,
    getTrailitFromDb,
    getTrailitsFromDb,
    updateTrailitIntoDb,
    deleteTrailitFromDb
};