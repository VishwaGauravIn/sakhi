"use client";

import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import { generateMenstrualCycle } from "@/lib/utils";

export default function Onboarding() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";

  const [initiated, setInitiated] = useState(false);

  const [menstrualData, setMenstrualData] = useState({
    last_period_start_date: "",
    average_cycle_length: 22,
    variations_in_cycle_length: 0,
    period_duration: 5,
    recent_changes_in_your_cycle: "",
    underlying_health_conditions: "",
    medications: "",
    stress: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const menstrualCycle = generateMenstrualCycle(menstrualData);
    const docRef = collection(db, "users");
    setDoc(doc(docRef, data?.user?.email), { menstrualData, menstrualCycle })
      .then(() => {
        window.location.href = "/dashboard";
      })
      .catch((e) => {
        toast.error("Something went wrong");
      });
  }

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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 accent-pink-400"
          >
            <label htmlFor="name" className="text-sm">
              Last period start date*
            </label>
            <input
              type="date"
              id="name"
              required
              value={menstrualData.last_period_start_date}
              onChange={(e) =>
                setMenstrualData({
                  ...menstrualData,
                  last_period_start_date: e.target.value,
                })
              }
              className="w-full p-2 border-2 border-pink-400 rounded-md"
            />
            <label htmlFor="name" className="text-sm">
              Average cycle length* [21-35 days normally]
            </label>
            <div className="flex">
              <input
                type="range"
                name=""
                id=""
                min={14}
                max={40}
                required
                defaultValue={22}
                className="w-11/12"
                value={menstrualData.average_cycle_length}
                onChange={(e) =>
                  setMenstrualData({
                    ...menstrualData,
                    average_cycle_length: e.target.value,
                  })
                }
              />
              <span className="mx-auto">
                {menstrualData.average_cycle_length}
              </span>
            </div>
            <label htmlFor="name" className="text-sm">
              Variations in cycle length* [+/- 7 days normally]
            </label>
            <div className="flex">
              <input
                type="range"
                name=""
                id=""
                min={0}
                max={7}
                required
                defaultValue={0}
                className="w-11/12"
                value={menstrualData.variations_in_cycle_length}
                onChange={(e) =>
                  setMenstrualData({
                    ...menstrualData,
                    variations_in_cycle_length: e.target.value,
                  })
                }
              />
              <span className="mx-auto">
                {menstrualData.variations_in_cycle_length}
              </span>
            </div>
            <label htmlFor="name" className="text-sm">
              Period duration* [3-7 days normally]
            </label>
            <div className="flex">
              <input
                type="range"
                name=""
                id=""
                required
                min={0}
                max={7}
                defaultValue={3}
                className="w-11/12"
                value={menstrualData.period_duration}
                onChange={(e) =>
                  setMenstrualData({
                    ...menstrualData,
                    period_duration: e.target.value,
                  })
                }
              />
              <span className="mx-auto">{menstrualData.period_duration}</span>
            </div>
            <label htmlFor="name" className="text-sm">
              Recent Changes In Your Cycle
            </label>
            <input
              type="text"
              placeholder="No recent changes"
              value={menstrualData.recent_changes_in_your_cycle}
              onChange={(e) =>
                setMenstrualData({
                  ...menstrualData,
                  recent_changes_in_your_cycle: e.target.value,
                })
              }
              className="w-full p-2 border-2 border-pink-400 rounded-md"
            />
            <label htmlFor="name" className="text-sm">
              Underlying Health Conditions
            </label>
            <input
              type="text"
              placeholder="eg. PCOS, Endometriosis, Thyroid, etc."
              value={menstrualData.underlying_health_conditions}
              onChange={(e) =>
                setMenstrualData({
                  ...menstrualData,
                  underlying_health_conditions: e.target.value,
                })
              }
              className="w-full p-2 border-2 border-pink-400 rounded-md"
            />
            <label htmlFor="name" className="text-sm">
              Medications
            </label>
            <input
              type="text"
              placeholder="Birth control pills"
              value={menstrualData.medications}
              onChange={(e) =>
                setMenstrualData({
                  ...menstrualData,
                  medications: e.target.value,
                })
              }
              className="w-full p-2 border-2 border-pink-400 rounded-md"
            />
            <label htmlFor="name" className="text-sm">
              Stress
            </label>
            <input
              type="text"
              placeholder="Low, Medium, High"
              value={menstrualData.stress}
              onChange={(e) =>
                setMenstrualData({
                  ...menstrualData,
                  stress: e.target.value,
                })
              }
              className="w-full p-2 border-2 border-pink-400 rounded-md"
            />
            <Button
              type="submit"
              className="self-center flex text-xl py-3 px-6  bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg shadow-pink-500/20 ring-1 ring-pink-200"
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
