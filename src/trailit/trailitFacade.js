const trailitService = require('./trailitService');

function createTrailit(data) {
    return trailitService.createNewTrail(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports = {
    createTrailit
};