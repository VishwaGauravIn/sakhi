'use client';

import PostUI from '@/components/social/PostUI';
import React, { useState } from 'react';

export default function Social() {
  const [selectedType, setSelectedType] = useState('forYou');
  const tabs = [
    {
      name: 'For You',
      type: 'forYou',
    },
    {
      name: 'Learn',
      type: 'learn',
    },
  ];

  return (
    <div>
      <div className='grid grid-cols-2 gap-2 font-semibold'>
        {/* Tabs */}
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`outline-none p-2 cursor-pointer w-full text-center bg-transparent border-b-2 transition-all ${
              selectedType === tab.type
                ? 'border-b-pink-400 text-pink-600'
                : 'border-b-gray-100'
            }`}
            onClick={() => setSelectedType(tab.type)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* For You Tab Content */}

      {selectedType === 'forYou' && (
        <div>
          <PostUI />
          <PostUI />
          <PostUI />
          <PostUI />
          <PostUI />
          <PostUI />
        </div>
      )}

      {/* Learn Tab Content */}

      {selectedType === 'learn' && (
        <div>
          Learn Here
        </div>
      )}

    </div>
  );
}
