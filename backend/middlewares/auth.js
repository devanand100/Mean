import jwt from "jsonwebtoken"

export const auth = (req, res , next) => {
    try{
    const token =  req.header('authorization').split(' ')[1];
    if(!token){
        return res.status(401).json("auth failed")
    } 
     const user =  jwt.verify( token , "Nm1N0p![Zi>qHh9-kD!wLX*acV&]4{");
     
     req.user = user;
    next()
}catch(error){
   if(error.name === "JsonWebTokenError"){
     next(new Error("not authorized"))
   }
    next(error);
}
}   

