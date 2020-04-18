const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const validators = require('./trailit_notifi_Validation');
const trailit_notifi_Facade = require('./trailit_notifi_Facade');
const trailit_notifi_Router = new Router();
const BASE_URL  = `/trailit/api/v1/userTourNotification/`;

trailit_notifi_Router.get(`${BASE_URL}readTrailit_notification_tour/:trail_notification_id`, async (ctx, next) => {
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

trailit_notifi_Router.post(`${BASE_URL}readTrailits_notification_tour`, async (ctx, next) => {
    const data = {
        user_id: ctx.request.body.user_id,
        flag: ctx.request.body.flag
    };

    await trailit_notifi_Facade.getTrailits(data)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

trailit_notifi_Router.post(`${BASE_URL}updateTrailit_notification_tour`, async (ctx, next) => {
    // Validate body
    console.log('hii');
    const errors = await validators.updateTrailitNotifiValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    const updateData = {
        user_id: ctx.request.body.user_id,
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

trailit_notifi_Router.delete(`${BASE_URL}deleteTrailit_notification_tour`, async (ctx, next) => {
    const data = {
        user_id: ctx.request.body.user_id,
        flag: ctx.request.body.flag
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