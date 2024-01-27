'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { useSession } from 'next-auth/react';

import Greeting from '@/components/dashboard/Greeting';

var Sentiment = require('sentiment');

import {
  BiAngry,
  BiHappyHeartEyes,
  BiLoaderAlt,
  BiSad,
  BiSmile,
} from 'react-icons/bi';

import { HiOutlineMicrophone, HiPlus } from 'react-icons/hi2';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';

import { db } from '@/config/firebase';

import { toast } from '@/components/ui/Toast';

export default function Journal() {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(' ')[0] : '';

  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentViewNote, setCurrentViewNote] = useState('');

  const viewNote = (note) => {
    setCurrentViewNote(note);
    document.getElementById('view-note').click();
  };

  // Format of notes array of objects
  const [notes, setNotes] = useState([]);

  const openNewNoteDrawer = () => {
    document.getElementById('create-new-note').click();
  };

  const getTextSentiments = (text) => {
    const sentiment = new Sentiment();
    var result = sentiment.analyze(text);
    if (result.score > 0) {
      return 'happy';
    } else if (result.score < 0) {
      return 'sad';
    } else {
      return 'neutral';
    }
  };

  const loadNotes = async (email) => {
    try {
      if (email) {
        const q = await query(
          collection(db, 'journals'),
          where('owner', '==', email)
        );
        const querySnapshot = await getDocs(q);
        const _temporary_array_for_journals = [];
        querySnapshot.forEach((doc) => {
          _temporary_array_for_journals.push({ id: doc.id, ...doc.data() });
        });
        setNotes(_temporary_array_for_journals);
      }
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    loadNotes(data?.user?.email);
  }, [data]);

  const handleNewNoteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const saveNoteToDB = await addDoc(collection(db, 'journals'), {
        note: newNote,
        owner: data?.user?.email,
        mood: getTextSentiments(newNote),
        createdAt: new Date(),
      });

      if (saveNoteToDB) {
        toast.success('Note Saved');
      }
    } catch (err) {
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
      setNewNote('');
      document.getElementById('close-create-new-note').click();
      loadNotes(data?.user?.email);
    }
  };

  const getMoodBasedEmoji = (mood) => {
    switch (mood) {
      case 'happy':
        return BiHappyHeartEyes;
      case 'sad':
        return BiSad;
      case 'angry':
        return BiAngry;
      default:
        return BiSmile;
    }
  };

  const getMoodBasedColor = (mood) => {
    switch (mood) {
      case 'happy':
        return 'amber';
      case 'sad':
        return 'cyan';
      case 'angry':
        return 'rose';
      default:
        return 'green';
    }
  };

  const getDateAndMonthFromDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    return `${day} ${month}`;
  };

  const getLimitedCharacters = (string) => {
    if (string.length > 40) {
      return string.slice(0, 40) + '...';
    } else {
      return string;
    }
  };

  return (
    <div className='h-[calc(100vh-140px)]'>
      <Greeting userFirstName={userFirstName} />
      <div className='flex flex-row p-4'>
        <div className='w-2/3'>
          <div className='text-base font-semibold'>
            Write down what&apos;s on your mind today
          </div>
          <button
            className='bg-gradient-to-tr from-emerald-300 to-emerald-200 text-emerald-950 shadow-sm shadow-gray-200 py-2 px-4 mt-2 rounded-lg'
            onClick={() => {
              openNewNoteDrawer();
            }}
          >
            Daily Check in
          </button>
        </div>
        <Image
          src='/assets/journal/journal.jpg'
          width={500}
          height={500}
          className='self-center w-1/3'
        />
      </div>
      <div className='p-4'>
        <div className='text-base pb-4 font-semibold'>Recent Notes</div>

        {notes.map((note, index) => (
          <button
            className='w-full'
            onClick={() => viewNote(note.note)}
            key={index}
          >
            <div
              className={`w-full rounded-md flex flex-row mb-4 justify-between items-start p-2 shadow-md gap-1 bg-gradient-to-br from-${getMoodBasedColor(
                note.mood
              )}-100 to-${getMoodBasedColor(
                note.mood
              )}-200 text-${getMoodBasedColor(note.mood)}-950`}
            >
              <div className='max-w-[80%] flex flex-row justify-start items-center'>
                <div className='font-semibold text-center px-2'>
                  {getDateAndMonthFromDate(Number(note.createdAt))}
                </div>
                <div
                  className={`ml-2 mr-4 h-10 w-[2px] rounded-[1px] bg-${getMoodBasedColor(
                    note.mood
                  )}-900`}
                ></div>
                <p className='max-w-[70%] text-left'>
                  {getLimitedCharacters(note.note)}
                </p>
              </div>

              {React.createElement(getMoodBasedEmoji(note.mood), {
                size: 36,
                className: `fill-${getMoodBasedColor(note.mood)}-900 `,
              })}
            </div>
          </button>
        ))}
      </div>

      <Drawer>
        <DrawerTrigger id='create-new-note' className='hidden'>
          Open
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Write down what&apos; on your mind</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <form onSubmit={handleNewNoteSubmit}>
              <textarea
                rows={8}
                disabled={loading}
                placeholder={'Write Something...'}
                value={newNote}
                required={true}
                onChange={(e) => setNewNote(e.target.value)}
                className='block border-none w-full rounded-md p-1.5 px-3 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 focus:border-none focus:outline-none'
              ></textarea>
              <button
                type='submit'
                className='rounded-md w-full mt-4 bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 flex flex-row justify-center transition-all items-center gap-2'
                disabled={loading}
              >
                {loading ? (
                  <BiLoaderAlt className='text-xl animate-spin' />
                ) : (
                  'Save'
                )}
              </button>
            </form>

            <DrawerClose className='hidden'>
              <button id='close-create-new-note'>Cancel</button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* view any notes */}
      <Drawer className='max-h-[80vh]'>
        <DrawerTrigger id='view-note' className='hidden'>
          Open
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{getLimitedCharacters(currentViewNote)}</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <p className='whitespace-pre-wrap'>{currentViewNote}</p>

            <DrawerClose className='hidden'>
              <button id='close-view-note'>Cancel</button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <div className='h-36'>
        {/* This div is only for page to get a full scroll */}
      </div>

      <div className='fixed bottom-20 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full flex flex-row justify-center items-center gap-2 bg-white ring-1 ring-gray-200'>
        <button
          className='h-12 aspect-square flex justify-center items-center rounded-full bg-black text-pink-50'
          onClick={() => {
            openNewNoteDrawer();
          }}
        >
          <HiPlus size={24} />
        </button>
        <button className='h-12 aspect-square flex justify-center items-center rounded-full bg-black/5 text-pink-950'>
          <HiOutlineMicrophone size={24} />
        </button>
      </div>
    </div>
  );
}
