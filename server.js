import dotenv from 'dotenv'
import express from 'express';
import authRouter from './routes/authRoutes.js';
import dashRouter from './routes/dashRoutes.js';
import connectDB from './config/db.js'; 
import profileRouter from './routes/profileRoutes.js';
import cors from 'cors';

dotenv.config();
const app= express();
app.use(express.json());
app.use(cors());
app.use('/', authRouter);
app.use('/dashboard', dashRouter);
app.use('/profile', profileRouter);

app.listen(process.env.PORT, ()=>{
    try{
        connectDB();
        console.log("Server running on port: ", process.env.PORT);
    }catch(err){
        console.log("Error while connecting to the server: ", err);
    }
})