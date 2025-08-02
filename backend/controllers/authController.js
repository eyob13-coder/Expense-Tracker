import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

//Register user
export const registerUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {fullName, email, password, profileImageUrl} = req.body;

        // Check required fields after destructuring
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        
        const newUsers = await User.create([{ 
            fullName, 
            email, 
            profileImageUrl, 
            password 
        }], {session});

        const token = jwt.sign(
            {userId: newUsers[0]._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRES_IN || "1h"}
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            data: {
                token,
                user: newUsers[0]
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
//login User
export const loginUser = async (req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message:  "Invalid credentials"});
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({message: "Error registering User", error: err.message});
        next(err);
    }
    
};
//getUserInfo
export const getUserInfo = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(400).json({message: "User not found", error: err.message});
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: "Error registering User", error: err.message});
        next(err);
    };
};