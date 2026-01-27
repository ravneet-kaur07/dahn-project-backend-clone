import dotenv from 'dotenv'
import express from 'express';
import authRouter from './routes/authRoutes.js';
import connectDB from './config/db.js'; 

dotenv.config();
const app= express();
app.use(express.json());
app.use('/', authRouter);

app.listen(process.env.PORT, ()=>{
    try{
        connectDB();
        console.log("Server running on port: ", process.env.PORT);
    }catch(err){
        console.log("Error while connecting to the server: ", err);
    }
})