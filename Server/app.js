const express= require("express");
const app =express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();
const StuRoute = require("./Routes/StuRoute")

app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.CONNECTION).then(()=>{
    console.log("DB IS CONNECTED");
})




const port = process.env.PORT 
app.use("/student", StuRoute);
app.listen(port,()=>{
    console.log(`Server is running on ${port} port`)
})





