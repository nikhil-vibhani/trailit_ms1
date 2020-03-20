const trailitCont = require('./trailitConstants');
const exception = require('../customExceptions');

function createTrailitValidation(req) {
    const { user_id, trail_name } = req.request.body;
    const errors = [];

    if (!user_id) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.user_idCantBeEmpty });
    } else if (!trail_name) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.trail_nameCantBeEmpty });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};

const validationError = (errors) => {
    if (errors && errors.length > 0) {
        return exception.getCustomErrorException(trailitCont.MESSAGES.ValidationError, errors);
    }
};

module.exports = {
    createTrailitValidation
};