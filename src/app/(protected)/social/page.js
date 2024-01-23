'use client';

import PostUI from '@/components/social/PostUI';
import React, { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <PostUI />
        <PostUI />
        <PostUI />
        <PostUI />
      </TabsContent>
      <TabsContent value='learn'>Learn Here</TabsContent>
    </Tabs>
  );
}
