const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const validators = require('./trailit_filesValidation');
const taskFacade = require('./trailit_filesFacade');
const { single } = require('../middleware/multer');

const trailitFileRoute = new Router();
const BASE_URL  = `/trailit/api/v1/userTourFileDetail/`;

// Creating new trail file
trailitFileRoute.post(`${BASE_URL}createTrailit_file_tour`, async (ctx, next) => {
    // Validate body    
    const errors = await validators.createTrailitFileValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors);
    }

    const trailitFileData = {
        trail_id: ctx.request.body.trail_id,
        title: ctx.request.body.title,
        description: ctx.request.body.description,
        file_type: ctx.request.body.file_type,
        web_url: ctx.request.body.web_url,
        element_content: ctx.request.body.element_content,
        created: ctx.request.body.created
    };

    await taskFacade.createSingleTrailitFile(trailitFileData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

// Upload profile image 
trailitFileRoute.post(`${BASE_URL}uploadTrail_profile_image`, single('profile_image'), async (ctx, next) => {
    const fileData = {
        file: ctx.request.file
    }

    await taskFacade.uploadProfileImage(fileData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        })
});

// Upload media file like video, audio
trailitFileRoute.post(`${BASE_URL}uploadTrail_file_media`, single('media'), async (ctx, next) => {
    console.log('hii');
    const mediaData = {
        file: ctx.request.file
    };

    await taskFacade.uploadMedia(mediaData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

// Upload image file
trailitFileRoute.post(`${BASE_URL}uploadTrail_file_image`, single('file'), async (ctx, next) => {
    const fileData = {
        file: ctx.request.file
    };

    await taskFacade.uploadFile(fileData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

// Get trail file by id
trailitFileRoute.get(`${BASE_URL}readTrailit_file_tour/:trail_file_id`, async (ctx, next) => {
    const trailitFileData = {
        trail_file_id: ctx.params.trail_file_id
    };

    await taskFacade.getTrailitFile(trailitFileData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

// Get all trail files
trailitFileRoute.get(`${BASE_URL}readTrailit_files_tour`, async (ctx, next) => {
    await taskFacade.getTrailitFiles()
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

// Update trail file by id
trailitFileRoute.put(`${BASE_URL}updateTrailit_file_tour/:trail_file_id`, async (ctx, next) => {
    // Validate body    
    const errors = await validators.updateTrailitFileValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    const updateData = {
        trail_file_id: ctx.params.trail_file_id,
        updateValue: ctx.request.body.updateValue,
        updated: ctx.request.body.updated
    };

    await taskFacade.updateTrailtFile(updateData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

//delete trail file by id
trailitFileRoute.delete(`${BASE_URL}deleteTrailit_file_tour/:trail_file_id`, async (ctx, next) => {
    const trailitData = {
        trail_file_id: ctx.params.trail_file_id
    };

    await taskFacade.deleteTrailitFile(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

module.exports = trailitFileRoute;