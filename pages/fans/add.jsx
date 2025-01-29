import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';
export default function add() {
  const { data: session } = useSession();

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setAvatar(i);
    }
  };

  const handleRegisterFans = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('password', password);
    formData.append('gender', gender);
    formData.append('birth', birth);
    formData.append('image', avatar);
    
    console.log(formData);
    try {
      const response = await axios.post(`${baseURL}/admin/fans/add`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
         'Content-Type': 'multipart/form-data',
        }
      });
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
       
        className="relative my-4 w-full  border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4"
      >
        <div>
          <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
            <div className="mr-auto shrink-0 sm:py-3">
              <p className="font-bold text-2xl text-black">Account Details</p>
            <p className="text-sm text-gray-600">Add your account details</p>
            </div>
            <button
              onClick={()=> handleRegisterFans()}
              className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
            >
              Save
            </button>
          </div>
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="w-32 shrink-0 font-medium text-black">Name</p>
            <input
                onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
             className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            />
            <input
               onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
             className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            />
          </div>
          {errors.first_name && (
                <p className="mb-1 text-red-500">{errors.first_name}</p>
          )}
          {errors.last_name && (
                <p className="mb-1 text-red-500">{errors.last_name}</p>
          )}
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="w-32 shrink-0 font-medium text-black">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@domain.com"
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            />
          </div>
           {errors.email && (
                <p className="mb-1 text-red-500">{errors.email}</p>
              )}
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="w-32 shrink-0 font-medium text-black">Username</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            />
          </div>
           {errors.username && (
                <p className="mb-1 text-red-500">{errors.username}</p>
              )}
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="w-32 shrink-0 font-medium text-black">Password</p>
            <input
               onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
             className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            />
          </div>
           {errors.password && (
                <p className="mb-1 text-red-500">{errors.password}</p>
              )}
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="w-32 shrink-0 font-medium text-black">Birthday</p>
            <input
               onChange={(e) => setBirth(e.target.value)}
              type="date"
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            />
          </div>
           {errors.birth && (
                <p className="mb-1 text-red-500">{errors.birth}</p>
              )}
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="w-32 shrink-0 font-medium text-black">Gender</p>
            <div className="relative w-full rounded-lg ">
              <select
                 onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
              >
                <option value="#">Please select gender...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
           {errors.gender && (
                <p className="mb-1 text-red-500">{errors.name}</p>
              )}
          <div className="flex flex-col gap-4 py-4  lg:flex-row">
            <div className="w-32 shrink-0  sm:py-4">
              <p className="mb-auto font-medium">Avatar</p>
              <p className="text-sm text-gray-600">Change your avatar</p>
            </div>
            <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
             <img src='/image/thumbnail1.png' className="h-16 w-16 rounded-full" />
              <p className="text-sm text-gray-600">
                Drop your desired image file here to start the upload
              </p>
              <input
                onChange={uploadToClient}
                type="file"
                accept="image/*"
                className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
              />
            </div>
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