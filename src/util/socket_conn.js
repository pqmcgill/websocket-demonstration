import io from 'socket.io-client';
const socket = io.connect(`${location.protocol}//${location.host}`);
export default socket;
