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
//admin page
const adminPage = fs.readFileSync(__dirname + '/interface/index.html', 'utf-8');

/**
 * Socket IO
 */
 const io = require('socket.io')(3001, {cors: {origin: "*"}});
io.on("connection", socket=>{
  // socket.emit("Chat-Message","Hello World!");
  socket.on("sendmessage", message=>{
    console.log(socket.id);
    socket.broadcast.emit('Chat-Message', message);
  })
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
app.get('/', (req, res) => {
  if (req.hostname != 'localhost')
    return res.status(404).send({ success: false, msg: 'Access denied' });
  res.send(adminPage);
});
// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
