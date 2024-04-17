"use client";
import axios from "axios";
import Image from "next/image";
import { NextResponse } from "next/server";
import React, { useState } from "react";
import Google from "@public/assets/google-icon.svg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Error from "@public/assets/error.svg";
import toast, { Toaster } from "react-hot-toast";
import SideBg from "@public/assets/signUp-bg.svg";
import Link from "next/link";

function Register() {
  const [input, setInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const [userError, setUserError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userExistsResponse = await axios.post("/api/userExists", {
        email: input.email,
      });
      const { user } = userExistsResponse.data;

      if (user) {
        setUserError("error");
        console.log("User already exists");
        return;
      }

      await axios.post("/api/register", input).then((res) => {
        new NextResponse(res);
      });

      toast.success("success");

      router.replace("/login");
      setInput({ email: "", password: "" });
    } catch (error) {
      toast.error("Registration Error");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 items-center mx-auto lg:mx-28 my-10 ">
        <Toaster />
        {/* Image-Section */}
        <div className="hidden lg:block xl:block">
          <div>
            <Image src={SideBg} alt="side_bg" />
          </div>
        </div>
        {/* Form-Section */}
        <div className="mx-auto">
          <form
            className="bg-white p-8 rounded-lg shadow-lg py-7 w-full md:w-96 lg:w-96 border border-blue-400"
            onSubmit={handleSubmit}
          >
            <h1 className="flex items-center justify-center text-2xl font-sans font-bold text-blue-500">
              SIGN UP
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
            {userError === "error" && (
              <p className="text-xs text-red-500 mx-2 gap-1 mb-3 flex items-center">
                <span>
                  <Image src={Error} alt="Error-Svg" />
                </span>{" "}
                The user already exists.
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white p-2 rounded-md transition-all mt-3"
            >
              Login
            </button>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="text-sm border w-full p-2 rounded-md hover:bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 hover:bg-blue-700 hover:text-white transition-all mt-3 flex items-center gap-3 justify-center"
            >
              <span>
                <Image src={Google} alt="Google-icon" />
              </span>
              Login with Google
            </button>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              <Link
                href={"/login"}
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline hover:text-blue-400"
              >
                or sign in
              </Link>
              <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
