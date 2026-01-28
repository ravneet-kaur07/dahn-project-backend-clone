import express from 'express';
import User from '../model/users.js';
import { registerSchema } from '../utils/validations/authValidations.js';
import { loginSchema } from '../utils/validations/authValidations.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register= async(req, res)=>{
    try{
        const parsed= registerSchema.safeParse(req.body);
        console.log("Parsed data: ", parsed.data);
        if(!parsed.success){
            return res.status(400).json({message: "Validation Failed", errors: parsed.error.flatten().fieldErrors})
        }

        const {name, email, password, role}= parsed.data;
        if(!name|| !email|| !password|| !role){
            return res.status(400).json({message: "All fields are required!!"});
        }
        const existing= await User.findOne({email});
        if(existing){
            return res.status(500).json({message: "User already exists!!"});
        }
        const user= new User({name, email, password, role});
        await user.save();

        return res.status(200).json({message: "User registered successfully!!", user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }})

    }catch(err){
        console.error("Error while registering the user: ",err);
        return res.status(500).json("Registeration failed!!");
    }
}


export const login= async(req,res)=>{
    try{
        const parsed= loginSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({message: "Validation Failed", errors: parsed.error.flatten().fieldErrors})
        }
        const {email, password}= parsed.data;
        const user= await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({message: "Invalid Credentials!!"});
        }
        if(user.status!=="active"){
            return res.status(400).json({messgae: "Account is Inactive"});
        }
        const match= await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({message: "Invalid Credentials!!"});
        }

        const token= jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "2d"}
        )

        // console.log("Token generated: ",token);

        // user.password= undefined;

        res.status(200).json({message: "Login successful!!", token, user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        }});

    }catch(err){
        console.log("Login failed: ",err);
        return res.status(500).json({message: "Login failed"})
    }
}