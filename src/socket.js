import { io } from 'socket.io-client';

const URL = 'https://ubarter.onrender.com:3001';
const socket = io(URL, {
  autoConnect: false,
  secure:true,
  path:"/chat/socket.io",
  query: `id=${JSON.parse(localStorage.getItem('user'))?._id}`,
});

export default socket;
