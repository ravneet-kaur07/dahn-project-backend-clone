import mongoose from 'mongoose';

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected succesfully!!");
    }catch(err){
        console.error("MongoDB connection error: ", err);
    }
}

export default connectDB;
