import io from 'socket.io-client';
import * as messages from '../constants/MessageTypes';
let callbacks = {};

let socket = io.connect(`${location.protocol}//${location.host}`);

let listenFor = (message) => {
	socket.on(message, payload => {
		if (callbacks[message]) {
			callbacks[message].forEach(cb => cb(payload));
		}
	});
};

Object.keys(messages).forEach(listenFor);

export default {
	subscribeTo (message, cb) {
		if (callbacks[message]) {
			callbacks[message].push(cb);
		} else {
			callbacks[message] = [cb];
		}
	},

	emit (message, payload) {
		socket.emit(message, payload);
	}
};
