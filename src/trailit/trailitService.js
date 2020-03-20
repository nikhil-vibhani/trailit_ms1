const trailitDao = require('./trailitDao');

function createNewTrail(data) {
    return trailitDao.createTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createNewTrail
};