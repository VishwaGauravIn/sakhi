"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { RiHeart2Line } from "react-icons/ri";
import { MdOutlineSos } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { Button } from "./ui/button";
import { toast } from "./ui/Toast";

export default function HeaderNav() {
  return (
    <SessionProvider>
      <nav className="p-2 sticky top-0 z-30 bg-white h-16 flex items-center justify-between">
        <p className={`flex text-4xl gap-1 items-center text-pink-400 `}>
          <RiHeart2Line className="text-5xl heartbeat" />
        </p>
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="destructive"
            className="flex gap-1 justify-center items-center py-1 px-4 text-3xl text-red-50 ring-2 ring-red-400 rounded-full bg-[#E04759]"
            onClick={() => (window.location.href = "tel:100")}
          >
            <IoIosWarning className="text-lg" />
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

// // Not available in newer browsers
// async function makeCall() {
//   try {
//     // Request permission to use telephony features
//     await navigator.permissions
//       .query({ name: "telephony" })
//       .then((permissionStatus) => {
//         if (permissionStatus.state === "granted") {
//           // If permission is granted, make the call
//           const phoneNumber = "100";
//           navigator.telephony.dial(phoneNumber);
//         } else {
//           // Permission not granted
//           toast.error("Telephony permission denied.");
//         }
//       });
//   } catch (error) {
//     console.error("Error making the call:", error);
//   }
// }
