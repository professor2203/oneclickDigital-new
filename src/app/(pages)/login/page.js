"use client";
import Image from "next/image";
import React, { useState } from "react";
import Google from "@public/assets/google-icon.svg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import SideBg from "@public/assets/signIn-bg.svg";
import "@/app/globals.css";
import Link from "next/link";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [authStatus, setAuthStatus] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthStatus("error");
        console.error("Authentication failed:", result.error);
      } else {
        toast.success("success");
        await signIn("credentials", {
          email: input.email,
          password: input.password,
          redirect: false,
          callbackUrl: "/",
        });

        setInput({ email: "", password: "" });
        router.replace("/");
      }
    } catch (error) {
      toast.error("Login error");
      console.error("Unexpected error during authentication:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 items-center mx-4 md:mx-8 lg:mx-28 my-10">
        <Toaster />
        {/* Image Section */}
        <div className="hidden lg:block xl:block mx-auto">
          <Image src={SideBg} alt="side_bg" />
        </div>

        {/* Form Section */}
        <div className="m-auto">
          <form
            className="bg-white p-8 rounded-lg shadow-lg py-7 w-full md:w-96 lg:w-96 border border-blue-400"
            onSubmit={handleSubmit}
          >
            <h1 className="flex items-center justify-center text-2xl font-sans font-bold text-blue-500">
              SIGN IN
            </h1>

            <div className="mb-4 mt-4">
              <label
                className="text-gray-500 mx-2 text-sm pb-1 block"
                htmlFor="login"
              >
                E-mail
              </label>
              <input
                value={input.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-black-200 p-3 text-sm"
                placeholder="Registered email address"
                type="email"
                id="email"
                name="email"
              />
            </div>

            <div className="">
              <label
                className="text-gray-500 mx-2 text-sm pb-1 block mt-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                value={input.password}
                required
                className="w-full rounded-lg border border-black-200 p-3 text-sm"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
              />
            </div>
            {authStatus === "error" && (
              <p className="mt-4 text-xs text-red-500 ">
                Sorry, your password was incorrect
              </p>
            )}
            <div className="text-right mt-2">
              <Link
                href={"/forgot-password"}
                className="text-xs text-gray-500 hover:text-blue-400 cursor-pointer "
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white p-2 rounded-md  transition-all mt-3"
            >
              Login
            </button>

            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="text-sm border w-full  p-2 rounded-md hover:bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 hover:bg-blue-700 hover:text-white transition-all mt-3 flex items-center gap-3 justify-center"
            >
              <span>
                <Image src={Google} alt="Google-icon" />
              </span>
              Login with Google
            </button>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              <Link
                href={"/register"}
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline hover:text-blue-400"
              >
                or sign up
              </Link>
              <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
