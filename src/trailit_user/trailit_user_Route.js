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
		trailName: ctx.request.body.trail_name,
		trail_description: ctx.request.body.trail_description,
		trail_categor_id: ctx.request.body.trail_category_id,
		trail_user_status: ctx.request.body.trail_status,
		cover_image_url: ctx.request.body.cover_image_url
	};

	try {
		const result = await trailUserFacade.createNewTrail(data);

		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

// Post user's new trail
trailitUser.put(`${BASE_URL}updateTrail_trail_user_tour/:trail_id`, async (ctx, next) => {

	// Data validation
	const errors = validation.updateUserTrailValidation(ctx);

	if (errors && errors.errors.length > 0) {
		return resHndlr.sendError(ctx, errors.errors);
	}

	const data = {
		trail_id: ctx.params.trail_id, 
		userId: ctx.request.body.user_id,
		trailName: ctx.request.body.trail_name,
		trail_description: ctx.request.body.trail_description,
		trail_categor_id: ctx.request.body.trail_category_id,
		trail_user_status: ctx.request.body.trail_status,
		cover_image_url: ctx.request.body.cover_image_url
	};

	try {
		const result = await trailUserFacade.updateTrail(data);

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

//trail delete by trail_id
trailitUser.delete(`${BASE_URL}delete_user_trail/:trail_id`, async (ctx, next) => {
    const trailitData = {
        trail_id: ctx.params.trail_id
    };
    
    await taskFacade.deleteUserTrail(trailitData)
        .then(result => {
            resHndlr.sendSuccess(ctx, result);
        })
        .catch(err => {
            resHndlr.sendError(ctx, err);
        });
});

module.exports = trailitUser;