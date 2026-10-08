import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";


//Cookie options 

const cookieOptions= {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7*24*60*60*1000
}

// Student Register

export const registerStudent = async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success: false, message: "All fields are required", })
        }

        //check if existng email

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.json({success:false, message:"student already exist with given email-Id"})
        }

        //hashing password

        const hashedPassword = await bcrypt.hash(password,10);

        //creating user

        const user = User.create({
            name,
            email,
            password:hashedPassword,
            role:"student"
        })

        //generating token

        const token= generateToken({
            id:user._id,
            role:user.role
        })

        //passing token to cookies

        res.cookie("token",token,cookieOptions); //res if of agument passed in this function

        return res.json({
            success:true,
            message:"student registered",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })



    }catch(errro){
        console.log("error",error);
        return res.json({message: "Internal server errro",error})
    }
}

//Login student