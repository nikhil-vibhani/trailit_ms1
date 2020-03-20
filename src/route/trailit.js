// Load trailit_detail route
const trailit_detail_Tour = require('../trailit_detail/trailit_detail_Route');

// Load trailit route
const trailit = require('../trailit/trailitRoute');

// Load trailit_file route
const trailit_file_tour = require('../trailit_files/trailit_filesRoute');

// Load trailit_user route
const trailit_user = require('../trailit_user/trailit_user_Route');

// Load trailit_sort route
const trailit_sort = require('../trailit_sort/trailit_sort_Route');

// Load response module
const responseHandler = require('../responseHandler');

//========================== Load Modules End ==============================================

//========================== Export Module Start ==============================

module.exports = (app) => {
    // Attach trailit detail Routes
    app.use(trailit_detail_Tour.routes());

    // Attach trailit Routes
    app.use(trailit.routes());

    // Attach trailit file Routes
    app.use(trailit_file_tour.routes());

    // Attach trailit user Routes
    app.use(trailit_user.routes());

    // Trailit sorting route
    app.use(trailit_sort.routes());

    // Attach ErrorHandler to Handle All Errors
    app.use(responseHandler.hndlError);
};