'use client';
import Greeting from '@/components/dashboard/Greeting';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsHospital } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa';
import { GrUserPolice } from 'react-icons/gr';
import { IoIosArrowForward } from 'react-icons/io';
import { MdEmergency, MdSportsMartialArts } from 'react-icons/md';
import { TbAlertHexagon } from 'react-icons/tb';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Safety = () => {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(' ')[0] : '';

  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);

  const getCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setIsLocationPermissionGranted(true);
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      localStorage.setItem('sakhi_lat', lat);
      localStorage.setItem('sakhi_long', long);
      localStorage.setItem('sakhiLocationPermission', true);
    });
  };

  const checkLocationPermission = () => {
    if (localStorage.getItem('sakhiLocationPermission') === 'true') {
      setIsLocationPermissionGranted(true);
    } else {
      alert('We need Location Permission to work, Please allow us');
      getCurrentUserLocation();
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      getCurrentUserLocation();
    } else {
      checkLocationPermission();
    }
  }, []);

  const openNearby = (x) => {
    window.open(
      `https://www.google.com/maps/search/${x}/@${localStorage.getItem(
        'sakhi_lat'
      )},${localStorage.getItem('sakhi_long')}`,
      '_blank'
    );
  };

  return (
    <div>
      {!isLocationPermissionGranted && (
        <Alert>
          <TbAlertHexagon className='h-4 w-4' />
          <AlertTitle>
            Please allow location permission to use these features.
          </AlertTitle>
        </Alert>
      )}
      <Greeting userFirstName={userFirstName} />
      <p className='my-2'>Here are some nearby resources to help you out</p>
      <div className='border shadow-sm border-gray-200 rounded-xl'>
        <button
          onClick={() => openNearby('hospitals')}
          className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'
        >
          <div className='flex flex-row justify-start items-center gap-2 '>
            <BsHospital className='text-lg text-rose-600' />
            Hospitals
          </div>
          <FaLocationArrow className='text-lg' />
        </button>
        <hr />
        <button
          onClick={() => openNearby('police station')}
          className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'
        >
          <div className='flex flex-row justify-start items-center gap-2 '>
            <GrUserPolice className='text-lg text-emerald-600' />
            Police Stations
          </div>
          <FaLocationArrow className='text-lg' />
        </button>

        <hr />
        <Link
          href={'/emergency'}
          className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'
        >
          <div className='flex flex-row justify-start items-center gap-2 '>
            <MdEmergency className='text-lg text-pink-600' />
            Emergency Page
          </div>
          <IoIosArrowForward className='text-lg' />
        </Link>
        <hr />
        <Link
          href={'/martial-art-for-safety'}
          className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'
        >
          <div className='flex flex-row justify-start items-center gap-2 '>
            <MdSportsMartialArts className='text-lg text-yellow-600' />
            Self Defence Tips
          </div>
          <IoIosArrowForward className='text-lg' />
        </Link>
      </div>
    </div>
  );
};

export default Safety;
