const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const trailSortFacade = require('./trailit_sort_Facade');
const validation =  require('./trailit_sort_Validators');

const trailitSort = new Router();
const BASE_URL = `/trailit/api/v1/trailitSorting/`;

trailitSort.put(`${BASE_URL}sortTrailOrder`, async (ctx, next) => {
	
	try {
		const data = ctx.request.body;

		const result = await trailSortFacade.getAllTrails(data);
		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

module.exports = trailitSort;