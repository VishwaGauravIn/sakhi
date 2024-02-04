'use client';

import { toast } from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { db } from '@/config/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { useSession } from 'next-auth/react';

import React, { useEffect, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const EmergencyData = () => {
  const { data } = useSession();

  const [loading, setLoading] = useState(false);

  const [emergencyData, setEmergencyData] = useState({
    name: '',
    contact: '',
    address: '',
    sex: 'not-set',
    organDonor: 'not-set',
    medicalConditions: '',
    medications: '',
    allergiesAndReactions: '',
    remarks: '',
  });

  const loadEmergencyData = async (data) => {
    setLoading(true);
    if(data?.user?.email){
        const docRef = doc(db, 'emergencyData', data?.user?.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEmergencyData(docSnap.data());
          setLoading(false);
        }else{
          setLoading(false);
        }
    }
  };
  useEffect(() => { 
    loadEmergencyData(data);
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    const docRef = collection(db, 'emergencyData');
    setLoading(true);
    setDoc(doc(docRef, data?.user?.email), { ...emergencyData })
      .then(() => {
        window.location.href = '/dashboard';
      })
      .catch((e) => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div>
      <h1 className='mb-2'>Your Emergency Data</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 accent-pink-400'
      >
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            disabled={loading}
            value={emergencyData.name}
            onChange={(e) =>
              setEmergencyData({ ...emergencyData, name: e.target.value })
            }
            className='focus:outline-none focus:ring-offset-0 focus-visible:ring-offset-0'
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='contact'>Contact</Label>
          <Input
            type='tel'
            id='contact'
            disabled={loading}
            value={emergencyData?.contact}
            onChange={(e) =>
              setEmergencyData({ ...emergencyData, contact: e.target.value })
            }
            className='focus:outline-none focus:ring-offset-0 focus-visible:ring-offset-0'
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='address'>Address</Label>
          <Input
            type='text'
            id='address'
            disabled={loading}
            value={emergencyData.address}
            onChange={(e) =>
              setEmergencyData({ ...emergencyData, address: e.target.value })
            }
            className='focus:outline-none focus:ring-offset-0 focus-visible:ring-offset-0'
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='sex'>Sex</Label>
          <Select
            value={emergencyData.sex}
            disabled={loading}
            onValueChange={(value) => {
              setEmergencyData({ ...emergencyData, sex: value });
            }}
            id='sex'
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='male'>Male</SelectItem>
                <SelectItem value='female'>Female</SelectItem>
                <SelectItem value='not-set'>Not Set</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='organ-donor'>Organ Donor</Label>
          <Select
            value={emergencyData.organDonor}
            onValueChange={(value) => {
              setEmergencyData({ ...emergencyData, organDonor: value });
            }}
            disabled={loading}
            id='organ-donar'
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='yes'>Yes</SelectItem>
                <SelectItem value='no'>No</SelectItem>
                <SelectItem value='not-set'>Not Set</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='medical-coditions'>Medical Conditions</Label>
          <Input
            type='text'
            disabled={loading}
            value={emergencyData.medicalConditions}
            onChange={(e) =>
              setEmergencyData({
                ...emergencyData,
                medicalConditions: e.target.value,
              })
            }
            id='medical-coditions'
            className='focus:outline-none focus:ring-offset-0 focus-visible:ring-offset-0'
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='medications'>Medications</Label>
          <Input
            type='text'
            disabled={loading}
            value={emergencyData.medications}
            onChange={(e) =>
              setEmergencyData({
                ...emergencyData,
                medications: e.target.value,
              })
            }
            id='medications'
            className='focus:outline-none focus:ring-offset-0 focus-visible:ring-offset-0'
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='algAndRxn'>Allergies and Reactions</Label>
          <Input
            type='text'
            disabled={loading}
            value={emergencyData.allergiesAndReactions}
            onChange={(e) =>
              setEmergencyData({
                ...emergencyData,
                allergiesAndReactions: e.target.value,
              })
            }
            id='algAndRxn'
            className='focus:outline-none focus:ring-offset-0 focus-visible:ring-offset-0'
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='remarks'>Remarks</Label>
          <Input
            type='text'
            disabled={loading}
            value={emergencyData.remarks}
            onChange={(e) =>
              setEmergencyData({ ...emergencyData, remarks: e.target.value })
            }
            id='remarks'
            className='focus:outline-none focus:ring-offset-0 focus-visible:ring-offset-0'
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='bg-gradient-to-tr cursor-pointer from-pink-400 to-pink-300 text-white font-semibold p-2 text-center w-full flex flex-row justify-center items-center gap-2 rounded-md'
        >
          {loading && <BiLoaderAlt className='text-xl animate-spin' />} Save
        </button>
      </form>
    </div>
  );
};

export default EmergencyData;
