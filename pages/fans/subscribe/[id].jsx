import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { getSession, useSession } from 'next-auth/react';
export default function subscribeById() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  
  const [idPlan, setIdPlan] = useState();
  const [OldType, setOldType] = useState();
  const [newType, setNewType] = useState();


    useEffect(() => {
    const fetchDataReported = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/plan/detail?id=${id}`,
           {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setIdPlan(response.data.id_plan);
        setOldType(response.data.type);
        
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      if (id) {
        fetchDataReported();
      }
    
    }, [id, session]);
  
  return (
      <>
          <div class="relative my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4">
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="mr-auto shrink-0 sm:py-3">
            <p class="font-bold text-2xl text-black">Subscribe Details</p>
            <p class="text-sm text-gray-600">Change subscribe account</p>
          </div>
         <button
            type="button"
            
            class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
          >
            Update
          </button>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium">ID Plan</p>
          <input
            readOnly
            defaultValue={idPlan}
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
         </div>
          <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Type</p>
          <div class="relative w-full rounded-lg ">
            <select
              onChange={(e) => setNewType(e.target.value)}
              defaultValue={OldType}
              autocomplete="album-name"
              class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            >
              <option value="#">Please select type...</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
              <option value="Deluxe">Deluxe</option>
            </select>
          </div>
        </div>
          
      </div>
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