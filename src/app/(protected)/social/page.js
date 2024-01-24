import React from 'react';

import PostUI from '@/components/social/PostUI';
import Learn from '@/components/social/Learn';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';

import { HiOutlinePlusCircle } from 'react-icons/hi2';

export default function Social() {
  return (
    <Tabs defaultValue='forYou' className='w-full'>
      <TabsList className='w-full bg-transparent'>
        <TabsTrigger
          value='forYou'
          className='w-full border-b-2 data-[state=active]:border-b-pink-400 data-[state=active]:text-pink-600 data-[state=active]:shadow-none font-semibold'
        >
          For You
        </TabsTrigger>
        <TabsTrigger
          value='learn'
          className='w-full border-b-2 data-[state=active]:border-b-pink-400 data-[state=active]:text-pink-600 data-[state=active]:shadow-none font-semibold'
        >
          Learn
        </TabsTrigger>
      </TabsList>

      <TabsContent value='forYou'> 

        {/* Create Post Button */}
        <button
          variant='primary'
          className='fixed bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-1 justify-center items-center py-2 px-6 text-lg text-slate-700 border-2 bg-white rounded-full'
        >
          <HiOutlinePlusCircle size={24} /> Post
        </button>

        {/* Post UI compoentns mapping posts dynanmically */}
        <PostUI />
        <PostUI />
        <PostUI />
        <PostUI />

      </TabsContent>

      <TabsContent value='learn'>

        {/* Differnet learning techniques links */}
        <Learn />

      </TabsContent>
    </Tabs>
  );
}
