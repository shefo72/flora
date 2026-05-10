"use client";

import { useEffect } from "react";
import Image from "next/image";
import signupImage from "../../../public/assets/images/signImage.webp";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../../../schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import loginAction from "../../../server/login.server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setAuthInfo } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/Input";
import { BrandButton } from "@/components/ui/BrandButton";
// import { AppState } from '../../store/store';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Sign In - Petal & Bloom";
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await loginAction(values);

      if (response.success) {
        const userData = {
          ...response.data.user,
          role: response.data.role,
        };

        dispatch(
          setAuthInfo({
            isAuthenticated: true,
            userInfo: userData,
          }),
        );

        toast.success(response.message);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(response.message || "Login failed");
        console.log("Error message:", response.message);

        if (response?.errors) {
          Object.keys(response.errors).forEach((field) => {
            setError(field as keyof LoginFormValues, {
              message: response.errors[field],
            });
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[#4A5D4A]">
        <div className="absolute inset-0">
          <Image
            src={signupImage}
            alt="Botanical background"
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 mx-4 w-full max-w-md rounded-xl bg-[#ffffffda] p-8 shadow-2xl md:p-10">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-normal text-[#2D2D2D] md:text-3xl">
              Petal & Bloom
            </h1>
            <div className="mx-auto my-3 h-px w-12 bg-[#D4D4D4]"></div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#6B6B6B]">
              Sign in to your sanctuary
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email Address"
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email}
            />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-[#6B6B6B] hover:text-[#2D2D2D] cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`w-full border-b border-[#D4D4D4] bg-transparent pb-2 text-sm text-[#2D2D2D] placeholder-[#A0A0A0] outline-none transition-colors focus:border-[#4A5D4A] ${
                    errors.password ? "border-red-400 focus:border-red-500" : ""
                  }`}
                  id="password"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="mt-0.5 text-[10px] text-red-500/90 lg:text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[#C4C4C4] bg-white checked:border-[#4A5D4A] checked:bg-[#4A5D4A]"
                  {...register("rememberMe")}
                />
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white peer-checked:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <label htmlFor="remember" className="text-xs text-[#6B6B6B]">
                Remember me for 30 days
              </label>
            </div>

            <BrandButton type="submit">
              Sign In
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </BrandButton>
          </form>

          <div className="my-6 border-t border-[#F0F0F0]"></div>

          <div className="text-center">
            <p className="mb-1 text-xs text-[#6B6B6B]">New to the boutique?</p>
            <Link
              href="/signup"
              className="text-sm font-medium text-[#2D2D2D] underline hover:no-underline cursor-pointer"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
