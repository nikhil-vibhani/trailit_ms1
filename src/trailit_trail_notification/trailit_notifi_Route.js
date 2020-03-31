const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const validators = require('./trailit_notifi_Validation');
const trailit_notifi_Facade = require('./trailit_notifi_Facade');
const trailit_notifi_Router = new Router();
const BASE_URL  = `/trailit/api/v1/userTourNotification/`;

trailit_notifi_Router.get(`${BASE_URL}readTrailit_detail_tour/:trail_notification_id`, async (ctx, next) => {
    const data = {
        trail_notification_id: ctx.params.trail_notification_id
    };

    await trailit_notifi_Facade.getTrailit(data)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

trailit_notifi_Router.get(`${BASE_URL}readTrailits_detail_tour`, async (ctx, next) => {
    await trailit_notifi_Facade.getTrailits()
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

trailit_notifi_Router.put(`${BASE_URL}updateTrailit_detail_tour/:trail_notification_id`, async (ctx, next) => {
    // Validate body
    const errors = await validators.updateTrailitValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    const updateData = {
        trail_notification_id: ctx.params.trail_notification_id,
        updateValue: ctx.request.body.updateValue,
        updated: ctx.request.body.updated
    };

    await trailit_notifi_Facade.updateTrailt(updateData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

trailit_notifi_Router.delete(`${BASE_URL}deleteTrailit_detail_tour/:trail_notification_id`, async (ctx, next) => {
    const data = {
        trail_notification_id: ctx.params.trail_notification_id
    };

    await trailit_notifi_Facade.deleteTrailit(data)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

module.exports = trailit_notifi_Router;