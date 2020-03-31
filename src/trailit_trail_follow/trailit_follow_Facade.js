const trailit_follow_Service = require('./trailit_follow_Service');

function createSingleTrailit(data) {
    return trailit_follow_Service.createTrailit(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

function deleteTrailit(data) {
    return trailit_follow_Service.trailitDelete(data)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    createSingleTrailit,
    deleteTrailit
};