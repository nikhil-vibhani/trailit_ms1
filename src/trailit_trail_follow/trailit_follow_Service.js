const trailit_follow_Dao = require('./trailit_follow_Dao');

function createTrailit(data) {
    return trailit_follow_Dao.newTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function trailitDelete(data) {
    return trailit_follow_Dao.deleteTrailitFromDb(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createTrailit,
    trailitDelete
};