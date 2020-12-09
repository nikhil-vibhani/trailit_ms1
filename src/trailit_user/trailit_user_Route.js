const Router = require('koa-router');
const connectDb = require('../config/dbConfig');
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
		trail_user_status: ctx.request.body.trail_user_status,
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
		trailName: ctx.request.body.trail_title,
		trail_description: ctx.request.body.trail_description,
		trail_categor_id: ctx.request.body.trail_categor_id==null?1:parseInt(ctx.request.body.trail_categor_id),
		trail_user_status: ctx.request.body.trail_user_status,
		cover_image_url: ctx.request.body.cover_image_url
	};
	

	try {
		const result = await trailUserFacade.updateTrail(data);

		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});


// Post trail update data
trailitUser.post(`${BASE_URL}UpdateTrailData`, async (ctx, next) => {
	
	const data = ctx.request.body;
	
	try {
		const result = await trailUserFacade.UpdateTrailData(data);
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

// Get all user's trail
trailitUser.get(`${BASE_URL}getAllCategory`, async (ctx, next) => {
	try {
		const result = await trailUserFacade.getAllCategory();
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

//get all trails by category
trailitUser.get(`${BASE_URL}getTrailByCategory/:category_1/:category_2/:category_3/:category_4?/:category_5?/:category_6?`, async (ctx, next) => {
	try {

		const categories = {
			category_1: ctx.params.category_1,
			category_2: ctx.params.category_2,
			category_3: ctx.params.category_3
		};

		console.log('Categories: ', categories);
		const result = await trailUserFacade.getTrailByCategory(categories);
	
		resHndlr.sendSuccess(ctx, result);	
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

trailitUser.post(`${BASE_URL}addUserCategories`, async (ctx, next) => {
	
	const data = {
		user_id: ctx.request.body.user_id,
		categories_list: ctx.request.body.categories_list,
	};
	
	try {
		const result = await trailUserFacade.addUserCategories(data);

		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

trailitUser.get(`${BASE_URL}checkCategoriesExists/:user_id`, async (ctx, next) => {
	try {
		const user_id = ctx.params.user_id;
		
		const result = await trailUserFacade.checkCategoriesExists(user_id);
		resHndlr.sendSuccess(ctx, result);	
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

module.exports = trailitUser;