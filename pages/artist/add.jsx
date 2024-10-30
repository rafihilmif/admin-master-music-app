import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { getSession } from 'next-auth/react';
export default function add() {

  const router = useRouter();
  const [dataGenre, setDataGenre] = useState([]);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [genre, setGenre] = useState('');
  const [formed, setFormed] = useState('');

  const [errors, setErrors] = useState({});
  
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setAvatar(i);
    }
  };

  useEffect(() => {
    const fetchDataGenre = async () => {
      try {
          const response = await axios.get(
            `${baseURL}/admin/choose/genre`,
          );
          setDataGenre(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    fetchDataGenre();
  }, []);

  const handleRegisterArtist = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('genre', genre);
    formData.append('formed', formed);
    formData.append('image', avatar);
    
    console.log(formData.get('avatar'));
    try {
      const response = await axios.post(`${baseURL}/admin/artist/add`, formData);
        if (response.status === 201) {
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
      if (error.response && error.response.status === 400) {
        const { path, message } = error.response.data;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [path]: message,
        }));
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
      <>
          <div
        class="my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4"
      >
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="mr-auto shrink-0 sm:py-3">
            <p class="font-bold text-2xl text-black">Account Details</p>
            <p class="text-sm text-gray-600">Add your account details</p>
          </div>
          <button
            onClick={()=> handleRegisterArtist()}
            class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
          >
            Save
          </button>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Name</p>
          <input
           onChange={(e)=> setName(e.target.value)}
            placeholder="Name as artist"
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
         {errors.name && (
                <p className="mb-1 text-red-500">{errors.name}</p>
          )}
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Email</p>
          <input
           onChange={(e)=> setEmail(e.target.value)}
            placeholder="your.email@domain.com"
          class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
         {errors.email && (
                <p className="mb-1 text-red-500">{errors.email}</p>
          )}
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Username</p>
          <input
           onChange={(e)=> setUsername(e.target.value)}
            placeholder="Username"
           class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
         {errors.username && (
                <p className="mb-1 text-red-500">{errors.username}</p>
          )}
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Password</p>
          <input
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
           class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
         {errors.password && (
                <p className="mb-1 text-red-500">{errors.password}</p>
          )}
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Genre</p>
          <div class="relative w-full rounded-lg ">
            <select
              onChange={(e)=> setGenre(e.target.value)}
              autocomplete="album-name"
              class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            >
              <option value="#">Please select genre...</option>
              {dataGenre.map((data) => (
                <option value={data.name}>{data.name}</option>
              ))}
            </select>
          </div>
        </div>
         {errors.genre && (
                <p className="mb-1 text-red-500">{errors.genre}</p>
          )}
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Formed</p>
          <input
           onChange={(e)=> setFormed(e.target.value)}
            type="date"
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
         {errors.formed && (
                <p className="mb-1 text-red-500">{errors.formed}</p>
          )}
        <div class="flex flex-col gap-4 py-4  lg:flex-row">
          <div class="w-32 shrink-0  sm:py-4">
            <p class="mb-auto font-medium">Avatar</p>
            <p class="text-sm text-gray-600">Change your avatar</p>
          </div>
          <div class="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
            <img src='/image/thumbnail1.png' className="h-16 w-16 rounded-full" />
            <p class="text-sm text-gray-600">
              Drop your desired image file here to start the upload
            </p>
             <input
                onChange={uploadToClient}
                type="file"
                className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
              />
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