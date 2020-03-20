'use strict';

//===============================Load Modules Start========================

const bodyParser = require('koa-bodyparser');
const methodOverride = require('method-override');


/**
*@socket implementation @returns
* var server = require('http').Server(express());
*var io = require('socket.io')(server);
* require("../socket/socketHandler.js")(io);
*/

module.exports = function (app, env) {
    // parses application/json bodies
    app.use(bodyParser());
    
    /**
     * add swagger to our project
     */
    app.use(function(ctx, next) {
        //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        ctx.header("Access-Control-Allow-Origin", "*");
        ctx.header('Access-Control-Allow-Credentials', true);
        ctx.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken," +
            "lat lng,app_version,platform,ios_version,countryISO,Authorization");
            ctx.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
        next();
    });
};
