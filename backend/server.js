require('dotenv').config();
const express = require('express');
const { getUser, createUser, buildUserData } = require('./controllers/User');
const { login, logout } = require('./controllers/auth');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send('loaded');
});

app.post('/user/createAccount', async (req, res) => {
  const userData = buildUserData(req);
  return await res.status(200).send(await createUser(userData));
});
app.get('/user/Login', async (req, res) => {
  const userData = buildUserData(req);
  var log=await login(userData)
  console.log(log)
  return await res.status(200).send(log);
});

app.listen(process.env.PORT, () => {
  console.log('server is running on port 5000');
});
