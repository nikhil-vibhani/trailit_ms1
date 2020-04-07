// console.log('');
// console.log('//************************* Trail It **************************//');
// console.log('');

// for env file
require('dotenv').config();

//Import Config
const config = require('./src/config');
const BaseDao = require('./src/dao/trailit_data_baseDao');
const baseDao = new BaseDao();

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

// init koa app
const app = new Koa();

app.use(bodyParser());

// CORS
app.use(async (ctx, next) => {
	//res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, accessToken,", "lat lng,app_version,platform,ios_version,countryISO,Authorization");
	ctx.set('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
	await next();
});

// attach the routes to the app
require('./src/route/trailit')(app);

// start server
const server = app.listen(config.cfg.port, () => {
	console.info(`Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode`);
});

// Socket connection
const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
	console.log('socket is listening.');
	baseDao.socket(socket, io);
});
