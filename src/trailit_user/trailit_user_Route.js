const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const trailUserFacade = require('./trailit_user_Facade');
const validation =  require('./trailit_user_Validators');

const trailitUser = new Router();
const BASE_URL = `/trailit/api/v1/trailitUser/`;

// Post user's new trail
trailitUser.post(`${BASE_URL}createTrail_trail_user_tour`, async (ctx, next) => {

	// Data validation
	const errors = validation.createUserTrailValidation(ctx);

	if (errors && errors.errors.length > 0) {
		return resHndlr.sendError(ctx, errors.errors);
	}

	const data = {
		userId: ctx.request.body.user_id,
		trailName: ctx.request.body.trail_name
	};

	try {
		const result = await trailUserFacade.createNewTrail(data);

		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

// Get trail_id of user
trailitUser.get(`${BASE_URL}indexTrail_id/:user_id`, async (ctx, next) => {

	// Data validation
	const errors = validation.validation(ctx);

	if (errors && errors.errors.length > 0) {
		return resHndlr.sendError(ctx, errors.errors);
	}

	const data = {
		userId: ctx.params.user_id
	};

	try {
		const result = await trailUserFacade.getTrailId(data);

		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

// get user tour data

// Get trail_id of user
trailitUser.get(`${BASE_URL}fetchusertourdata/:user_id`, async (ctx, next) => {

	const data = {
		userId: ctx.params.user_id
	};

	try {
		const result = await trailUserFacade.getUserTourData(data);

		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

// Get all user's trail
trailitUser.get(`${BASE_URL}allTrails/:user_id`, async (ctx, next) => {

	// Data validation
	const errors = validation.validation(ctx);

	if (errors && errors.errors.length > 0) {
		return resHndlr.sendError(ctx, errors.errors);
	}

	const data = {
		userId: ctx.params.user_id
	};

	try {		
		const result = await trailUserFacade.getAllTrails(data);

		resHndlr.sendSuccess(ctx, result);	
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

module.exports = trailitUser;