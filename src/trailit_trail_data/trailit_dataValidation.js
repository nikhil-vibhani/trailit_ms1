const trailit_DataCont = require('./trailit_dataConstants');
const exception = require('../customExceptions');

function createTrailitDataValidation(req) {    
    const dataArray = req.request.body;
    // const { trail_id, title, type, mediaType, url, created } = req.request.body;
    const errors = [];
    
    dataArray.forEach(el => {
        if (!el.userId) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.user_idCantBeEmpty });  
        } else if (!el.title) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.titleCantBeEmpty });
        } else if (!el.type) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.data_typeCantBeEmpty });
        } else if (el.type !== 'audio' && el.type !== 'video' && el.type !== 'tooltip') {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.data_typeMustBeAudioOrVideoOrTooltip });
        } else if (!el.mediaType) {
           errors.push({ code: 500, message: trailit_DataCont.MESSAGES.media_typeCantBeEmpty });
        } else if (el.mediaType !== 'audio' && el.mediaType !== 'video' && el.mediaType !== 'text' && el.mediaType !== 'picture') {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.data_typeValueMustBeAudioOrVideoOrTextOrPicture });
        } else if (!el.url) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.urlCantBeEmpty });
        } else if (!el.created) {
           errors.push({ code: 500, message: trailit_DataCont.MESSAGES.createdCantBeEmpty });
        }
    })    

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};

function updateTrailitDataValidation(req) {
    const trail_data_id = req.params.trail_data_id;
    const { updated, updateValue } = req.request.body;
    const errors = [];

    if (!trail_data_id) {
        errors.push({ code: 500, message:  trailit_DataCont.MESSAGES.trail_idCantBeEmpty });
    } else if (!updated) {
        errors.push({ code: 500, message: trailit_DataCont.MESSAGES.updatedCantBeEmpty });
    } else if (!updateValue) {
        errors.push({ code: 500, message: trailit_DataCont.MESSAGES.updateValueCantBeEmpty });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};

const validationError = (errors) => {
    if (errors && errors.length > 0) {
        return exception.getCustomErrorException(trailit_DataCont.MESSAGES.ValidationError, errors);
    }
};

module.exports = {
    createTrailitDataValidation,
    updateTrailitDataValidation
};