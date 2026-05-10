"use server";

import { LoginFormValues, loginSchema } from "../schema/login.schema";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function loginAction(values: LoginFormValues) {
  const validationResult = loginSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      const message = issue.message;

      if (!errors[key]) {
        errors[key] = message;
      }
    });

    return {
      success: false,
      message: "validation error",
      errors,
    };
  }

  try {
    const { rememberMe, ...requestData } = values;

    const options: AxiosRequestConfig = {
      url: `${API_BASE_URL}/login.php`,
      method: "POST",
      data: requestData,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.request(options);

    if (
      data.message === "success" ||
      data.success === true ||
      data.status === "success"
    ) {
      return {
        success: true,
        message: "Welcome Back",
        data,
      };
    }

    return {
      success: false,
      message: data.message || "login failed",
    };
  } catch (error) {
    console.error("Error:", error);

    if (isAxiosError(error)) {
      const errorData = error.response?.data;

      return {
        success: false,
        message: errorData?.message || errorData?.error || "Server error",
        error: errorData,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Unknown error",
    };
  }
}
