import { z } from "zod";

export const UserSchema = z.object({
    id: z.number().optional(),
    full_name: z.string().min(1, "Full name is required"),
    date_birth: z.string().refine((date) => !isNaN(Date.parse(date)), {message: "Invalid date format",}),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
    .regex(/^(?=.*[A-Z])(?=.*[a-z]).+$/, "Password must contain at least one uppercase and one lowercase letter")
    .regex(/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-])/, "Password must contain at least one special character")
    .regex(/^(?=.*\d).+$/, "Password must contain at least one number"),
    phone: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});