'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { HiOutlineMicrophone, HiPlus } from 'react-icons/hi2';
import Image from 'next/image';

import { BiAngry, BiHappyHeartEyes, BiSad, BiSmile } from 'react-icons/bi';
import Link from 'next/link';

export default function Journal() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(' ')[0] : '';

  // Format of notes array of objects
  const notes = [
    {
      mood: 'happy',
      date: 1706203768633,
      text: 'I was going through the lift and there was...',
      id: '1',
    },
    {
      mood: 'sad',
      date: 1706203768633,
      text: 'I was going through the lift and there was...',
      id: '2',
    },
    {
      mood: 'angry',
      date: 1706203768633,
      text: 'I was going through the lift and there was...',
      id: '3',
    },
    {
      mood: 'unknown',
      date: 1706203768633,
      text: 'I was going through the lift and there was...',
      id: '4',
    },
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

  const getDateAndMonthFromDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    return `${day} ${month}`;
  };

  return (
    <div className='h-[calc(100vh-140px)]'>
      <div className='text-base p-4 font-semibold'>
        <Image
          src='/assets/journal/journal.jpg'
          width={500}
          height={500}
          className='self-center'
        />
        Hello {userFirstName}! <br />
        <span className='text-[#389F8A]'>
          Write down what&apos;s on your mind today
        </span>
      </div>
      <div className='p-4'>
          <div className='text-base pb-4 font-semibold'>Recent Notes</div>

          {notes.map((note, index) => (
            <Link href={'#'} key={index}>
              <div
                className={`w-full rounded-md flex flex-row mb-2 justify-between items-start p-2 shadow-md gap-1 bg-gradient-to-br from-${getMoodBasedColor(
                  note.mood
                )}-100 to-${getMoodBasedColor(
                  note.mood
                )}-200 text-${getMoodBasedColor(note.mood)}-950`}
              >
                <div className='max-w-[80%] flex flex-row justify-start items-center'>
                  <div className='font-semibold text-center'>
                    {getDateAndMonthFromDate(note.date)}
                  </div>{' '}
                  <div
                    className={`mx-2 h-10 w-[2px] rounded-[1px] bg-${getMoodBasedColor(
                      note.mood
                    )}-900`}
                  ></div>{' '}
                  {note.text}
                </div>

                {React.createElement(getMoodBasedEmoji(note.mood), {
                  size: 24,
                  className: `fill-${getMoodBasedColor(note.mood)}-900`,
                })}
              </div>
            </Link>
          ))}
      </div>

     <div className='h-36'>
      {/* This div is only for page to get a full scroll */}
     </div>

      <div className='fixed bottom-20 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full flex flex-row justify-center items-center gap-2 bg-white ring-1 ring-gray-200'>
        <button className='h-12 aspect-square flex justify-center items-center rounded-full bg-black text-pink-50'>
          <HiPlus size={24} />
        </button>
        <button className='h-12 aspect-square flex justify-center items-center rounded-full bg-black/5 text-pink-950'>
          <HiOutlineMicrophone size={24} />
        </button>
      </div>
    </div>
  );
}
