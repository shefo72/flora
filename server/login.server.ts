"use server";

import { LoginFormValues, loginSchema } from "../schema/login.schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

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

    console.log("Sending:", requestData);

    const options: AxiosRequestConfig = {
      url: "https://velvetbrewapi-production.up.railway.app/api/login.php",
      method: "POST",
      data: requestData,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.request(options);

    console.log("Raw response:", data);
    console.log("data.message:", data.message);
    console.log("data.success:", data.success);
    console.log("typeof data.message:", typeof data.message);

    if (
      data.message === "success" ||
      data.success === true ||
      data.status === "success"
    ) {
      console.log("Returning success");
      return {
        success: true,
        message: "Welcome Back",
        data,
      };
    }

    console.log("Returning failed - message didn't match");
    return {
      success: false,
      message: data.message || "login failed",
    };
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      console.log("Error data:", errorData);

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
