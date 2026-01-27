import jwt from 'jsonwebtoken';

export const userAuth= async(req, res, next)=>{
    // console.log("Headers:", req.headers);
    // console.log("Authorization Header:", req.headers.authorization);
    const token= req.headers.authorization?.split(" ")[1];
    if(!token){
        // console.log("Token: ",token)
        return res.status(401).json({message: "Unauthorized access!!"});
    }
    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded;
        next();
    }catch(err){
        console.error("User authentication error: ",err);
        if(err.name=== 'JsonWebTokenError'){
            return res.status(401).json({message: "Invalid Token..."});
        }
        if(err.name=== 'TokenExpiredError'){
            return res.status(401).json({message: "Token Expired..."});
        }
        if(err.name=== 'NotBeforeError'){
            return res.status(401).json({message: 'Token not active yet...'});
        }
        return res.status(500).json({message: "Internal Server Error!!"});
    }
}