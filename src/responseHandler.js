'use strict';

//========================== Load Modules Start ===========================

//========================== Load Internal Module =========================

// Load exceptions
const constants = require('./constants');
const excep = require('./customExceptions');
const APIResponse = require('./model/APIResponse');

//========================== Load Modules End =============================

function hndlError(err, res, next) {
	// unhandled error
	sendError(res, err);
}

function sendError(res, err) {
	// if error doesn't has sc than it is an unhandled error,
	// log error, and throw intrnl server error
	if (!err.errorCode) {
		err = excep.intrnlSrvrErr(err);
	}
	var result = new APIResponse(constants.STATUS_CODE.ERROR, err);
	_sendResponse(res, result);
}

function sendSuccessWithMsg(res, msg) {
	var rslt = { message: msg };
	var result = new APIResponse(constants.STATUS_CODE.SUCCESS, rslt);
	_sendResponse(res, result);
}

function sendSuccess(res, rslt) {
	var result = new APIResponse(constants.STATUS_CODE.SUCCESS, rslt);
	_sendResponse(res, result);
}

//========================== Exposed Action Start ==========================
module.exports = {
	hndlError,
	sendError,
	sendSuccess,
	sendSuccessWithMsg,
};
//========================== Exposed Action End ==========================

function _sendResponse(ctx, rslt) {
	// send status code 200
	ctx.body = rslt
}
