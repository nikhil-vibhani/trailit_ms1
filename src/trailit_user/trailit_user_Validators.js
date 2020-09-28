const trail_userConst = require('./trailit_user_Constants');
const exception = require('../customExceptions');

// Post user's new trail validation
function createUserTrailValidation(ctx) {
    const errors = [];
    const userId = ctx.request.body.user_id;
    const trailName = ctx.request.body.trail_name;
    const trailCategoryId = ctx.request.body.trail_category_id;
    const trail_user_status = ctx.request.body.trail_user_status
    
    if (!userId || userId === '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.UserIdRequired });
    } else if (!trailName || trailName === '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.trailNameRequired });
    } else if(!trailCategoryId || trailCategoryId === '') { 
        errors.push({ code: 500, message: trail_userConst.MESSAGES.trailCategoryId });
    } else if(!trail_user_status || trail_user_status=== '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.trailUserStatus });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};

function updateUserTrailValidation(ctx) {
    const errors = [];
    const trail_id = ctx.params.trail_id;
    const userId = ctx.request.body.user_id;
    const trailName = ctx.request.body.trail_name;
    const trailCategoryId = ctx.request.body.trail_category_id;
    const trail_user_status = ctx.request.body.trail_user_status
    
    if (!userId || userId === '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.UserIdRequired });
    } else if(!trail_id || trail_id === '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.UserIdRequired });
    } else if (!trailName || trailName === '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.trailNameRequired });
    } else if(!trailCategoryId || trailCategoryId === '') { 
        errors.push({ code: 500, message: trail_userConst.MESSAGES.trailCategoryId });
    } else if(!trail_user_status || trail_user_status=== '') {
        errors.push({ code: 500, message: trail_userConst.MESSAGES.trailUserStatus });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
}

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
    updateUserTrailValidation,
    validation
};