import { io } from 'socket.io-client';

const URL = 'https://ubarter.onrender.com/socket.io/';
const socket = io(URL, {
  autoConnect: false,
  secure:true,
  query: `id=${JSON.parse(localStorage.getItem('user'))?._id}`,
});

export default socket;
