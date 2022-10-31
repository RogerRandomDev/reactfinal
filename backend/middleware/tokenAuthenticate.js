//TODO Figure out where to use this
const jwt=require('jsonwebtoken')

function authenticateToken(req, res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]//if there is an authHeader then split it and if not return null
    //Bearer TOKEN 
    if(token==null) return res.sendStatus(401)//No token- No authHeader
    //Now verify token
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403) //invalid token no access
        req.user = user
        next()
    })
}
module.exports = { authenticateToken }