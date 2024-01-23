'use client';

import React, { useState } from 'react';

import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHeart,
  HiOutlineShare,
} from 'react-icons/hi2';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const PostUI = () => {
  const [isPostLiked, setIsPostLiked] = useState(false);

  return (
    <>
      <Card className='my-2 shadow-none'>
        <CardHeader>
          <CardDescription className='flex flex-row justify-between items-center'>
            <span className='text-gray-500'>5h ago</span>
            <span className='bg-pink-400 px-2 rounded-full ring-1 ring-pink-300 text-white text-sm'>
              Volunteer
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Here are some tips for healthy lifestyle Prioritize self-care and
            make time for activities that bring you joy and relaxation. Develop
            a routine that includes adequate sleep, regular exercise, and
            healthy eating.
          </p>
        </CardContent>
        <CardFooter className='flex flex-row justify-start text-base items-center gap-2'>
          <button
            className='flex flex-row justify-center text-pink-400 items-center gap-1 outline-none border-none cursor-pointer'
            onClick={() => {
              setIsPostLiked(!isPostLiked);
            }}
          >
            <HiOutlineHeart
              className={isPostLiked ? 'fill-pink-400' : ''}
              size={20}
            />{' '}
            27.7K
          </button>
          <button className='flex flex-row justify-center items-center gap-1 outline-none border-none cursor-pointer'>
            <HiOutlineChatBubbleBottomCenterText
              className='text-gray-800 ml-2'
              size={20}
            />
            1.2K
          </button>
          <button className='flex flex-row justify-center items-center gap-1 outline-none border-none cursor-pointer'>
            <HiOutlineShare className='text-gray-800 ml-2' size={20} />
          </button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PostUI;
