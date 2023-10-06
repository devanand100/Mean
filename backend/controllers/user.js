import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken' ;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email | !password) {
      return res.status(400).send("email and password requeired");
    }

    const user = await User.findOne({ email: email });
    console.log(user)

    if(user){
        throw new Error("User already registered")
    }

    
    const passwordEncrypted =  bcrypt.hashSync( password , 12);
    console.log(passwordEncrypted)
    const newUser = await User.create({ email:email, password:passwordEncrypted });
    
    res.status(200).json("successfully registered");

  } catch (error) {
    next(error);
  }
};

export const login =  async (req , res , next) =>{
  try{
    
    const {password , email} = req.body
    const user = await User.findOne({ email: email });

    if(!user){
        throw new Error("email or password incorrect")
    }

    const result =  bcrypt.compareSync(password,user.password);

    if(!result){
        throw new Error("email or password incorrect")
    }

    const token =  jwt.sign( {id:user.id , email:user.email} , "Nm1N0p![Zi>qHh9-kD!wLX*acV&]4{" ,{expiresIn:'1h'})
    res.status(200).json({token , expiresIn:3600});
  }catch(error){
    next(error)
  }
}
