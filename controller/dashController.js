

export const getDash= async(req,res)=>{
    // res.send("Welcome to the Dashboard!!");

    // console.log("Cookies: ", req.cookies);
    const role= req.user.role;

    const common= ["suggestions", "settings", "change_password"];
    let modules= [...common];

    if(role==="agency"){
        modules.push("manage_staff", "manage_subscription");
    }
    if(role=="individual_nurse"){
        modules.push("manage_subscription");
    }

    res.json({modules});
}

export const settings= async(req, res)=>{
    res.send("Settings Page");
}

export const staff= async(req, res)=>{
    res.send("Staff List page")
}

export const suggestions= async(req,res)=>{
    res.send("Suggestions.....");
}
export const changePass= async(req,res)=>{
    res.send("Change PAssword......")
}

export const subscription= async(req, res)=>{
    res.send("Subscription........")
}