const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { updateToken, checkToken } = require('./controllers/auth');
const app = express();
const cors = require('cors');
const fs = require('fs');
//routers
const userRouter = require('./Routes/user');
const productRouter = require('./Routes/product');
const chatRouter = require('./Routes/chat');
//admin page
const adminPage = fs.readFileSync(__dirname + '/interface/index.html', 'utf-8');
// /*
// * Socket IO
// */
const io = require('socket.io')(3001, {
  cors: { origin: '*' },
});

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find sessions
    const session = null; // get session from mongo database with this ID
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      return next();
    }
  }
  socket.sessionID = String(Math.random()); // for now
  console.log(socket.handshake.auth);
  // socket.userID = socket.request._query['request'];
  // socket.userID = JSON.parse(localStorage.getItem('user'))._id; // get from localstorage
  // console.log(socket.sessionID, socket.userID);
  next();
});

io.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
    });
  }
  socket.emit('users', users);

  socket.emit('session', {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.broadcast.emit('user connected', {
    userID: socket.id,
  });

  socket.on('sendmessage', (message) => {
    socket.broadcast.emit('Chat-Message', message);
  });

  socket.on('private message', ({ content, to }) => {
    console.log(to);
    socket.to(to).emit('private message', {
      content,
      from: socket.id,
    });
  });
});

/**
 * App
 */
app.use(cors());
app.options('*', cors());

app.use(express.text({ limit: '26mb' }));

app.post('/token', async (req, res) => {
  const userToken = req.get('token');
  if (userToken == undefined) {
    return res.status(202).send({ success: false, msg: 'invalid' });
  }
  var updatedToken = await updateToken(userToken);
  res.status(200).send({ success: true, token: updatedToken });
});

app.use('/user', userRouter);
//these require authentication at the given time
app.use('/', async (req, res, next) => {
  if (
    false &&
    (!(await checkToken(req.get('token'))) || req.get('token') == undefined)
  ) {
    return res.send({ success: false, msg: 'invalid/no token' });
  }

  next();
});
app.use('/product', productRouter);
app.use('/chat', chatRouter);
app.get('/', (req, res) => {
  if (req.hostname != 'localhost')
    return res.status(404).send({ success: false, msg: 'Access denied' });
  res.send(adminPage);
});
// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
