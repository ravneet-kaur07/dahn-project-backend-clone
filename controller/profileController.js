import User from "../model/users.js";

export const getProfile= async(req, res)=>{
    const user= req.user;

    res.json({user:{
        name: user.name,
        email: user.email,
        role: user.role
    }})
}

export const updateProfile= async(req, res)=>{
    const {name, email}= req.body;
    
    if(!name&& !email){
        return res.status(400).json({message: "Nothing to update here!!"});
    }

    const updated= await User.findByIdAndUpdate(
        req.user.id,
        {name, email},
        {new: true}
    )

    return res.status(200).json({message: "User profile updated successfully!!", user:{
        name: updated.name,
        email: updated.email
    }});
}

