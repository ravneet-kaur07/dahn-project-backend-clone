import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const UserSchema= mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["agency", "individual_nurse", "staff_nurse"]
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {timestamps: true})

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    // next();
})

const User= mongoose.model("User", UserSchema);
export default User;