import { io } from 'socket.io-client';

const URL = 'https://ubarter.onrender.com';
const socket = io(URL, {
  autoConnect: false,
  secure: true,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  query: `id=${JSON.parse(localStorage.getItem('user'))?._id}`,
});


export default socket;
