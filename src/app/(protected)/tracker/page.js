"use client";

import { getUser } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Tracker() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";

  const [userFireData, setUserFireData] = useState(false);
  const email = data?.user?.email;

  useEffect(() => {
    if (email) {
      getUser(email).then((userData) => {
        // userData will contain the user information or null if not found
        console.log(userData);
        if (userData) {
          setUserFireData(userData);
        } else {
          window.location.href = "/onboarding";
        }
      });
    }
  }, [data]);

  return <div>{userFireData ? "Hey" : "loading your data"}</div>;
}

/*
from the given data, just return me the JSON object in given format of next period cycle:

data:
{
  "last_period_start_date": "2024-01-25",
  "average_cycle_length": 25,
  "variations_in_cycle_length": [-3, 4],
  "period_duration": 5,
  "recent_changes_in_your_cycle": "No recent changes",
  "underlying_health_conditions": "None",
  "medications": "Birth control pills (optional)",
  "stress": "Moderate stress at work"
}

format:
{
  "menstrual_phase": {
    "start_date": "2023-12-15",
    "end_date": "2023-12-20"
  },
  "follicular_phase": {
    "start_date": "2023-12-20",
    "end_date": "2023-12-23"
  },
  "ovulation_phase": {
    "start_date": "2023-12-21",
    "end_date": "2023-12-24"
  },
  "luteal_phase": {
    "start_date": "2023-12-24",
    "end_date": "2024-01-06"
  }
}
*/
