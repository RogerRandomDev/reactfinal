require('dotenv').config()
const express = require('express')
const req = require('express/lib/request')
const app = express()
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./middleware/tokenAuthenticate')

app.use(express.json())

const posts = [
    {
        username: 'Bernard',
        title: 'Instructor'
    },{
        username: 'Andi',
        title: 'Tool'
    },{
        username: 'Patty',
        title: 'Burger'
    }
]

app.get('/posts',authenticateToken,(req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})


app.listen(5000,()=>{
    console.log('server is running on port 5000')
})