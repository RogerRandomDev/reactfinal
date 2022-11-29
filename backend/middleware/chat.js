const {
  sendMessage,
  getMessages,
} = require('../controllers/chat');
// /*
// * Socket IO
// */
const io = require('socket.io')(3001, {
  cors: { origin: '*' },
});

io.use((socket, next) => {
  // const sessionID = socket.handshake.auth.sessionID;
  // // const sessionID
  // console.log(sessionID);
  // if (sessionID) {
  //   // find sessions
  //   const session = null; // get session from mongo database with this ID
  //   if (session) {
  //     socket.sessionID = sessionID;
  //     socket.userID = session.userID;
  //     return next();
  //   }
  // }
  socket.sessionID = String(Math.random()); // for now
  socket.userID = socket.handshake.query['id'];
  // console.log(socket.userID);
  next();
});

io.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: socket.userID,
    });
  }

  socket.join(socket.userID);

  socket.emit('users', users);

  socket.emit('session', {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.broadcast.emit('user connected', {
    userID: socket.userID,
  });

  socket.on('sendmessage', (message) => {
    socket.broadcast.emit('Chat-Message', message);
  });

  socket.on('private message', ({ content, to,from}) => {
    sendMessage(from,to,content);
    socket.to(to).emit('private message', {
      content,
      from: socket.userID,
    });
  });
});

module.exports = io;
