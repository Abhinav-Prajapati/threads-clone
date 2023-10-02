import mongoose from "mongoose"


export const connectToDB = async()=>{
    mongoose.set("strictQuery",true);
    if(!process.env.MONGODB_URL){
        return console.log("mongoDB URL not found in the env file");
    }
    try{
        mongoose.connection.on("connected",()=>{
            console.log("database connected ")
        })
        mongoose.connection.on("disconnected",()=>{
            console.log("database disconnected");
        })
        await mongoose.connect(process.env.MONGODB_URL);  
        
    }catch(error:any){
        console.log(error.message);
    }
}
