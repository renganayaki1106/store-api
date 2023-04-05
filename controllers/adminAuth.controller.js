import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import AdminModel from "../models/adminAuth.model.js"

const secret = "test";

// admin signup

export const adminSignup = async (req, res) => {
    const {userName, email,password} = req.body;
    try {
        const existingUser = await AdminModel.findOne({email});

        if(existingUser) {
            return res.json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await AdminModel.create({
            userName:userName,
            email:email,
            password:hashedPassword
        });

        const token = jwt.sign({email:result.email}, secret, {expiresIn:"1h"});
        res.status(201).json({result,token})
        //res.json({message:"User created successfully"})
        
    } catch(error) {
        return res.json({message:"Something went wrong"})
    }
}

//admin login

export const adminLogin = async (req,res) => {
    const {email, password} = req.body;
    try {
        const oldUser = await AdminModel.findOne({email});
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