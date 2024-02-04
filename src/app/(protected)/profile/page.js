'use client';

import { getUser } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Profile() {
  const { data } = useSession();

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

  return (
    <div className='p-4'>
      <div className='flex flex-row items-center gap-4 mb-4'>
        <img
          src={data?.user?.image}
          rel='noreferrer'
          alt=''
          className='h-14 w-14 rounded-full ring-2 ring-pink-400'
        />
        <div>
          <h1 className='text-2xl font-semibold'>{data?.user?.name}</h1>
          <p className='text-sm text-gray-500'>{data?.user?.email}</p>
        </div>
      </div>
      <Link
        href={'/onboarding'}
        className='bg-gradient-to-tr from-pink-400 to-pink-300 text-white font-semibold block p-2 text-center w-full rounded-md'
      >
        Edit Profile
      </Link>
      <>
        <p className='text-lg mt-4 opacity-90'>Your Menstrual Data:</p>

        <label htmlFor='name' className='text-sm'>
          Last period start date*
        </label>
        <input
          type='date'
          id='name'
          required
          value={userFireData?.menstrualData?.last_period_start_date}
          onChange={(e) => {}}
          disabled={true}
          className='w-full p-2 border-2 border-gray-200 rounded-md'
        />
        <label htmlFor='name' className='text-sm'>
          Average cycle length* [21-35 days normally]
        </label>
        <div className='flex'>
          <input
            type='range'
            name=''
            id=''
            min={14}
            max={40}
            disabled={true}
            required
            defaultValue={22}
            className='w-11/12'
            value={userFireData?.menstrualData?.average_cycle_length}
            onChange={(e) => {}}
          />
          <span className='mx-auto'>
            {userFireData?.menstrualData?.average_cycle_length}
          </span>
        </div>
        <label htmlFor='name' className='text-sm'>
          Variations in cycle length* [+/- 7 days normally]
        </label>
        <div className='flex'>
          <input
            type='range'
            name=''
            id=''
            min={0}
            max={7}
            required
            disabled={true}
            defaultValue={0}
            className='w-11/12'
            value={userFireData?.menstrualData?.variations_in_cycle_length}
            onChange={(e) => {}}
          />
          <span className='mx-auto'>
            {userFireData?.menstrualData?.variations_in_cycle_length}
          </span>
        </div>
        <label htmlFor='name' className='text-sm'>
          Period duration* [3-7 days normally]
        </label>
        <div className='flex'>
          <input
            type='range'
            name=''
            id=''
            required
            min={0}
            max={7}
            disabled={true}
            defaultValue={3}
            className='w-11/12'
            value={userFireData?.menstrualData?.period_duration}
            onChange={(e) => {}}
          />
          <span className='mx-auto'>
            {userFireData?.menstrualData?.period_duration}
          </span>
        </div>
        <label htmlFor='name' className='text-sm'>
          Recent Changes In Your Cycle
        </label>
        <input
          type='text'
          placeholder='No recent changes'
          value={userFireData?.menstrualData?.recent_changes_in_your_cycle}
          disabled={true}
          onChange={(e) => {}}
          className='w-full p-2 border-2 border-gray-200 rounded-md'
        />
        <label htmlFor='name' className='text-sm'>
          Underlying Health Conditions
        </label>
        <input
          type='text'
          placeholder='eg. PCOS, Endometriosis, Thyroid, etc.'
          disabled={true}
          value={userFireData?.menstrualData?.underlying_health_conditions}
          onChange={(e) => {}}
          className='w-full p-2 border-2 border-gray-200 rounded-md'
        />
        <label htmlFor='name' className='text-sm'>
          Medications
        </label>
        <input
          type='text'
          placeholder='Birth control pills'
          disabled={true}
          value={userFireData?.menstrualData?.medications}
          onChange={(e) => {}}
          className='w-full p-2 border-2 border-gray-200 rounded-md'
        />
        <label htmlFor='name' className='text-sm'>
          Stress
        </label>
        <input
          type='text'
          placeholder='Low, Medium, High'
          disabled={true}
          value={userFireData?.menstrualData?.stress}
          onChange={(e) => {}}
          className='w-full p-2 border-2 border-gray-200 rounded-md'
        />
      </>
    </div>
  );
}
