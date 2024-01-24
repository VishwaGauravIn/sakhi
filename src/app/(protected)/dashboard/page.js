"use client";

import Greeting from "@/components/dashboard/Greeting";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaBookOpen } from "react-icons/fa6";
import { MdEmergency, MdWaterDrop } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { RiMentalHealthFill } from "react-icons/ri";
import { HiChatBubbleBottomCenterText, HiUserGroup } from "react-icons/hi2";
import { BiSolidAlarmExclamation } from "react-icons/bi";
import { GiCupcake } from "react-icons/gi";
import Link from "next/link";

export default function Dashboard() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";

  const menuItems = [
    { color: "rose", label: "Cycle", href: "/tracker", icon: MdWaterDrop },
    { color: "amber", label: "Journal", href: "/journal", icon: FaBookOpen },
    {
      color: "green",
      label: "Safety",
      href: "/",
      icon: AiFillSafetyCertificate,
    },
    { color: "fuchsia", label: "Support", href: "/", icon: RiMentalHealthFill },
    { color: "orange", label: "Community", href: "/social", icon: HiUserGroup },
    {
      color: "sky",
      label: "Sakhi Bot",
      href: "/",
      icon: HiChatBubbleBottomCenterText,
    },
    {
      color: "emerald",
      label: "Reminders",
      href: "/",
      icon: BiSolidAlarmExclamation,
    },
    { color: "pink", label: "Emergency", href: "/", icon: MdEmergency },
    {
      color: "cyan",
      label: "Desserts",
      href: "https://www.swiggy.com/desserts-restaurants-near-me",
      icon: GiCupcake,
    },
  ];

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
        {menuItems.map((item) => (
          <GridElement key={item.label} data={item} />
        ))}
      </div>
      dashboard
    </div>
  );
}

function GridElement({ key, data }) {
  return (
    <Link href={data.href}>
      <div
        key={key}
        className={`w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-lg gap-1 bg-gradient-to-br from-${data.color}-100 to-${data.color}-200 text-${data.color}-950`}
      >
        {React.createElement(data.icon, {
          className: `w-1/2 h-1/3 fill-${data.color}-900`,
        })}
        <span className="font-semibold">{data.label}</span>
      </div>
    </Link>
  );
}
