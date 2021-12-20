const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config();
const url = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000
const AuthRoute = require('./Routes/Auth')
const cors = require('cors');
const userRoute = require('./Routes/Users');
const postRoute = require('./Routes/Posts');
const categoryRoute = require('./Routes/Categories');
const multer = require('multer');
const path = require('path')


app.use(express.json());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(console.log("Connected to DB"))
.catch((err) => console.log(err))

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images")
    },
    filename:(req,file,cb) => {
        cb(null,req.body.name)
    },
});

const upload = multer({storage:storage});
app.post("/upload",upload.single("file"),(req,res) => {
    res.status(200).json("File has been uploaded.")
})

app.use("/",AuthRoute)
app.use("/user",userRoute)
app.use("/posts",postRoute)
app.use("/categories",categoryRoute)

app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT} `)
});