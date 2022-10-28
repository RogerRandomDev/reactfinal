const bcrypt=require("bcrypt")
const saltRuns=2
const hashString=async (toHash)=>{return await bcrypt.genSaltSync(saltRuns,bcrypt.hash(toHash,saltRuns,(err,hash)=>hash))}
const compareHash=async(comparedTo,hashed)=>{return bcrypt.compare(comparedTo,hashed)}

module.exports = {hashString,compareHash};