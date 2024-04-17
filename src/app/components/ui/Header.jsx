"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import "@/app/globals.css";
import {
  Drawer,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  ModalClose,
} from "@mui/joy";
import Navbar from "./Navbar";
import Image from "next/image";
import Logo from "@public/assets/Logo/logo-white.svg";
import DrawerLogo from "@public/assets/Logo/main-logo.svg";
import Mail from "@public/assets/mail.svg";
import Phone from "@public/assets/phone.svg";
import { ArrowDropDown } from "@mui/icons-material";

function Header() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const status = session?.status;
  console.log(status);
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  } else if (userName?.includes("@gmail.com")) {
    userName = userName.replace("@gmail.com", "");
  }

  const openDrawer = () => {
    setOpen("success");
  };

  const dropsLink = [
    { href: "/auto", label: "Auto" },
    { href: "/bike", label: "Bike" },
    { href: "/health", label: "Health" },
    { href: "/family", label: "Family" },
    { href: "/travel", label: "Travel" },
    { href: "/life", label: "Life" },
    { href: "/home", label: "Home" },
    { href: "/tracker", label: "Tracker" },
  ];
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faqs", label: "FAQs" },
  ];
  return (
    <>
      <Navbar />
      <header className=" bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 ">
        <div className="m-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className=" md:items-center md:gap-12 md:hidden">
              <Link className="block text-teal-600" href={"/"}>
                <Image src={Logo} alt="logo_icon" width={75} />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <Link
                    href={"/"}
                    className="text-white transition hover:text-slate-300 "
                  >
                    Home
                  </Link>

                  <Dropdown>
                    <MenuButton
                      variant="plain"
                      size="sm"
                      endDecorator={<ArrowDropDown />}
                      className="text-sm font-sans text-white hover:bg-transparent hover:text-slate-300"
                    >
                      Takaful & Insurance
                    </MenuButton>
                    <Menu size="sm">
                      {dropsLink.map((drop) => (
                        <>
                          <Link href={drop.href} className="px-4 ">
                            <MenuItem>{drop.label}</MenuItem>
                          </Link>
                        </>
                      ))}
                    </Menu>
                  </Dropdown>

                  {navLinks.map((link) => (
                    <>
                      <Link
                        href={link.href}
                        className="text-white transition hover:text-slate-300 "
                      >
                        {link.label}
                      </Link>
                    </>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4 flex items-center">
                {status === "authenticated" && (
                  <>
                    <div className="gap-3 flex items-center">
                      <Link
                        href={"/profile"}
                        className="text-white transition hover:text-slate-300 whitespace-nowrap "
                      >
                        Hello,{userName}
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className="inline-block rounded-md text-sm bg-white px-5 py-2.5 font-medium  transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring hover:bg-blue-600 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}

                {status === "unauthenticated" && (
                  <>
                    <Link
                      href={"/login"}
                      className="rounded-md bg-blue-600  hover:bg-white hover:text-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    >
                      SignIn
                    </Link>

                    <div className="hidden sm:flex">
                      <Link
                        href={"/register"}
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        Register
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Toggle-Btn  */}
              <div className="block md:hidden">
                <button
                  onClick={openDrawer}
                  type="button"
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 "
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Drawer  */}
                {open === "success" && (
                  <>
                    <Drawer open={open} onClose={() => setOpen(false)}>
                      <ModalClose />
                      <div className="flex h-screen flex-col justify-between border-e bg-white">
                        <div className="">
                          <Image
                            src={DrawerLogo}
                            alt="Logo"
                            width={100}
                            className="mx-5"
                          />

                          <ul className="mt-6 px-6 space-y-4 text-md font-semibold text-black font-sans">
                            <li>
                              <Link
                                href={"/"}
                                className="block hover:text-blue-500"
                              >
                                Home
                              </Link>
                            </li>

                            <li>
                              <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center   hover:text-blue-500">
                                  Takaful & Insurance <ArrowDropDown />
                                </summary>

                                {dropsLink.map((drop) => (
                                  <>
                                    <Link
                                      href={drop.href}
                                      className="block  hover:text-blue-500 text-black my-2 px-6"
                                    >
                                      {drop.label}
                                    </Link>
                                  </>
                                ))}
                              </details>
                            </li>

                            {navLinks.map((links) => (
                              <>
                                <Link
                                  href={links.href}
                                  className=" hover:text-blue-500  block"
                                >
                                  {links.label}
                                </Link>
                              </>
                            ))}
                          </ul>
                        </div>

                        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 mb-5">
                          {/* Email  */}
                          <div className="flex items-center ">
                            <Image
                              alt="mail_icon"
                              src={Mail}
                              className=" w-14 text-blue-600 "
                            />

                            <p className="text-xs font-sans font-semibold text-black">
                              Email Us <br />
                              Info@theoneclickdigital.com
                            </p>
                          </div>

                          {/* COntact  */}
                          <div className="flex items-center">
                            <Image
                              alt="phone_icon"
                              src={Phone}
                              className="w-14 text-blue-600 "
                            />

                            <p className="text-xs text-black font-sans font-semibold block">
                              Contact Us
                              <span className="block">+92 333 242 5588</span>
                              <span>+92 333 828 7111</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Drawer>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
