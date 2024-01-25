import React from 'react';

import { MdSportsMartialArts } from 'react-icons/md';
import { LiaPepperHotSolid } from 'react-icons/lia';
import { FaSwatchbook } from 'react-icons/fa6';

import Link from 'next/link';

const Learn = () => {
  const menuItems = [
    {
      color: 'amber',
      label: 'Martial Arts',
      href: '/martial-art-for-safety',
      icon: MdSportsMartialArts,
    },
    {
      color: 'rose',
      label: 'Pepper Spray',
      href: 'https://www.flipkart.com/search?q=pepper%20spary',
      icon: LiaPepperHotSolid,
    },
    { color: 'green', label: 'Resources', href: 'https://www.instructables.com/Basic-Street-Safety-for-Women/', icon: FaSwatchbook },
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
    <div className='grid grid-cols-3 gap-4'>
      {menuItems.map((item) => (
        <GridElement key={item.label} data={item} />
      ))}
    </div>
  );
};

export default Learn;
