const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const validators = require('./trailit_dataValidation');
const taskFacade = require('./trailit_dataFacade');
const { single } = require('../middleware/multer');

const trailitDataRoute = new Router();
const BASE_URL  = `/trailit/api/v1/userTourDataDetail/`;

// Creating new trail data
trailitDataRoute.post(`${BASE_URL}createTrailit_trail_data_tour`, async (ctx, next) => {
    // Validate body    
    const errors = await validators.createTrailitDataValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors);
    }

    const data = ctx.request.body;

    const trailitData = data.map(el => {
        return {
            userId: el.userId,
            title: el.title,
            description: el.description,
            type: el.type,
            media_type: el.mediaType,
            web_url: el.web_url,
            url: el.url,
            path: el.path,
            selector: el.selector,
            unique_target: el.uniqueTarget,
            class: el.class,
            created: el.created
        };
    });

    // const trailitData = {
    //     trail_id: ctx.request.body.trail_id,
    //     title: ctx.request.body.title,
    //     description: ctx.request.body.description,
    //     type: ctx.request.body.type,
    //     mediaType: ctx.request.body.mediaType,
    //     web_url: ctx.request.body.web_url,
    //     url: ctx.request.body.url,
    //     path: ctx.request.body.path,
    //     selector: ctx.request.body.selector,
    //     uniqueTarget: ctx.request.body.uniqueTarget,
    //     dataClass: ctx.request.body.class,
    //     created: ctx.request.body.created
    // };

    await taskFacade.createSingleTrailit(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

// Upload profile image 
trailitDataRoute.post(`${BASE_URL}uploadTrail_profile_image`, single('profile_image'), async (ctx, next) => {
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
trailitDataRoute.post(`${BASE_URL}uploadTrail_file_media`, single('media'), async (ctx, next) => {
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
trailitDataRoute.post(`${BASE_URL}uploadTrail_file_image`, single('file'), async (ctx, next) => {
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

// Get trail data by trail_id
trailitDataRoute.get(`${BASE_URL}readTrailit_trail_data_tour/:trail_data_id`, async (ctx, next) => {
    const trailitData = {
        trail_data_id: ctx.params.trail_data_id
    };

    await taskFacade.getSingleTrailit(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

// Get all trails data of user by user_id
trailitDataRoute.get(`${BASE_URL}readTrailit_trails_data_tour/:user_id`, async (ctx, next) => {
    const trailitData = {
        userId: ctx.params.user_id
    };

    await taskFacade.getTrailits(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

// Update trail data by id
trailitDataRoute.put(`${BASE_URL}updateTrailit_trail_data_tour/:trail_data_id`, async (ctx, next) => {
    // Validate body    
    const errors = await validators.updateTrailitDataValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    const updateData = {
        trail_data_id: ctx.params.trail_data_id,
        updateValue: ctx.request.body.updateValue,
        updated: ctx.request.body.updated
    };

    await taskFacade.updateTrailt(updateData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

//delete trail data by id
trailitDataRoute.delete(`${BASE_URL}deleteTrailit_trail_data_tour/:trail_data_id`, async (ctx, next) => {
    const trailitData = {
        trail_data_id: ctx.params.trail_data_id
    };

    await taskFacade.deleteTrailit(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

module.exports = trailitDataRoute;