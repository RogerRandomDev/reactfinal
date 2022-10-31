require('dotenv').config();
const express = require('express');
const {getUser,createUser,buildUserData}=require("./controllers/User");
const {login, logout}=require("./controllers/auth")
const app = express()


app.get("/",(req,res)=>{
    console.log('connected')
    return res.status(200).send("loaded")})

app.post('/createAccount',async (req,res)=>{
    console.log("a")
    const userData=buildUserData(req)
    await res.json(await createUser(userData))
})
app.post("/Login",async (req,res)=>{
    const userData=buildUserData(req)
    await res.json(await login(userData))
})

app.listen(process.env.PORT,()=>{
    console.log('server is running on port 5000')
})