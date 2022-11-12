require('dotenv').config();
const express = require('express');
const {updateToken} = require('./controllers/auth');
const app = express();
const cors = require('cors');
const fs=require("fs")
//routers
const userRouter=require("./Routes/user")
const productRouter=require("./Routes/product")
//admin page
const adminPage=fs.readFileSync(__dirname+"/interface/index.html",'utf-8')
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/token",async (req,res)=>{
  const userToken=req.get("token")
  var updatedToken=await updateToken(userToken);
  res.status(200).send({success:true,token:updatedToken});
})

app.use("/user",userRouter)
app.use("/product",productRouter)
app.get("/",(req,res)=>{
  if(req.hostname!="localhost") return res.status(404).send({success:false,msg:"Access denied"})
  res.send(adminPage)
  
})

app.listen(process.env.PORT, () => {
  console.log('server is running on port 5000');
});
