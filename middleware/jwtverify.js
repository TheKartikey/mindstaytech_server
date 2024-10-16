const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')


const jwtverify = async (req, resp, next) => {
    const { authorization } = req.headers 
    const token = authorization?.split(" ")[1]
   // console.log('token',token)
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            const user = await User.findById(decoded._id)
            req.user = user
            // console.log(req.user)
            next()
        }
        catch {
            return resp.status(401).send({ success: false, message: "Unauth" });
        }
    }
    else {
        throw new Error("not token in header")
    }

}


const isadmin=async(req,resp,next)=>{
    const {Email}=req.user
    const admin=await User.findOne({Email})
    if(admin.Role=="admin"){
        next();
    }
    else{
        return resp.status(403).send({success:false,message:"You are not an Admin!"});
    }
}
module.exports = {jwtverify,isadmin}
