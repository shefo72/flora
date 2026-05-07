"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import signupImage from "../../public/assets/images/signImage.webp";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, SignupSchema } from "../../schema/signup.schema";
import signupAction from "../../server/signup.server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
    },

    resolver: zodResolver(SignupSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
    try {
      const response = await signupAction(values);
      console.log({ response });

      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.message || "Signup failed");

        if (response.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof SignupFormValues, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Head>
        <title>Create Account - Botanical Sanctuary</title>
      </Head>

      <div className="flex h-screen w-full overflow-hidden bg-[#F9F7F2]">
        <div className="flex h-full w-full flex-col md:w-1/2">
          <div className="flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
            <div className="mx-auto w-full max-w-md">
              <h1 className="mb-1 text-2xl font-normal text-[#2D2D2D] lg:mb-2 lg:text-3xl">
                Create your account
              </h1>
              <p className="mb-6 text-xs leading-relaxed text-[#6B6B6B] lg:mb-8 lg:text-sm">
                Welcome to our botanical sanctuary. Please enter your details to
                begin your journey.
              </p>

              <form
                className="space-y-4 lg:space-y-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your First Name"
                      className="w-full border-b border-[#D4D4D4] bg-transparent pb-2 text-sm text-[#2D2D2D] placeholder-[#A0A0A0] outline-none transition-colors focus:border-[#4A5D4A]"
                      id="first-name"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="mt-0.5 text-[10px] text-red-500 lg:text-xs">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Last Name"
                      className="w-full border-b border-[#D4D4D4] bg-transparent pb-2 text-sm text-[#2D2D2D] placeholder-[#A0A0A0] outline-none transition-colors focus:border-[#4A5D4A]"
                      id="last-name"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="mt-0.5 text-[10px] text-red-500 lg:text-xs">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border-b border-[#D4D4D4] bg-transparent pb-2 text-sm text-[#2D2D2D] placeholder-[#A0A0A0] outline-none transition-colors focus:border-[#4A5D4A]"
                    id="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-0.5 text-[10px] text-red-500 lg:text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full border-b border-[#D4D4D4] bg-transparent pb-2 text-sm text-[#2D2D2D] placeholder-[#A0A0A0] outline-none transition-colors focus:border-[#4A5D4A]"
                    id="phone"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-0.5 text-[10px] text-red-500 lg:text-xs">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs">
                    Birthday
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      placeholder="Select your birthday"
                      className="w-full border-b border-[#D4D4D4] bg-transparent pb-2 pr-10 text-sm text-[#2D2D2D] outline-none transition-colors focus:border-[#4A5D4A]"
                      id="birthday"
                      {...register("birthday")}
                    />
                    {errors.birthday && (
                      <p className="mt-0.5 text-[10px] text-red-500 lg:text-xs">
                        {errors.birthday.message}
                      </p>
                    )}
                  </div>
                  <p className="mt-1 text-[10px] text-[#8B8B8B] lg:text-xs">
                    must be a valid date.
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full border-b border-[#D4D4D4] bg-transparent pb-2 pr-10 text-sm text-[#2D2D2D] outline-none transition-colors focus:border-[#4A5D4A]"
                      id="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="mt-0.5 text-[10px] text-red-500 lg:text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <p className="mt-1 text-[10px] text-[#8B8B8B] lg:text-xs">
                    Must be at least 8 characters long.
                  </p>
                </div>

                {/* <div className="flex items-start gap-2 pt-1 lg:gap-3 lg:pt-2">
                  <div className="relative flex items-center">
                    <input type="checkbox" id="terms" className='accent-green-600'
                      {...register("terms")} />
                            <label htmlFor="terms">
                                <span className='mb-1  text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs'>I agree to the </span>
                                <a href={"#"} className='mb-1 text-[10px] font-medium uppercase tracking-wider text-[#76ae76] lg:mb-2 lg:text-xs underline'>Terms</a>
                                <span className='mb-1  text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs'> and</span>
                                <a href={"#"} className='mb-1 text-[10px] font-medium uppercase tracking-wider text-[#76ae76] lg:mb-2 lg:text-xs underline'> Privacy Policy</a>
                            </label>
                  </div>
                </div>
                    {errors.terms && <p className="mt-0.5 text-[10px] text-red-500 lg:text-xs">{errors.terms.message}</p>} */}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#4A5D4A] hover:bg-[#76ae76]  py-3 text-sm font-medium text-white lg:py-3.5"
                >
                  Create Account
                </button>

                <div className="relative flex items-center py-1 lg:py-2">
                  <div className="grow border-t border-[#E0E0E0]"></div>
                  <span className="mx-3 text-[10px] font-medium uppercase tracking-wider text-[#8B8B8B] lg:mx-4 lg:text-xs">
                    Or join with
                  </span>
                  <div className="grow border-t border-[#E0E0E0]"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#D4C9B8] rounded-lg hover:bg-[#4a5d4a7b] transition-colors duration-200">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-sm text-[#4A3728]">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#D4C9B8] rounded-lg hover:bg-[#4a5d4a7b] transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span className="text-sm text-[#4A3728]">Apple</span>
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-[#8B7355]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#4A5D4A] font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={signupImage}
            alt="Botanical flowers arrangement"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
