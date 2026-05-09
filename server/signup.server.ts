"use server";

import { SignupFormValues, SignupSchema } from "../schema/signup.schema";
import axios, { isAxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

    const { data } = await axios.post(`${API_BASE_URL}/signup.php`, apiData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("API response:", data);

    if (
      data.success === true ||
      data.status === "success" ||
      (data.message && data.message.toLowerCase().includes("success"))
    ) {
      return {
        success: true,
        message: data.message || "Account created successfully 🎉",
        data,
      };
    }

    return {
      success: false,
      message: data.message || data.error || "Failed to create account.",
    };
  } catch (error) {
    console.error("API error:", error);

    if (isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Server error occurred.",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}
