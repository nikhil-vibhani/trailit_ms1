const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const validators = require('./trailit_follow_Validation');
const trailit_follow_Facade = require('./trailit_follow_Facade');
const trailit_follow_Router = new Router();
const BASE_URL  = `/trailit/api/v1/userTourFollow/`;

// Create follow api
trailit_follow_Router.post(`${BASE_URL}createTrailit_follow_tour`, async (ctx, next) => {
    // Validate body 
    const errors = await validators.createTrailitFollowValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    // Trailit data
    const trailitData = {
        follower_id: ctx.request.body.follower_id,
        previewUserId: ctx.request.body.previewUserId
    };

    await trailit_follow_Facade.createSingleTrailit(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        }); 
});

// Read follow api
trailit_follow_Router.post(`${BASE_URL}readTrailits_follow_tour`, async (ctx, next) => {
    // Validate body 
    const errors = await validators.createTrailitFollowValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    // Trailit data
    const trailitData = {
        follower_id: ctx.request.body.follower_id,
        previewUserId: ctx.request.body.previewUserId
    };

    await trailit_follow_Facade.readTrailits(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        }); 
});

// Delete trail follower api
trailit_follow_Router.post(`${BASE_URL}deleteTrailit_follow_tour`, async (ctx, next) => {
    // Validate body 
    const errors = await validators.createTrailitFollowValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    // Trailit data
    const trailitData = {
        follower_id: ctx.request.body.follower_id,
        previewUserId: ctx.request.body.previewUserId
    };

    await trailit_follow_Facade.deleteTrailit(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

module.exports = trailit_follow_Router;