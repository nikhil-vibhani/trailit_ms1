const Router = require('koa-router');
const trailitFacade = require('./trailitFacade');
const resHndlr = require('../responseHandler');
const validators = require('./trailitValidation');

const trailitRouter = new Router();
const BASE_URL = `/trailit/api/v1/trailitTour/`;

// Create trailit route
trailitRouter.post(`${BASE_URL}createTrailit`, async (ctx, next) => {

    // Validate body
    const errors = validators.createTrailitValidation(ctx);
    if (errors && errors.errors.length > 0) {
        return resHndlr.sendError(ctx, errors.errors[0]);
    }

    const trailitData = {
        user_id: ctx.request.body.user_id,
        trail_name: ctx.request.body.trail_name
    };

    await trailitFacade.createTrailit(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

module.exports = trailitRouter;
