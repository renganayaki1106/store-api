import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import UserModel from "../models/userAuth.model.js"

const secret = "test";

// user signup

export const signup = async (req, res) => {
    const {userName, email, phone, password} = req.body;
    try {
        const existingUser = await UserModel.findOne({email});
        const existingPhone = await UserModel.findOne({phone});

        if(existingUser) {
            return res.json({message:"User already exists"});
        }

        if(existingPhone) {
            return res.json({message:"Phone number already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await UserModel.create({
            userName:userName,
            email:email,
            phone:phone,
            password:hashedPassword
        });

        const token = jwt.sign({email:result.email}, secret, {expiresIn:"1h"});
        res.status(201).json({result,token})
        //res.json({message:"User created successfully"})
        
    } catch(error) {
        return res.json({message:"Something went wrong"})
    }
}

//user login

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const oldUser = await UserModel.findOne({email});
        if(!oldUser) {
            return res.json({message:"User doesnt exists"})
        } 

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordCorrect) {
            return res.json({message:"Invalid credentials"})
        }
        
        const token = jwt.sign({email:oldUser.email}, secret, {expiresIn:"1h"})
        res.status(200).json({result : oldUser ,token})
    } catch(error) {
        return res.json({message:"Something went wrong"})
    }
}