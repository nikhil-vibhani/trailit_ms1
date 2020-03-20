const trailit_filesCont = require('./trailit_filesConstants');
const exception = require('../customExceptions');

function createTrailitFileValidation(req) {     
    const { trail_id, title, description, file_type, web_url, element_content, created } = req.request.body;
    const errors = [];
    
    if (!trail_id) {
        errors.push({ code: 500, message: trailit_filesCont.MESSAGES.trail_idCantBeEmpty });  
    } else if (!title) {
        errors.push({ code: 500, message: trailit_filesCont.MESSAGES.titleCantBeEmpty });
    } else if (!description) {
        errors.push({ code: 500, message: trailit_filesCont.MESSAGES.descriptionCantBeEmpty })
    } else if (!file_type) {
       errors.push({ code: 500, message: trailit_filesCont.MESSAGES.file_typeCantBeEmpty });
    } else if (file_type != 'audio' & file_type != 'video') {
        errors.push({ code: 500, message: trailit_filesCont.MESSAGES.file_typeValueMustBeAudioOrVideo });
    } else if (!web_url) {
       errors.push({ code: 500, message: trailit_filesCont.MESSAGES.web_urlCantBeEmpty });
    } else if (!element_content) {
       errors.push({ code: 500, message: trailit_filesCont.MESSAGES.element_contentCantBeEmpty });
    } else if (!created) {
       errors.push({ code: 500, message: trailit_filesCont.MESSAGES.createdCantBeEmpty });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};

function updateTrailitFileValidation(req) {
    const trail_file_id = req.params.trail_file_id;
    const { updated, updateValue } = req.request.body;
    const errors = [];

    if (!trail_file_id) {
        errors.push({ code: 500, message:  trailit_filesCont.MESSAGES.trail_idCantBeEmpty });
    } else if (!updated) {
        errors.push({ code: 500, message: trailit_filesCont.MESSAGES.updatedCantBeEmpty });
    } else if (!updateValue) {
        errors.push({ code: 500, message: trailit_filesCont.MESSAGES.updateValueCantBeEmpty });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};

const validationError = (errors) => {
    if (errors && errors.length > 0) {
        return exception.getCustomErrorException(trailit_filesCont.MESSAGES.ValidationError, errors);
    }
};

module.exports = {
    createTrailitFileValidation,
    updateTrailitFileValidation
};