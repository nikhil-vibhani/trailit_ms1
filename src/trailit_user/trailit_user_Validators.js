const trail_userConst = require('./trailit_user_Constants');
const exception = require('../customExceptions');

// Post user's new trail validation
function createUserTrailValidation(ctx) {
    const errors = [];
    const userId = ctx.request.body.user_id;
    const trailName = ctx.request.body.trail_name;

    if (!userId || userId === '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.UserIdRequired });
    } else if (!trailName || trailName === '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.trailNameRequired });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};

// Get all user trail and get trail id validation
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
        return exception.getCustomErrorException(trail_userConst.MESSAGES.ValidationError, errors);
    }
};

module.exports = {
    createUserTrailValidation,
    validation
};