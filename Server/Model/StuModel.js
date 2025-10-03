
const mongoose  =require("mongoose");
const StuSchema = new mongoose.Schema({
    name:String,
    brand:String,
    color:String,
    price:String,
    defaultImage:String,
    image:[String]
})


module.exports = mongoose.model("ppmodel", StuSchema);