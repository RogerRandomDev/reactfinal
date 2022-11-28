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
const chatRouter = require("./Routes/chat")
//admin page
const adminPage = fs.readFileSync(__dirname + '/interface/index.html', 'utf-8');
//Don't need this anymore, i'm using WebSocket (ws) and got the setup for us now.
//go to middleware, controller,and routes.
//middleware handles the actual connection to the websocket itself
//the controller and router handle getting info and old messages from the database along with storing them
// /*
// * Socket IO
// */
//io.on("connection", socket=>{
// const io = require('socket.io')(3001, {cors: {origin: "*"}});
  //  socket.on("sendmessage", message=>{
//  // socket.emit("Chat-Message","Hello World!");
  //    socket.broadcast.emit('Chat-Message', message);
//    console.log(socket.id);
//});
//  })


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
app.use("/chat",chatRouter)
app.get('/', (req, res) => {
  if (req.hostname != 'localhost')
    return res.status(404).send({ success: false, msg: 'Access denied' });
  res.send(adminPage);
});
// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
