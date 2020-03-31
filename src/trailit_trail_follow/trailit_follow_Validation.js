const trailitCont = require('./trailit_follow_Constants');
const exception = require('../customExceptions');

function createTrailitFollowValidation(req) {
    const { follower_id, followed_id } = req.request.body;
    let errors = [];

    if (!follower_id) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.followerIdCantBeEmpty });  
    } else if (!followed_id) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.followedIdCantBeEmpty });
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
    createTrailitFollowValidation
};