"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { HiOutlineMicrophone, HiPlus } from "react-icons/hi2";
import Image from "next/image";

import { BiAngry, BiHappyHeartEyes, BiSad, BiSmile } from 'react-icons/bi';
import Link from 'next/link';

export default function Journal() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(' ')[0] : '';

  // Format of notes array of objects
  const notes = [
    {
      mood: 'happy',
      date: '25/01/2024',
      id: '1',
    },
    {
      mood: 'sad',
      date: '24/01/2024',
      id: '2',
    },
    {
      mood: 'angry',
      date: '21/01/2024',
      id: '3',
    },
    {
      mood: 'unknown',
      date: '20/01/2024',
      id: '4',
    }
  ];

  const getMoodBasedEmoji = (mood) => {
    switch (mood) {
      case 'happy':
        return BiSmile;
      case 'sad':
        return BiSad;
      case 'angry':
        return BiAngry;
      default:
        return BiHappyHeartEyes;
    }
  };

  const getMoodBasedColor = (mood) => {
    switch (mood) {
      case 'happy':
        return 'amber';
      case 'sad':
        return 'cyan';
      case 'angry':
        return 'rose';
      default:
        return 'green';
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="text-base p-4 font-semibold">
        <Image
          src="/assets/journal/journal.jpg"
          width={500}
          height={500}
          className="self-center"
        />
        Hello {userFirstName}! <br />
        <span className="text-[#389F8A]">
          Write down what&apos;s on your mind today
        </span>
      </div>

      {/* Recent Notes */}

      <div className='text-base px-4 font-semibold'>Recent Notes</div>

      <div className='pl-4 relative'>
        <div className='w-full overflow-x-auto flex flex-row gap-4 snap-x snap-mandatory py-2'>
          
          {/* Mapping notes array giving icons and color based on mood of each object */}
          {notes.map((note, index) => (
            <Link href={'#'} key={index}>
              <div
                className={`min-w-[40%] aspect-square rounded-md flex flex-col justify-between items-start p-2 shadow-md gap-1 bg-gradient-to-br from-${getMoodBasedColor(note.mood)}-100 to-${getMoodBasedColor(note.mood)}-200 text-${getMoodBasedColor(note.mood)}-950`}>

                {React.createElement(getMoodBasedEmoji(note.mood), {
                  size: 48,
                  className: `fill-${getMoodBasedColor(note.mood)}-900`,
                })}
                <span className='font-semibold'>{note.date}</span>

              </div>
            </Link>
          ))}

        </div>

        {/* Gradient Overlay towards right */}
        <div className='absolute top-0 -right-2 h-full w-14 bg-gradient-to-r from-white/0 to-white'></div>
      </div>


      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full flex flex-row justify-center items-center gap-2 bg-white ring-1 ring-gray-200">
        <button className="h-14 aspect-square flex justify-center items-center rounded-full bg-black text-pink-50">
          <HiPlus size={32} />
        </button>
        <button className="h-14 aspect-square flex justify-center items-center rounded-full bg-black/5 text-pink-950">
          <HiOutlineMicrophone size={32} />
        </button>
      </div>
    </div>
  );
}
