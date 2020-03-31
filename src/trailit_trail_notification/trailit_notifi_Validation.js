const trailitCont = require('./trailit_notifi_Constants');
const exception = require('../customExceptions');

function updateTrailitNotifiValidation(req) {
    const trail_notification_id = ctx.params.trail_notification_id;
    const { updated, updateValue } = req.request.body;
    const errors = [];

    if (!trail_notification_id) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.trail_notification_idCantBeEmpty });
    } else if (!updated) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.updatedCantBeEmpty });
    } else if (!updateValue) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.updateValueCantBeEmpty });
    }

    if (errors.length > 0) {
        return validationError(errors);
    }
};

const validationError = (errors) => {
    if (errors && errors.length > 0) {
        return exception.getCustomErrorException(trailitCont.MESSAGES.ValidationError, errors);
    }
};

module.exports = {
    updateTrailitNotifiValidation
};