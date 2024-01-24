"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center gap-10 mt-10 relative">
      <p className="text-3xl font-semibold">Login to Sakhi</p>
      <div className="">
        <Image src="/assets/login/login.jpg" width={500} height={500} />
      </div>
      <button
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
}
