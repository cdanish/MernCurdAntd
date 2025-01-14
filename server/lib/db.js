import mongoose from "mongoose";
mongoose.set('strictQuery', true); 

const ConnectMongoDb = async () =>{
    try{

        const url = "mongodb+srv://danishchaush78:root@cluster0.ofdi0gk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/student";
        await mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`connected mongoDB`);

    }catch(error){
        console.log(error);
    }
}

export default ConnectMongoDb;