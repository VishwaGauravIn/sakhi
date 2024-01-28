'use client';

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import PostUI from '@/components/social/PostUI';
import Learn from '@/components/social/Learn';

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
import { toast } from '@/components/ui/Toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { BiLoaderAlt } from 'react-icons/bi';

import { db } from '@/config/firebase';

import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore/lite';

export default function Social() {
  const { data } = useSession();

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const openNewPostDrawer = () => {
    document.getElementById('create-new-post').click();
  };

  const loadPosts = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'posts'), orderBy('createdAt', 'desc')),
        limit(10)
      );

      // Array to store the retrieved posts
      const _posts_temp_array = [];

      // Loop through the query snapshot and push each post to the array
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        _posts_temp_array.push(post);
      });

      setPosts(_posts_temp_array);
    } catch (err) {
      //
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const savePostToDB = await addDoc(collection(db, 'posts'), {
        post: newPost,
        owner: data?.user?.email,
        createdAt: Timestamp.now(),
      });

      if (savePostToDB) {
        toast.success('Posted');
        loadPosts();
      }
    } catch (err) {
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
      setNewPost('');
      document.getElementById('close-create-new-post').click();
      // loadNotes(data?.user?.email);
    }
  };

  return (
    <Tabs defaultValue='forYou' className='w-full'>
      <TabsList className='w-full bg-transparent'>
        <TabsTrigger
          value='forYou'
          className='w-full border-b-2 data-[state=active]:border-b-pink-400 data-[state=active]:text-pink-600 data-[state=active]:shadow-none font-semibold'
        >
          For You
        </TabsTrigger>
        <TabsTrigger
          value='learn'
          className='w-full border-b-2 data-[state=active]:border-b-pink-400 data-[state=active]:text-pink-600 data-[state=active]:shadow-none font-semibold'
        >
          Learn
        </TabsTrigger>
      </TabsList>

      <TabsContent value='forYou'>
        {/* Create Post Button */}
        <button
          variant='primary'
          className='fixed bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-1 justify-center items-center py-2 px-6 text-lg text-slate-700 border-2 bg-white rounded-full'
          onClick={() => {
            openNewPostDrawer();
          }}
        >
          <HiOutlinePlusCircle size={24} /> Post
        </button>

        {/* Create New Post */}

        <Drawer>
          <DrawerTrigger id='create-new-post' className='hidden'>
            Open
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Post what&apos; on your mind</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <form onSubmit={handleNewPostSubmit}>
                <textarea
                  rows={8}
                  disabled={loading}
                  placeholder={'Write Something...'}
                  value={newPost}
                  required={true}
                  onChange={(e) => setNewPost(e.target.value)}
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
                    'Post'
                  )}
                </button>
              </form>

              <DrawerClose className='hidden'>
                <button id='close-create-new-post'>Cancel</button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>


        {pageLoading && (
          <div className='flex flex-row justify-center items-center p-4'>
            <BiLoaderAlt className='text-4xl animate-spin' />
          </div>
        )}

        {/* Post UI compoentns mapping posts dynanmically */}
        {posts.map((post, index) => (
          <PostUI key={index} post={post} />
        ))}
      </TabsContent>

      <TabsContent value='learn'>
        {/* Differnet learning techniques links */}
        <Learn />
      </TabsContent>
    </Tabs>
  );
}
