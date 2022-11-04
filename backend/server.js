require('dotenv').config();
const express = require('express');
const {updateToken} = require('./controllers/auth');
const app = express();
const cors = require('cors');
//routers
const userRouter=require("./Routes/user")




app.use(cors());



app.get("/token",async (req,res)=>{
  const userToken=req.get("token")
  var updatedToken=await updateToken(userToken);
  res.status(200).send({success:true,token:updatedToken});
})
app.use("/user",userRouter)

app.get("/",(req,res)=>{
  res.status(404).send({success:false,msg:"Access denied"})
})

app.listen(process.env.PORT, () => {
  console.log('server is running on port 5000');
});
