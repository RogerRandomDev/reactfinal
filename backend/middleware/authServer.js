//TODO Figure out where to use this
require('dotenv').config()
const express = require('express')
const req = require('express/lib/request')
const app = express()
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./tokenAuthenticate')

app.use(express.json())
//Normally you would store your refresh tokens 
//in a database but for this use case we are storing them here instead
let refreshTokens =[]
//Remember again that everytime the server restarts you  will loose all the refresh tokens.DATABASE


app.post('/token', (req, res) => {
    const refreshToken =req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken))return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,user) => {
        if(err) {return res.sendStatus(403)}
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken:accessToken})
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login',(req,res)=>{
    //Authenticate Users-You should alread have code for authentication
    const username = req.body.username
    const user = {name:username}
    //Assuming that the authentication has been completed thje jwt.sign
    //Should also include the password
    // const accessToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
    /*OPEN NEW TERMINAL
        node
        require('crypto').randomBytes(64).toString('hex')
    */
    refreshTokens.push(refreshToken)
    res.json({accessToken:accessToken,refreshToken:refreshToken})
})

//middleware
function generateAccessToken(user) {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '90min'})//10-25minute normally
}


app.listen(4000,()=>{
    console.log('server is running on port 4000')
})