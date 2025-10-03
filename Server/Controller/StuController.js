const StuModel = require("../Model/StuModel");


const InsertData = async(req,res)=>{
    const { name,brand,color,price} = req.body;
    const imageUrl  =req.files.map(file=>file.path);
    try {
        const Data = await StuModel.create({
            name:name,
            brand:brand,
            color:color,
            price:price,
            defaultImage:imageUrl[0],
            image:imageUrl

        })
        res.status(200).send({msg:"Product save Sucessfully"});
    } catch (error) {
        console.log(error)
    }
}


const DisplayData  =async(req,res)=>{
    const Data = await StuModel.find();
    res.status(200).send(Data);
}

module.exports = {
    InsertData,
    DisplayData

}