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

server.listen(port, 'localhost', (err) => {
	if (err) 
		console.log(err);

	console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

var userTable = {};

var id = 0;
io.on('connection', (socket) => {
	console.log('client connected...');
	socket.on('NEW_MESSAGE', (message) => {
		io.emit('MESSAGE_ADDED', message);
	});

	socket.on('NEW_USER', (user) => {
		userTable[socket.id] = user.username;
		socket.broadcast.emit('NOTIFICATION', { id, title: 'User Joined', msg: user.username });
		id++;
	});

	socket.on('disconnect', () => {
		io.emit('NOTIFICATION', { id, title: 'User Left', msg: userTable[socket.id] });
		id++;
	});

});
