"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { RiHeart2Line } from "react-icons/ri";
import { MdOutlineSos } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { Button } from "./ui/button";

export default function HeaderNav() {
  return (
    <SessionProvider>
      <nav className="p-2 sticky top-0 z-10 bg-white h-20 flex items-center justify-between">
        <p className={`flex text-4xl gap-1 items-center text-pink-400 `}>
          <RiHeart2Line className="text-5xl heartbeat" />
        </p>
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="destructive"
            className="flex gap-1 justify-center items-center py-1 px-4 text-4xl text-red-50 ring-2 ring-red-400 rounded-full bg-[#E04759]"
          >
            <IoIosWarning className="text-xl" />
            <MdOutlineSos className="" />
          </Button>
          <UserComponent />
        </div>
      </nav>
    </SessionProvider>
  );
}

function UserComponent() {
  const { data } = useSession();
  return (
    <>
      {data?.user?.image && (
        <Link href="/profile">
          <img
            src={data.user.image}
            rel="noreferrer"
            alt=""
            className="h-11 w-11 bg-rose-300 rounded-full ring-2 ring-pink-400"
          />
        </Link>
      )}
    </>
  );
}
