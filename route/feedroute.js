const route=require('express').Router()
const {createFeed,GetFeed,DeleteFeed}=require('../controllers/feedctrl')
const multer=require('multer')
//importing the model from user.js file

const storage=multer.memoryStorage()
const upload=multer({storage})
route.post('/createfeed',upload.single('postImage'),createFeed)
route.get('/getfeed',GetFeed)
route.delete('/getfeed/:_id',DeleteFeed)
module.exports=route
