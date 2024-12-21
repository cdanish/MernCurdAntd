import mongoose from "mongoose";
mongoose.set('strictQuery', true); 

const ConnectMongoDb = async () =>{
    try{

        const url = process.env.MONGO_URL;
        await mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`connected mongoDB`);

    }catch(error){
        console.log(error);
    }
}

export default ConnectMongoDb;