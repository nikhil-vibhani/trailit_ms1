const trailit_DataCont = require('./trailit_dataConstants');
const exception = require('../customExceptions');

function createTrailitDataValidation(req) {    
    const dataArray = req.request.body;
    const errors = [];
    
    dataArray.forEach(el => {
        if (!el.userId) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.user_idCantBeEmpty });
        } else if (!el.trail_id) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.trail_idCantBeEmpty });
        } else if (!el.title) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.titleCantBeEmpty });
        } else if (!el.type) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.data_typeCantBeEmpty });
        } else if (el.type !== 'audio' && el.type !== 'video' && el.type !== 'tooltip' && el.type !== 'modal') {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.data_typeMustBeAudioOrVideoOrTooltipOrModal });
        } else if (!el.mediaType) {
           errors.push({ code: 500, message: trailit_DataCont.MESSAGES.media_typeCantBeEmpty });
        } else if (el.mediaType !== 'audio' && el.mediaType !== 'video' && el.mediaType !== 'text' && el.mediaType !== 'image' && el.mediaType !== 'modal') {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.data_typeValueMustBeAudioOrVideoOrTextOrImageOrModal });
        } else if (!el.url) {
            errors.push({ code: 500, message: trailit_DataCont.MESSAGES.urlCantBeEmpty });
        } else if (!el.created) {
           errors.push({ code: 500, message: trailit_DataCont.MESSAGES.createdCantBeEmpty });
        }
    });

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

function trailitDataValidationForUpdate(req, next) {
    const { trail_data_id, flag } = req.request.body;
    const errors = [];

    if (!trail_data_id) {
        errors.push({ code: 500, message:  trailit_DataCont.MESSAGES.trail_data_idCantBeEmpty });
    } else if (flag === undefined) {
        errors.push({ code: 500, message: trailit_DataCont.MESSAGES.flagCantBeEmpty });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};

const indexSingleTrailValidation = (req) => {
    const { trail_id, user_id } = req.params;
    const errors = [];

    if (!trail_id) {
        errors.push({ code: 500, message:  trailit_DataCont.MESSAGES.trail_idCantBeEmpty });
    } else if (!user_id) {
        errors.push({ code: 500, message: trailit_DataCont.MESSAGES.user_idCantBeEmpty });
    }

    if (errors && errors.length > 0) {
        return validationError(errors);
    }
};  

const validationError = (errors,) => {
    return exception.getCustomErrorException(trailit_DataCont.MESSAGES.ValidationError, errors);
};

module.exports = {
    createTrailitDataValidation,
    updateTrailitDataValidation,
    trailitDataValidationForUpdate,
    indexSingleTrailValidation
};