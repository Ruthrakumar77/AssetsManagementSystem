import mongoose from "mongoose"

let URL= "mongodb://127.0.0.1:27017/AssetsManagement"

export const dbConnect = async () =>{
    try{
        await mongoose.connect(URL)
        console.log("db connection successfully")
    } catch(error){
        console.log("db connection failed")
    }
}


