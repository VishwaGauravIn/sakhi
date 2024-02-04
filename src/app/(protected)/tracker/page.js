'use client';

import Greeting from '@/components/dashboard/Greeting';
import { getUser } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaEgg } from 'react-icons/fa6';
import { MdBloodtype } from 'react-icons/md';
import { SiEsbuild } from 'react-icons/si';
import { GiCottonFlower } from 'react-icons/gi';
import { BiLoaderAlt } from 'react-icons/bi';

export default function Tracker() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(' ')[0] : '';

  const [userFireData, setUserFireData] = useState(false);
  const email = data?.user?.email;

  useEffect(() => {
    if (email) {
      getUser(email).then((userData) => {
        // userData will contain the user information or null if not found
        if (userData) {
          setUserFireData(userData);
        } else {
          window.location.href = '/onboarding';
        }
      });
    }
  }, [data]);

  function getPhaseDates(phase) {
    return (
      userFireData.menstrualCycle[phase].start_date +
      ' to ' +
      userFireData.menstrualCycle[phase].end_date
    );
  }

  return (
    <div>
      <div className='flex flex-col'>
        <Greeting userFirstName={userFirstName} />
        <hr className='w-full opacity-20' />
        <p className='text-2xl font-semibold text-center text-rose-400'>
          Your Menstrual Tracker
        </p>
        {userFireData ? (
          <>
            <Accordion
              type='multiple'
              collapsible
              className='mt-8 flex flex-col gap-4'
            >
              {/* Menstrual Phase (Period) */}
              <AccordionItem
                value='item-1'
                className='bg-gradient-to-br from-pink-50 to-pink-100 px-4 rounded-md text-pink-950 shadow-md'
              >
                <AccordionTrigger>
                  <p className='flex flex-col gap-2'>
                    <span className='flex items-center gap-1 font-semibold'>
                      <MdBloodtype /> Menstrual Phase (Period)
                    </span>
                    <span className='text-sm ml-5 text-start'>
                      {getPhaseDates('menstrual_phase')}
                    </span>
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  Menstruation is commonly known as a period. When you
                  menstruate, your uterus lining sheds and flows out of your
                  vagina. Your period contains blood, mucus and some cells from
                  the lining of your uterus. The average length of a period is
                  three to seven days. Sanitary pads, tampons, period underwear
                  or menstrual cups can be used to absorb your period. Pads and
                  tampons need to be changed regularly (preferably every three
                  to four hours) and menstrual cups should be changed every
                  eight to 12 hours.
                </AccordionContent>
              </AccordionItem>
              {/* Follicular Phase */}
              <AccordionItem
                value='item-2'
                className='bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 px-4 rounded-md text-fuchsia-950 shadow-md'
              >
                <AccordionTrigger>
                  <p className='flex flex-col gap-2'>
                    <span className='flex items-center gap-1 font-semibold'>
                      <SiEsbuild /> Follicular Phase
                    </span>
                    <span className='text-sm ml-5 text-start'>
                      {getPhaseDates('follicular_phase')}
                    </span>
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  The follicular phase starts on the first day of your period
                  and lasts for 13 to 14 days, ending in ovulation. The
                  pituitary gland in the brain releases a hormone to stimulate
                  the production of follicles on the surface of an ovary.
                  Usually, only one follicle will mature into an egg. This can
                  happen from day 10 of your cycle. During this phase, your
                  uterus lining also thickens in preparation for pregnancy.
                </AccordionContent>
              </AccordionItem>
              {/* Ovulation Phase */}
              <AccordionItem
                value='item-3'
                className='bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 rounded-md text-zinc-950 shadow-md'
              >
                <AccordionTrigger>
                  <p className='flex flex-col gap-2'>
                    <span className='flex items-center gap-1 font-semibold'>
                      <FaEgg /> Ovulation Phase
                    </span>
                    <span className='text-sm ml-5 text-start'>
                      {getPhaseDates('ovulation_phase')}
                    </span>
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  Ovulation is when a mature egg is released from an ovary and
                  moves along a fallopian tube towards your uterus. This usually
                  happens once each month, about two weeks before your next
                  period. Ovulation can last from 16 to 32 hours. It is possible
                  to get pregnant in the five days before ovulation and on the
                  day of ovulation, but it’s more likely in the three days
                  leading up to and including ovulation. Once the egg is
                  released, it will survive up to 24 hours. If sperm reaches the
                  egg during this time, you may get pregnant.
                </AccordionContent>
              </AccordionItem>
              {/* Luteal Phase */}
              <AccordionItem
                value='item-4'
                className='bg-gradient-to-br from-sky-50 to-sky-100 px-4 rounded-md text-sky-950 shadow-md'
              >
                <AccordionTrigger>
                  <p className='flex flex-col gap-2'>
                    <span className='flex items-center gap-1 font-semibold'>
                      <GiCottonFlower /> Luteal Phase
                    </span>
                    <span className='text-sm ml-5 text-start'>
                      {getPhaseDates('luteal_phase')}
                    </span>
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  After ovulation, cells in the ovary (the corpus luteum),
                  release progesterone and a small amount of oestrogen. This
                  causes the lining of the uterus to thicken in preparation for
                  pregnancy. If a fertilised egg implants in the lining of the
                  uterus, the corpus luteum continues to produce progesterone,
                  which maintains the thickened lining of the uterus. If
                  pregnancy does not occur, the corpus luteum dies, progesterone
                  levels drop, the uterus lining sheds and the period begins
                  again.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        ) : (
          <div className='flex flex-row justify-center items-center p-4'>
            <BiLoaderAlt className='text-4xl animate-spin' />
          </div>
        )}
      </div>
    </div>
  );
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
