"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { RiHeart2Line } from "react-icons/ri";

export default function HeaderNav() {
  return (
    <SessionProvider>
      <nav className="p-2 sticky top-0 z-10 bg-white h-20 flex items-center justify-between">
        <p
          className={`flex text-4xl gap-1 items-center text-pink-400 `}
        >
          <RiHeart2Line className="text-5xl" />
        </p>
        <UserComponent />
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
