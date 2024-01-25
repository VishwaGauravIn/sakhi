import { db } from "@/config/firebase";
import { clsx } from "clsx";
import { doc, getDoc } from "firebase/firestore/lite";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function getUser(email) {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // User not found
      return null; // Indicate user not found with a more meaningful value
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export function generateMenstrualCycle(inputData) {
  const {
    last_period_start_date,
    average_cycle_length,
    variations_in_cycle_length,
    period_duration,
  } = inputData;

  // Calculate key dates
  const lastPeriodStartDate = new Date(last_period_start_date);
  const follicularPhaseStart = new Date(lastPeriodStartDate);
  follicularPhaseStart.setDate(lastPeriodStartDate.getDate() + period_duration);
  const ovulationPhaseStart = new Date(follicularPhaseStart);
  ovulationPhaseStart.setDate(
    ovulationPhaseStart.getDate() +
      Math.floor(average_cycle_length / 2) -
      Math.floor(variations_in_cycle_length / 2)
  );
  const lutealPhaseStart = new Date(ovulationPhaseStart);
  lutealPhaseStart.setDate(
    lutealPhaseStart.getDate() +
      Math.floor(average_cycle_length / 2) +
      Math.ceil(variations_in_cycle_length / 2)
  );

  // Generate output format
  const output = {
    menstrual_phase: {
      start_date: last_period_start_date,
      end_date: new Date(
        lastPeriodStartDate.setDate(
          lastPeriodStartDate.getDate() + period_duration
        )
      )
        .toISOString()
        .split("T")[0],
    },
    follicular_phase: {
      start_date: follicularPhaseStart.toISOString().split("T")[0],
      end_date: new Date(
        follicularPhaseStart.setDate(
          follicularPhaseStart.getDate() +
            Math.floor(average_cycle_length / 2) -
            Math.floor(variations_in_cycle_length / 2)
        )
      )
        .toISOString()
        .split("T")[0],
    },
    ovulation_phase: {
      start_date: ovulationPhaseStart.toISOString().split("T")[0],
      end_date: new Date(
        ovulationPhaseStart.setDate(ovulationPhaseStart.getDate() + 1)
      )
        .toISOString()
        .split("T")[0],
    },
    luteal_phase: {
      start_date: lutealPhaseStart.toISOString().split("T")[0],
      end_date: new Date(
        lutealPhaseStart.setDate(
          lutealPhaseStart.getDate() +
            Math.floor(average_cycle_length / 2) +
            Math.ceil(variations_in_cycle_length / 2)
        )
      )
        .toISOString()
        .split("T")[0],
    },
  };

  return output;
}
