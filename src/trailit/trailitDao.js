const BaseDao = require('../dao/trailit_baseDao');
const trailitDao = new BaseDao('user_tour');

function createTrailit(data) {
    return trailitDao.createNewTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createTrailit
};