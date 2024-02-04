'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { FaHospital } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { MdEmergency } from 'react-icons/md';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/Toast';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import Greeting from '@/components/dashboard/Greeting';

const Emergency = () => {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";

  const [loading, setLoading] = useState(false);

  const [emergencyData, setEmergencyData] = useState({
    name: '',
    contect: '',
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
    if (data?.user?.email) {
      const docRef = doc(db, 'emergencyData', data?.user?.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEmergencyData(docSnap.data());
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    loadEmergencyData(data);
  }, [data]);
  const menuItems = [
    {
      color: 'amber',
      label: 'Family',
      href: `tel:${emergencyData?.contect}`,
      icon: FaPerson,
    },
    {
      color: 'rose',
      label: 'Emergency',
      href: 'tel:7827170170',
      icon: MdEmergency,
    },
    { color: 'green', label: 'Hospital', href: 'tel:108', icon: FaHospital },
  ];

  const tableData = [
    ['National Commission for Women Helpline', '7827170170'],
    [
      'Central Social Welfare Board -Police Helpline',
      '1091/ 1291, (011) 23317004',
    ],
    ['Shakti Shalini', '10920'],
    ["Shakti Shalini - women's shelter", '(011) 24373736/ 24373737'],
    ['SAARTHAK', '(011) 26853846/ 26524061'],
    ["All India Women's Conference", '10921/ (011) 23389680'],
    ['JAGORI', '(011) 26692700 +918800996640'],
    [
      "Joint Women's Programme (also has branches in Bangalore, Kolkata, Chennai)",
      '(011) 24619821',
    ],
    ['Sakshi - violence intervention center', '(0124) 2562336/ 5018873'],
    ['Saheli - a womens organization', '(011) 24616485 (Saturdays)'],
    ['Nirmal Niketan', '(011) 27859158'],
    ['Nari Raksha Samiti', '(011) 23973949'],
    [
      'RAHI Recovering and Healing from Incest. A support centre for women survivors of child sexual abuse',
      '(011) 26238466/ 26224042, 26227647',
    ],
  ];

  function GridElement({ key, data }) {
    return (
      <Link href={data.href}>
        <div
          key={key}
          className={`w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-md gap-1 bg-gradient-to-br from-${data.color}-100 to-${data.color}-200 text-${data.color}-950`}
        >
          {React.createElement(data.icon, {
            className: `w-1/2 h-1/3 fill-${data.color}-900`,
          })}
          <span className='font-semibold'>{data.label}</span>
        </div>
      </Link>
    );
  }
  return (
    <div>
    <Greeting userFirstName={userFirstName} />
      <h3 className='text-lg mb-2'>Emergency Contacts</h3>
      <div className='grid grid-cols-3 gap-4'>
        {menuItems.map((item) => (
          <GridElement key={item.label} data={item} />
        ))}
      </div>

      <Accordion className='my-4' type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='bg-gray-50 text-black px-2 py-3 text-lg font-semibold'>
            Additional Contact Options
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Help Available on</TableHead>
                  <TableHead className='text-right'>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {tableData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell
                      className='text-right'
                      onClick={() => {
                        navigator.clipboard.writeText(item[1]);
                        toast.success('Copied to clipboard');
                      }}
                    >
                      {item[1]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Link href='/emergency-data' className='cursor-pointer bg-gray-50 text-black font-semibold px-2 py-3 text-center w-full flex flex-row justify-start items-center gap-2 rounded-md'>
          View/Update Emergency Data
     
      </Link>
    </div>
  );
};

export default Emergency;
