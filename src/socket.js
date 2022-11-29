import { io } from 'socket.io-client';

const URL = 'http://localhost:3001';
const socket = io(URL, {
  autoConnect: false,
  query: `id=${JSON.parse(localStorage.getItem('user'))?._id}`,
});

export default socket;
