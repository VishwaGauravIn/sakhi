import { myth_fact } from "@/data/myth_fact";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdFactCheck } from "react-icons/md";

export default function FactCheck() {
  return (
    <div>
      <p className="text-2xl font-semibold text-center text-emerald-600 flex flex-col justify-center items-center gap-2">
        <MdFactCheck className="inline-block mt-0.5 text-5xl" />
        Fact Check
      </p>
      <div className="flex flex-col mt-4 gap-4">
        {myth_fact.map((item, index) => (
          <MythFactComp key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

function MythFactComp({ data }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 flex flex-col gap-2">
      {/* Mark */}
      <div className="relative flex items-center text-sm">
        <div
          className={`p-2 rounded-full ring-[2px] ring-zinc-100 z-10 ${
            data.type === "fact" ? "bg-green-500" : "bg-red-500 "
          }`}
        >
          {data.type === "fact" ? (
            <FaCheck className="w-4 text-white" />
          ) : (
            <FaX className="w-4 text-white" />
          )}
        </div>
        <span
          className={`uppercase h-8 flex items-center pl-10 pr-4 rounded-full -ml-7 text-white font-medium tracking-wider ${
            data.type === "fact" ? "bg-green-500" : "bg-red-500 "
          }`}
        >
          {data.type}
        </span>
      </div>
      {/* Heading */}
      <p className="text-lg font-medium">{data.heading}</p>
      <p className="text-sm opacity-80 -mt-1">{data.explanation}</p>
    </div>
  );
}
