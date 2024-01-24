'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { HiOutlineMicrophone, HiPlus } from 'react-icons/hi2';

export default function Journal() {

  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";

  return (
    <div>
      <div className='text-base p-4 font-semibold'>
        Hello {userFirstName}! <br />
        <span className='text-[#389F8A]'>Write down what&apos;s on your mind today</span> 
      </div>

      <div className='fixed bottom-20 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full flex flex-row justify-center items-center gap-2 bg-white ring-1 ring-gray-200'>
      <button className='h-14 aspect-square flex justify-center items-center rounded-full bg-black text-pink-50'><HiPlus size={32} /></button>
      <button className='h-14 aspect-square flex justify-center items-center rounded-full bg-black/5 text-pink-950'><HiOutlineMicrophone size={32} /></button>
    </div>
    </div>
  );
}
