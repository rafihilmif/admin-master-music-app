import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { baseURLFile } from '@/baseURLFile';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
export default function updateArtistById() {
  const router = useRouter();
  const { id } = router.query;
  
  const [oldFirstName, setOldFirstName] = useState('');
  const [oldLastName, setOldLastName] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [oldUsername, setOldUsername] = useState('');
  const [oldBirthday, setOldBirthday] = useState('');
  const [oldGender, setOldGender] = useState('');
  const [oldAvatar, setOldAvatar] = useState('');

  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const [formData, setFormData] = useState({});
  const [newAvatar, setNewAvatar] = useState(null);

   useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseURL}/admin/fan?id=${id}`);
        setOldFirstName(response.data.first_name);
        setOldLastName(response.data.last_name);
        setOldEmail(response.data.email);
        setOldUsername(response.data.username);
        setOldBirthday(response.data.birth);
        setOldGender(response.data.gender);
        setOldAvatar(response.data.avatar);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [id]);

  const handleAvatarChange = (event) => {
    setNewAvatar(event.target.files[0]);
  };

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

   const handleUpdate = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (newAvatar) {
      data.append('image', newAvatar);
    }

      try {
        await axios.put(`${baseURL}/admin/fan?id=${id}`, data)
        .then(alert('Successfully updated profile fans', router.reload()));
    } catch (error) {
      console.error('Error updating profile fans:', error);
      alert('Error updating profile fans: ' + error.message);
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
            type="button"
            onClick={handleUpdate}
            class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
          >
            Update
          </button>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="w-32 shrink-0 font-medium">Name</p>
                <input
                  placeholder="First Name"
                  defaultValue={oldFirstName}
                  onChange={(e) => updateField('first_name', e.target.value)}
                  class="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 sm:mb-0 sm:mr-4"
                />
                <input
                  placeholder="Last Name"
                  defaultValue={oldLastName}
                  onChange={(e) => updateField('last_name', e.target.value)}
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Email</p>
          <input
             readOnly={true}
            value={oldEmail}
            placeholder="your.email@domain.com"
          class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Username</p>
          <input
            readOnly={true}
            value={oldUsername}
           class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Password</p>
          <input
            onChange={(e) => updateField('password', e.target.value)}
            placeholder="••••••••"
            type="password"
           class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="w-32 shrink-0 font-medium">Birthday</p>
                <input
                  defaultValue={oldBirthday}
                  onChange={(e) => updateField('birth', e.target.value)}
                  type="date"
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>
      <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="w-32 shrink-0 font-medium">Gender</p>
                <div class="relative w-full rounded-lg ">
                  <select
                    onChange={(e) => updateField('gender', e.target.value)}
                    class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  >
                    <option value="#">{oldGender} - Current</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
        <div class="flex flex-col gap-4 py-4">
          <div class="w-32 shrink-0 sm:py-4">
            <p class="mb-auto font-medium">Avatar</p>
                  <p class="text-sm text-gray-600">Change your avatar</p>
          </div>
          <div className="flex flex-col gap-4 py-4 ">
                <div class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black">
                  <div className="flex flex-wrap justify-center gap-4">
                    <label
                      onMouseEnter={() => setHoveredIndex(1)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative flex min-h-[200px] w-64 items-center justify-center rounded-md border border-solid border-gray-300 p-4 text-center shadow-lg"
                    >
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-white">
                        <img
                          height={100}
                          width={100}
                          className="block h-full w-auto rounded-xl"
                          alt=""
                          src={`${baseURLFile}/assets/image/avatar/${oldAvatar}`}
                        />
                        {hoveredIndex === 1 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                            
                              <label
                                className="text-md group relative h-10 w-36 cursor-pointer overflow-hidden rounded-md bg-blue-500 p-2 font-bold text-white"
                              >
                                Change Picture
                                <input
                                  type="file"
                                  name="image"
                                  className="hidden"
                                  onChange={(event) =>
                                    handleAvatarChange(event)
                                  }
                                />
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                </div>
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