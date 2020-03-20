const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const trailUserFacade = require('./trailit_user_Facade');
const validation =  require('./trailit_user_Validators');

const trailitUser = new Router();
const BASE_URL = `/trailit/api/v1/trailitUser/`;

trailitUser.get(`${BASE_URL}allTrails/:user_id`, async (ctx) => {
	try {
		const errors = await validation.validation(ctx);

		if (errors && errors.errors.length > 0) {
			return resHndlr.sendError(ctx, errors.errors);
		}

		const data = {
			userId: ctx.params.user_id
		};
		
		const result = await trailUserFacade.getAllTrails(data);
		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

module.exports = trailitUser;