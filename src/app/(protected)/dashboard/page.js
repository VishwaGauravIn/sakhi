"use client";

import Greeting from "@/components/dashboard/Greeting";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Bs0Circle } from "react-icons/bs";

export default function Dashboard() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";
  return (
    <div>
      <Greeting userFirstName={userFirstName} />
      <hr className="w-full" />
      {/* wwyltdt hero */}
      <div className="flex my-4 sticky top-20 bg-white">
        <div className="w-6/12 text-center flex flex-col justify-center items-center text-lg font-bold translate-x-8 text-[#DB6542]">
          What Would You Like
          <span className="text-[#389F8A]">to do Today?</span>
        </div>
        <div className="w-6/12 overflow-hidden">
          <Image
            src={"/assets/dashboard/think.png"}
            width={998}
            height={622}
            className="translate-x-10"
          />
        </div>
      </div>
      {/* Grid Menu */}
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-rose-200 to-rose-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-rose-900" />
        </div>
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-amber-200 to-amber-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-amber-900" />
        </div>
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-green-200 to-green-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-green-900" />
        </div>
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-fuchsia-200 to-fuchsia-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-fuchsia-900" />
        </div>
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-orange-200 to-orange-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-orange-900" />
        </div>
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-sky-200 to-sky-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-sky-900" />
        </div>
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-emerald-200 to-emerald-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-emerald-900" />
        </div>
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-pink-200 to-pink-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-pink-900" />
        </div>
        <div className="w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-xl bg-gradient-to-br from-cyan-200 to-cyan-300">
          <Bs0Circle className="w-1/2 h-1/2 fill-cyan-900" />
        </div>
      </div>
      dashboard
    </div>
  );
}
