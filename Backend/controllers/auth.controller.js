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