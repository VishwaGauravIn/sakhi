import React from 'react';

import { MdSportsMartialArts } from 'react-icons/md';
import { LiaPepperHotSolid } from 'react-icons/lia';
import { FaSwatchbook } from 'react-icons/fa6';
import { Button } from '../ui/button';

const Learn = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>

    {/* Note: this button can be furthur changed into next Link by importing buaatonVariabts from ui/button while uisng same classes REF: shadcn docs */}

      <Button className='flex flex-col flex-wrap rounded-md gap-2 h-full justify-center items-center px-4 py-8 text-xl text-blue-950 ring-2 ring-blue-100 bg-blue-200 hover:bg-blue-200'>
        <MdSportsMartialArts size={48} /> Martial Arts
      </Button>

      <Button className='flex flex-col flex-wrap rounded-md gap-2 h-full justify-center items-center px-4 py-8 text-xl text-red-950 ring-2 ring-red-100 bg-red-200 hover:bg-red-200'>
        <LiaPepperHotSolid size={48} /> Pepper Spray
      </Button>

      <Button className='flex flex-col flex-wrap rounded-md gap-2 h-full justify-center items-center px-4 py-8 text-xl text-amber-950 ring-2 ring-amber-100 bg-amber-200 hover:bg-amber-200'>
        <FaSwatchbook size={48} /> Resources
      </Button>

    </div>
  );
};

export default Learn;
