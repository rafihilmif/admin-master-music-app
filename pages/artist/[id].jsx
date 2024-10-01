import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { baseURLFile } from '@/baseURLFile';
import { useRouter } from 'next/router';
export default function updateArtistById() {
  const router = useRouter();
  const { id } = router.query;
  
  const [oldName, setOldName] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [oldUsername, setOldUsername] = useState('');
  const [oldFormed, setOldFormed] = useState('');
  const [oldGenre, setOldGenre] = useState('');
  const [oldAvatar, setOldAvatar] = useState('');

  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const [formData, setFormData] = useState({});
  const [newAvatar, setNewAvatar] = useState(null);
  const [dataGenre, setDataGenre] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseURL}/admin/artist?id=${id}`);
        setOldName(response.data.name);
        setOldEmail(response.data.email);
        setOldUsername(response.data.username);
        setOldFormed(response.data.formed);
        setOldGenre(response.data.genre);
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
      await axios.put(`${baseURL}/admin/artist?id=${id}`, data).
        then(alert('Successfully updated profile artist', router.reload()));
    } catch (error) {
      console.error('Error updating profile artist:', error);
      alert('Error updating profile artist: ' + error.message);
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
          <p class="w-32 shrink-0 font-medium text-black">Name</p>
          <input
             defaultValue={oldName}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Name as artist"
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
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
          <p class="w-32 shrink-0 font-medium text-black">Genre</p>
          <div class="relative w-full rounded-lg ">
            <select
              onChange={(e) => updateField('genre', e.target.value)}
              autocomplete="album-name"
              class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            >
              <option value={oldGenre}>{oldGenre} - Current</option>
              {dataGenre.map((data) => (
                <option value={data.name}>{data.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Formed</p>
          <input
            defaultValue={oldFormed}
            onChange={(e) => updateField('formed', e.target.value)}
            type="date"
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
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
