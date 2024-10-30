import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { getSession } from 'next-auth/react';

export default function reportedById() {
  const router = useRouter();
  const { id } = router.query;
  
  const [idUser, setIdUser] = useState();
  const [idArtist, setIdArtist] = useState();
  const [category, setCategory] = useState();
  const [comment, setComment] = useState();


    useEffect(() => {
    const fetchDataReported = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/report?id=${id}`);
        setIdUser(response.data.id_user);
        setIdArtist(response.data.id_artist);
        setCategory(response.data.category);
        setComment(response.data.comment);
        console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    fetchDataReported();
    }, [id]);
  
  return (
      <>
          <>
          <div class="relative my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4">
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="mr-auto shrink-0 sm:py-3">
            <p class="font-medium">Report Details</p>
            <p class="text-sm text-gray-600">See comment below</p>
          </div>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium">ID Sender</p>
          <input
            readOnly
            defaultValue={idUser}
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
         </div>
          <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium">ID Suspect</p>
          <input
            readOnly
            defaultValue={idArtist}
             class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
          </div>
          <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium">Category</p>
          <input
            readOnly
            defaultValue={category}
           
           class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
          </div>
          <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium">Comment</p>
            <textarea
              readOnly
              defaultValue={comment}
              rows={10}
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
          </div>
      </div>
      </>
      </>
  )
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...session,
    },
  };
}