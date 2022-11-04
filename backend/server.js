require('dotenv').config();
const express = require('express');
const { getUser, createUser, buildUserData } = require('./controllers/User');
const { login, logout, updateToken} = require('./controllers/auth');
const {sendConfirmationEmail,recieveConfirmationToken} = require("./middleware/accountConfirmation")
const app = express();
const cors = require('cors');

app.use(cors());


app.post('/user/createAccount', async (req, res) => {
  const userData = buildUserData(req);
  sendConfirmationEmail(userData)
  return res.status(200).send({success:true,msg:"Sent confirmation email successfully"})
});
app.get('/user/Login', async (req, res) => {
  const userData = buildUserData(req);
  var log=await login(userData)
  console.log(log.msg)
  return await res.status(200).send(log);
});
app.get("/token",async (req,res)=>{
  const userToken=req.get("token")
  var updatedToken=await updateToken(userToken);
  res.status(200).send(updatedToken);
})
app.get("/user/confirmAccount",async (req,res)=>{
  console.log("account authenticated")
  var userData=await recieveConfirmationToken(req,res)
  if(!userData.success) return res.send("Authentication Failed")
  await createUser(userData.decoded)
  res.send("Account Authenticated")
})
app.get("/",(req,res)=>{
  res.status(404).send({success:false,msg:"Access denied"})
})
app.listen(process.env.PORT, () => {
  console.log('server is running on port 5000');
});
