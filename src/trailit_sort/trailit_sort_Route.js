const Router = require('koa-router');
const resHndlr = require('../responseHandler');
const trailSortFacade = require('./trailit_sort_Facade');
const validation =  require('./trailit_sort_Validators');

const trailitSort = new Router();
const BASE_URL = `/trailit/api/v1/trailitSorting/`;

trailitSort.post(`${BASE_URL}sortTrailOrder`, async (ctx, next) => {
	console.log("SDSDSDASDASDASd ffffffffffffffff sssss")
	// try {
	// 	const data = ctx.request.body;
	// 	const result = await trailSortFacade.getAllTrails(data);
	// 	resHndlr.sendSuccess(ctx, result);
	// } catch (err) {
	// 	resHndlr.sendError(ctx, err);
	// }
});

trailitSort.put(`${BASE_URL}sortTrailOrder`, async (ctx, next) => {
	console.log("SDSDSDASDASDASd ffffffffffffffff")
	try {
		const data = ctx.request.body;
		const result = await trailSortFacade.getAllTrails(data);
		resHndlr.sendSuccess(ctx, result);
	} catch (err) {
		resHndlr.sendError(ctx, err);
	}
});

module.exports = trailitSort;