import { PERMISSIONS } from "../config/permissions.js";

export const rbacMiddleware= (reqPermissions)=>{
    return (req, res, next)=>{
        if(!req.user|| !req.user.role){
            return res.status(401).json({message: "Unauthorized!!"});
        }

        const userRole= req.user.role;
        const permissions= PERMISSIONS[userRole];
        // console.log(permissions);

        if(!permissions){
            return res.status(403).json({message: "Invalid role!!"})
        }
        // if(allowedRole!==req.user.role){
        //     return res.status(403).json({message: "Access Denied!!"})
        // }

        if(!permissions.includes(reqPermissions)){
            return res.status(403).json({message: "Access Denied!!"});
        }

        next();
    }
}

