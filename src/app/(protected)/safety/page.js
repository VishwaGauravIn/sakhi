'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsHospital } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa';
import { GrUserPolice } from 'react-icons/gr';
import { IoIosArrowForward } from 'react-icons/io';
import { MdEmergency } from 'react-icons/md';
import { GoAlertFill } from 'react-icons/go';

const Safety = () => {
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
        "sakhi_lat"
      )},${localStorage.getItem("sakhi_long")}`,
      "_blank"
    );
  }

  return (
    <div>
      {!isLocationPermissionGranted &&
        'Please allow location permission to use this feature.'}

        <p className='my-2'>Here are some nearby resources to help you out</p>
        <div className='border shadow-sm border-gray-200 rounded-xl'>
        <button
          onClick={() => openNearby("hospitals")}
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
          onClick={() => openNearby("police station")}
          className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'
        >
          <div className='flex flex-row justify-start items-center gap-2 '>
            <GrUserPolice className='text-lg text-emerald-600' />
            Police Station
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
       </div>
    </div>
  );
};

export default Safety;
