import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Resume from "../models/Resume.js";
import { sendRegisterOtpMail } from "../config/mailer.js";

const registrationOtps = new Map();
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

const generateToken = (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET, {expiresIn: '7d'})
    return token;
}

const generateOtp = () => `${Math.floor(100000 + Math.random() * 900000)}`;

//controller for sending register OTP
//POST: /api/users/register/send-otp
export const sendRegisterOtp = async (req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "Missing required fields"});
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({email: normalizedEmail});
        if(user){
            return res.status(400).json({message:"User already exist"});
        }

        const otp = generateOtp();
        const hashedPassword = await bcrypt.hash(password,10);

        registrationOtps.set(normalizedEmail, {
            otp,
            name: name.trim(),
            email: normalizedEmail,
            hashedPassword,
            expiresAt: Date.now() + OTP_TTL_MS
        });

        let emailSent = true;
        try {
            await sendRegisterOtpMail({
                toEmail: normalizedEmail,
                userName: name.trim(),
                otp
            });
        } catch (mailError) {
            emailSent = false;
            console.error("OTP email send failed:", mailError.message);
        }

        // In production, OTP must be delivered via email.
        // Returning success without OTP blocks registration flow for real users.
        if (!emailSent && process.env.NODE_ENV === "production") {
            return res.status(500).json({
                message: "OTP email send failed. Check SMTP settings and try again."
            });
        }

        return res.status(200).json({
            message: emailSent ? "OTP sent successfully" : "SMTP not configured. Use dev OTP",
            ...(process.env.NODE_ENV !== "production" ? { devOtp: otp } : {})
        });
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

//controller for User Registration
//POST: /api/users/register
export const  registerUser = async (req,res) => {
    try{
        const {email,otp}=req.body;

        if(!email || !otp){
            return res.status(400).json({message: "Email and OTP are required"});
        }

        const normalizedEmail = email.toLowerCase().trim();
        const otpRecord = registrationOtps.get(normalizedEmail);

        if(!otpRecord){
            return res.status(400).json({message: "OTP not found. Please request a new OTP"});
        }

        if(Date.now() > otpRecord.expiresAt){
            registrationOtps.delete(normalizedEmail);
            return res.status(400).json({message: "OTP expired. Please request a new OTP"});
        }

        if(otpRecord.otp !== otp){
            return res.status(400).json({message: "Invalid OTP"});
        }

        //check if user already exist
        const user=await User.findOne({email: normalizedEmail})
        if(user){
            registrationOtps.delete(normalizedEmail);
            return res.status(400).json({message:"User already exist"});
        }

        //create new user
        const newUser=await User.create({
            name: otpRecord.name,
            email: otpRecord.email,
            password: otpRecord.hashedPassword
        })

        registrationOtps.delete(normalizedEmail);

        //return success message
        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(201).json({message:"User Created successfully",token,user:newUser});

    }catch(error){
        return res.status(400).json({message:error.message});
    }
}

//controller for User Login
//POST: /api/users/login
export const  loginUser = async (req,res) => {
    try{
        const {email,password}=req.body;
       
        //check if already exist
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invlaid email or password"});
        }

        //check if password is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({message:"Invlaid email or password"});
            
        }

        //return success message
        const token = generateToken(user._id);
        user.password = undefined;

        return res.status(200).json({message:"Login Successful",token,user});

    }catch(error){
        return res.status(400).json({message:error.message});
    }
}

//controller for getting user by id
//Get: /api/users/data
export const  getUserById = async (req,res) => {
    try{
        const userId = req.userId;

        //check if user exist
        const user=await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        //return user
        user.password=undefined;
        return res.status(200).json({user});

    }catch(error){
        return res.status(400).json({message:error.message});
    }
}


//controller for getting user resumes
//GET:/api/users/resumes
export const getUserResumes=async (req,res) => {
    try{
        const userId=req.userId;

        //return user resumes
        const resumes =await Resume.find({userId});

        return res.status(200).json({resumes});
    }catch(error){
        return res.status(400).json({message:error.message});
    }
}
