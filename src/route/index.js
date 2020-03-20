// Initilize redis connection
// var redisClient = require("../redisClient/init");

// Load user routes
const userTour = require('../userTour/userTourRoute');

// Load response module
const responseHandler = require('../responseHandler');

//========================== Load Modules End ==============================================

//========================== Export Module Start ====== ========================



module.exports = function (app) {

    // Attach User Routes
    app.use(userTour.routes());

    // Attach ErrorHandler to Handle All Errors
    app.use(responseHandler.hndlError);
};
