import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modules/usermodules.js";
import asyncHandler from "express-async-handler";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

//@desc register a new user
//@route POST /api/users
//@access public

export const registerUser=(asyncHandler(async(req,res)=>{
       
    const {name,email,password }=req.body

if(!name || !email || !password ){
    throw new Error('PLEASE Writie all field')
}

const userExists = await User.findOne({ email })

if(userExists){
             res.status(400)
             throw new Error("User already exists")
              }

if(password .length<6){
            throw new Error('please write 6 diffrent charcters')
             }

const salt =await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password ,salt)


  const users =await User.create(
   { name,
    email,
    password:hashedPassword,
}
  )

  if(users){
    res.status(201).send({
        _id:users._id,
        name:users.name,
        email:users.email,
        token:generateToken(users._id)
    })
  } 
  else{
      res.status(400);
    throw new Error("Invalid user data");
  }


}))


//@desc authenticate a user
//@route post /api/users/login
//@access public

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
 
//@desc  get user data
//@route get/api/users/me
//@access privete

export const getme = asyncHandler(async (req, res) => {
   const {_id,name,email}=await User.findById(req.user._id)
    res.status(200).json({
        id:_id,
        name,
        email,
        
    })
});