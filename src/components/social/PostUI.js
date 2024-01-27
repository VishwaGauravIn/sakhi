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
} from '@/components/ui/card';

function timeAgo(firebaseTimestamp) {
  const now = new Date();
  const postTime = firebaseTimestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date

  const timeDifference = now - postTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? '1 hr ago' : `${hours} hrs ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 min ago' : `${minutes} mins ago`;
  } else {
    return 'just now';
  }
}

const PostUI = ({ post }) => {
  const [isPostLiked, setIsPostLiked] = useState(false);

  return (
    <Card className='my-2 shadow-none'>
      <CardHeader>
        <CardDescription className='flex flex-row justify-between items-center'>
          <span className='text-gray-500'>{timeAgo(post.createdAt)}</span>
          {post?.type && (
            <span className='bg-pink-400 px-2 rounded-full ring-1 ring-pink-300 text-white text-sm'>
              Volunteer
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='whitespace-pre-wrap'>{post.post}</p>
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
  );
};

export default PostUI;
