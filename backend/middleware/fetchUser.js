const jwt= require('jsonwebtoken');
const fetchUser=(req,res,next)=>{
JWT_SECRET='Tarnvirsingh213'
    //Get the user from the jwt token and add id to req 
    const token=req.header('auth-token');
    console.log(token);
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token11"});
    }
    try {
        const data= jwt.verify(token,JWT_SECRET);
        console.log(data);
        req.user=data.user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({error:"Please authenticate using a valid token22"});
    }
} 
module.exports= fetchUser;