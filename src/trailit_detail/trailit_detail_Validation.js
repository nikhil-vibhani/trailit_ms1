const trailitCont = require('./trailit_detail_Constants');
const exception = require('../customExceptions');

function createTrailitValidation(req) {
    const { trail_id, title, description, web_url, element_content, created } = req.request.body;
    let errors = [];

    if (!trail_id) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.trail_idCantBeEmpty });  
    } else if (!title) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.titleCantBeEmpty });
    } else if (!description) {
       errors.push({ code: 500, message: trailitCont.MESSAGES.descriptionCantBeEmpty });
    } else if (!web_url) {
       errors.push({ code: 500, message: trailitCont.MESSAGES.web_urlCantBeEmpty });
    } else if (!element_content) {
       errors.push({ code: 500, message: trailitCont.MESSAGES.element_contentCantBeEmpty });
    } else if (!created) {
       errors.push({ code: 500, message: trailitCont.MESSAGES.create_dateCantBeEmpty });
    }

    if (errors.length > 0) {
        return validationError(errors);
    }
};

function updateTrailitValidation(req) {
    const trail_detail_id = req.params.trail_detail_id;
    const { updated, updateValue } = req.request.body;
    const errors = [];

    if (!trail_detail_id) {
        errors.push({ code: 500, message: trailitCont.MESSAGES.trail_detail_idCantBeEmpty });
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
    createTrailitValidation,
    updateTrailitValidation
};