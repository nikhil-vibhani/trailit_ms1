const trail_userConst = require('./trailit_user_Constants');
const exception = require('../customExceptions');

function validation(ctx) {
    const errors = [];
    const userId = ctx.params.user_id;

    if (!userId) {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.UserIdRequired });
    }
    
    if (errors & errors.length > 0) {
        return validationError(errors);
    }
};

const validationError = (errors) => {
    if (errors && errors.length > 0) {
        return exception.getCustomErrorException(trailit_filesCont.MESSAGES.ValidationError, errors);
    }
};

module.exports = {
    validation
};