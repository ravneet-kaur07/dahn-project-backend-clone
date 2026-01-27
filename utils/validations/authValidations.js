import {z} from 'zod';

export const registerSchema= z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least six characters long"),
    role: z.enum(["agency", "individual_nurse", "staff_nurse"], {message: "Role is required"})
})

export const loginSchema= z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required!!")
})
