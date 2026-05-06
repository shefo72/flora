import { z } from 'zod';

export const SignupSchema = z.object({
    firstName: z.string().nonempty("First name is required").min(3, "Name must be at least 3 characters long").max(50, "Name must be less than 50 characters long"),
    lastName: z.string().nonempty("Last name is required").min(3, "Name must be at least 3 characters long").max(50, "Name must be less than 50 characters long"),
    email: z.string().nonempty("Email is required").pipe(z.email("Invalid email address")),
    password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase latter")
        .regex(/[a-z]/, "Password must contain at least one lowercase latter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&(),.?"{}<>|]/, "Password must contain at least one special character"),
    phone: z.string().nonempty("Phone is required").regex(/^(\+2)?01[0125][0-9]{8}$/, "Only Egyptian phone numbers are allowed"),
    birthday: z.string().nonempty('Birthday is required'),

});


export type SignupFormValues = z.infer<typeof SignupSchema>;