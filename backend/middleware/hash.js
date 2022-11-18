const bcrypt=require("bcrypt")
const crypto=require("crypto")
const saltRuns=2
require('dotenv').config()
const cipher=crypto.createCipher("aes-256-cbc",process.env.ENCRYPT_KEY)
const decipher=crypto.createDecipher('aes-256-cbc',process.env.ENCRYPT_KEY)
const hashString=async (toHash)=>{return await bcrypt.genSaltSync(saltRuns,bcrypt.hash(toHash,saltRuns,(err,hash)=>hash))}
const compareHash=async(comparedTo,hashed)=>{return bcrypt.compare(comparedTo,hashed)}

const encryptData=(data)=>{
    var a=cipher.update(data,'utf8','hex')
    return a+cipher.final('hex')
}
const decryptData=(data)=>{
    var a=decipher.update(text,'hex','utf8')
    return a+decipher.final('utf8')
}
module.exports = {hashString,compareHash,encryptData,decryptData};