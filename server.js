const path = require('path');
const http = require('http');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const port = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

// start server
server.listen(port, 'localhost', (err) => {
	if (err) 
		console.log(err);

	console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

// express code
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// socket.io code
var userTable = {};

id = 1;
io.on('connection', socket => {
	socket.on('LOGIN', (payload) => {
		userTable[socket.id] = payload.username;
		socket.broadcast.emit('NOTIFICATION', { id, title: 'User Joined', msg: payload.username });
		id++;
	});

	socket.on('NEW_MESSAGE', (payload) => {
		io.emit('MESSAGE_ADDED', payload);
	});

	socket.on('disconnect', () => {
		io.emit('NOTIFICATION', { id, title: 'User Left', msg: userTable[socket.id] });
	});
});

