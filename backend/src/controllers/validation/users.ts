import z from "zod";

export const userRegister = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({
        message: "Email is not valid"
    }),
    password: z.string().min(6, {message: "Password must contain at least 6 characters"}),
    level: z.string(),
    role: z.string()
});