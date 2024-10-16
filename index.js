const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const dbconnect = require('./config/dbconnect')
const cookieParser = require('cookie-parser')
const app = express()
const dotenv = require('dotenv').config()
const userauth = require('./route/useroute')
const jwt = require('jsonwebtoken')
const path = require("path");
const cloudinary = require('cloudinary').v2;
const feetroute=require('./route/feedroute')
const os=require('os')
const BatchRoute = require("./route/batch.route");
const StudentRoute =  require("./route/student.route");
const LiveclassRoute = require("./route/liveclasses.route");
const StudyMaterialRoute = require("./route/studymaterial.route");
const VideoAddRoute = require("./route/video.route");
const fileUpload = require('express-fileupload')

app.use(bodyparser.json())
app.use(bodyparser.json({ limit: '30mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '30mb' }));
app.use(express.json())
app.use(cookieParser())

app.use(cors());


dbconnect()

//cloudinary config
cloudinary.config({
    cloud_name : process.env.CLODINARY_NAME,
    api_key : process.env.CLODINARY_API_KEY,
    api_secret : process.env.CLODINARY_SECRET
});
// cloudinary.config

//All user routes
app.use(fileUpload());
app.use("/user", userauth);
app.use("/feed",feetroute);
app.use("/batch",BatchRoute);
app.use("/student",StudentRoute);
app.use("/liveclass",LiveclassRoute)
app.use("/study-material",StudyMaterialRoute);
app.use("/video",VideoAddRoute);



app.use('/videos', express.static(path.join(__dirname, 'video_materials')));

app.use('/pdfs', express.static(path.join(__dirname, 'pdf_material')));

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();

    for (const interfaceName of Object.keys(interfaces)) {
        const networkInterface = interfaces[interfaceName];

        for (const iface of networkInterface) {
            if (!iface.internal && iface.family === 'IPv4') {
                return iface.address;
            }
        }
    }

    return 'localhost';
}

const localIp = getLocalIpAddress();
console.log(localIp)

app.get("/", (req, res)=>{
    res.send("<h1>working</h1>")
})

app.get("/localip",(req,resp)=>{
    try{
        resp.json({message:'localIpfected',localIp:localIp})
    }
    catch(error){
        resp.json({message:'error in ip'})
    }
})
const PORT = process.env.PORT 

const server = app.listen(PORT,() => {
    console.log(`server is running in the ${PORT}`)
})

