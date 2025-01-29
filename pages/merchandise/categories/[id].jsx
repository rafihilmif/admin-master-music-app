import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { getSession, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

export default function categoriesById() {
  const { data: session } = useSession();
  const router = useRouter();
  const [newName, setNewName] = useState('');
  const [name, setName] = useState('');
  const { id } = router.query;


  useEffect(() => {
    const fetchDataCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/category?id=${id}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (id) {
      fetchDataCategories();
    }
  }, [id, session]);
    
  const onUpdate = async () => {
    try {
      const response = await axios.put(`${baseURL}/admin/category?id=${id}`, {
        name: newName,
      },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
        });
         if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            window.location.reload();
          });
        }
    } catch (error) {
       await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while update the fans account',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
      window.location.reload();
    }
    
      
  };
  return (
      <>
          <div class="relative my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4">
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="mr-auto shrink-0 sm:py-3">
            <p class="font-medium">Categories Details</p>
            <p class="text-sm text-gray-600">Update existing data</p>
          </div>
          <button
            onClick={onUpdate}
            class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
          >
            Update
          </button>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium">ID</p>
          <input
            readOnly={true}
            value={id}
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium">Genre Name</p>
          <input
            required
            defaultValue={name}
            onChange={(e) => setNewName(e.target.value)}
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
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