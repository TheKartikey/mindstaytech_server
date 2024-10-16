const route=require('express').Router()
const {generateopt,verifyOtp,createUser,getuser,loginVerification}=require('../controllers/userctrl')
const {jwtverify,isadmin}=require('../middleware/jwtverify')

//User routes 
route.post("/generateotp",generateopt)
route.post("/verifyotp",verifyOtp)
route.post("/register",createUser)
route.get("/getuser",jwtverify,getuser)
route.post("/login",loginVerification)

module.exports=route

