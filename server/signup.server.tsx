'use server'

import { SignupFormValues, SignupSchema } from "../schema/signup.schema";
import axios from "axios";

export default async function signupAction(values: SignupFormValues) {
    const validationResult = SignupSchema.safeParse(values);

    if (!validationResult.success) {
        const errors: Record<string, string> = {};
        validationResult.error.issues.forEach((issue) => {
            const field = issue.path[0] as string;
            if (!errors[field]) errors[field] = issue.message;
        });
        return { success: false, errors };
    }

    try {
        const apiData = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
            phone: values.phone,
            birthday: values.birthday,
        };

        const { data } = await axios.post(
            'https://velvetbrewapi-production.up.railway.app/api/signup.php',
            apiData
        );

        console.log("API response:", data);

        if (data.message && data.message.toLowerCase().includes('success')) {
            return { 
                success: true, 
                message: data.message, 
                data 
            };
        }

        return {
            success: false, 
            message: data.message || "Failed to create account."
        };

    } catch (error) {
        console.error("API error:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || "Server error.",
        };
    }
}