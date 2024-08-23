import User from "../models/useModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Invalid data!",
        success: false,
      });
    }
    //check if the user exists
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(401).json({ 
        message: "User already exists",
        success:false });
    }
    //create a new user

    const hashedPassword = await bcrypt.hash(password, 10);
     const user=await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //create a token for the user
    const payload = {user:{id:user.id}};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});



    return res.status(201).json({
      message: "User account created successfully.",
      success: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const Login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(401).json({
            success:false,
            message:"Please provide email and password"
        });
    }
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email!" });
    }
    //check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    //create a token
    const payload = { user: { id: user._id } };
    const token =  jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    return res.status(201).cookie("token",token,{httpOnly:true}).json({
        message: `Welcome back ${user.username}`,
        success: true,
        token
      });
  } catch (error) {}
};

export const Logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{
            expiresIn: new Date(Date.now()),
            httpOnly:true
        }).json({
            message:"Logged out successfully",
            success:true
        })
    }catch(e){
        console.log('Logout failed');
    }
}
