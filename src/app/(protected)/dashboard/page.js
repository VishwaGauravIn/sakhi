"use client";

import Greeting from "@/components/dashboard/Greeting";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Dashboard() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";
  return (
    <div>
      <Greeting userFirstName={userFirstName} />
      <hr className="w-full" />
      <div className="flex my-4">
        <div className="w-6/12 text-center flex flex-col justify-center items-center text-lg font-bold translate-x-8 text-[#DB6542]">
          What Would You Like<span className="text-[#389F8A]">to do Today?</span>
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
      Dashboard
    </div>
  );
}
