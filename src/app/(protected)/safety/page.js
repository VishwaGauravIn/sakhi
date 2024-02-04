'use client';
import React, { useEffect, useState } from 'react';

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

  return (
    <div>
      {!isLocationPermissionGranted &&
        'Please allow location permission to use this feature.'}
    </div>
  );
};

export default Safety;
