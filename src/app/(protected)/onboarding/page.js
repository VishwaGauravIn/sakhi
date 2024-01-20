"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";

// TODO: create a form asking for required infos and send the data on submit, redirect to dashboard

export default function Onboarding() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";

  const [initiated, setInitiated] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <p className="w-full text-center text-2xl text-pink-400 mt-10">
        Hi,
        <br />
        <span className="text-5xl text-pink-500 font-medium">
          {userFirstName}
        </span>
      </p>
      {!initiated ? (
        <>
          <img
            src="/assets/onboarding/1.jpg"
            alt=""
            className="self-center w-5/6"
          />
          <Button
            className="self-center flex text-xl py-8 w-5/6 bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg shadow-pink-500/20 ring-1 ring-pink-200"
            onClick={() => setInitiated(true)}
          >
            Let&apos;s Start <BsChevronDoubleRight />
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm opacity-90">
            Please fill these info so that we can personalize our app for you:
          </p>
        </>
      )}
    </div>
  );
}
