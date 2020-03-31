const BaseDao = require('../dao/trailit_follow_baseDao');
const trailit_follow_Dao = new BaseDao('user_tour_trail_follow');

function newTrailit(data) {
    return trailit_follow_Dao.insertTrailit_follow(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailitFromDb(data) {
    return trailit_follow_Dao.deleteTrailit_follow(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    newTrailit,
    deleteTrailitFromDb
};