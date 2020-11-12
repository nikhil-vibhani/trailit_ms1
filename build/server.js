'use strict';

// console.log('');
// console.log('//************************* Trail It **************************//');
// console.log('');

//Import Config
var config = require('./src/config');
var Koa = require('koa');
// const koaBody = require('koa-body');
// const formidable = require('koa2-formidable');
var bodyParser = require('koa-bodyparser');

// init koa app
var app = new Koa();

// app.use(koaBody());
// app.use(formidable());
app.use(bodyParser());

// attach the routes to the app
require('./src/route/trailit')(app);

// start server
app.listen(config.cfg.port, function () {
	console.info('Express server listening on ' + config.cfg.port + ', in ' + config.cfg.TAG + ' mode');
});