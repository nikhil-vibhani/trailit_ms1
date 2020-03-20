const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const validators = require('./trailit_detail_Validation');
const trailit_detail_Facade = require('./trailit_detail_Facade');
const trailit_detail_Router = new Router();
const BASE_URL  = `/trailit/api/v1/userTourDetail/`;

trailit_detail_Router.post(`${BASE_URL}createTrailit_detail_tour`, async (ctx, next) => {
    // Validate body 
    const errors = await validators.createTrailitValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    // Trailit data
    const trailitData = {
        trail_id: ctx.request.body.trail_id,
        title: ctx.request.body.title,
        description: ctx.request.body.description,
        web_url: ctx.request.body.web_url,
        is_active: ctx.request.body.is_active,
        created: ctx.request.body.created,
        element_content: ctx.request.body.element_content
    };

    await trailit_detail_Facade.createSingleTrailit(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        }); 
});

trailit_detail_Router.get(`${BASE_URL}readTrailit_detail_tour/:trail_detail_id`, async (ctx, next) => {
    const data = {
        trail_detail_id: ctx.params.trail_detail_id
    };

    await trailit_detail_Facade.getTrailit(data)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

trailit_detail_Router.get(`${BASE_URL}readTrailits_detail_tour`, async (ctx, next) => {
    await trailit_detail_Facade.getTrailits()
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

trailit_detail_Router.put(`${BASE_URL}updateTrailit_detail_tour/:trail_detail_id`, async (ctx, next) => {
    // Validate body
    const errors = await validators.updateTrailitValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    const updateData = {
        trail_detail_id: ctx.params.trail_detail_id,
        updateValue: ctx.request.body.updateValue,
        updated: ctx.request.body.updated
    };

    await trailit_detail_Facade.updateTrailt(updateData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

trailit_detail_Router.delete(`${BASE_URL}deleteTrailit_detail_tour/:trail_detail_id`, async (ctx, next) => {
    const data = {
        trail_detail_id: ctx.params.trail_detail_id
    };

    await trailit_detail_Facade.deleteTrailit(data)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

module.exports = trailit_detail_Router;