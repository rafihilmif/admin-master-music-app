import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { baseURLFile } from '@/baseURLFile';
import { getSession, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
export default function songById() {
  const { data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;
  const fileInputRef1 = useRef();
  const fileInputRef2 = useRef();

  const [dataAlbum, setDataAlbum] = useState([]);
  const [dataGenre, setDataGenre] = useState([]);

  const [oldArtist, setOldArtist] = useState('');
  const [oldAlbum, setOldAlbum] = useState('');
  const [oldTrackName, setOldTrackName] = useState('');
  const [oldReleased, setOldReleased] = useState('');
  const [oldGenre, setOldGenre] = useState('');
  const [oldImageSong, setOldImageSong] = useState('');
  const [oldAudioSong, setOldAudioSong] = useState('');

  const [newImageSong, setNewImageSong] = useState(null);
  const [newAudioSong, setNewAudioSong] = useState(null);

  const [idArtist, setIdArtist] = useState('');
  const [formData, setFormData] = useState({});

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
     const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/song?id=${id}`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            },
          });
        setOldArtist(response.data.Artist.name);
        setOldAlbum(response.data.album);
        setOldTrackName(response.data.name);
        setOldReleased(response.data.release_date);
        setOldGenre(response.data.genre);
        setOldImageSong(response.data.image);
        setOldAudioSong(response.data.audio);
        setIdArtist(response.data.id_artist);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (id) {
       fetchData();
    }
   
  }, [id, session]);

  useEffect(() => {
    const fetchDataAlbum = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/choose/album?id=${idArtist}`,{
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            },
          })
          setDataAlbum(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (idArtist) {
      fetchDataAlbum();
    }
  }, [idArtist, session]);
  
  
   useEffect(() => {
    const fetchDataGenre = async () => {
      try {
          const response = await axios.get(
            `${baseURL}/admin/choose/genre`,
            {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
          );
          setDataGenre(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    fetchDataGenre();
  }, [session]);

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleImageChange = (event) => {
    setNewImageSong(event.target.files[0]);
  };
  const handleAudioChange = (event) => {
    setNewAudioSong(event.target.files[0]);
  };


  const handleUpdate = async () => {
   const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (newImageSong) {
        data.append('image', newImageSong);
      }
      if (newAudioSong) {
        data.append('audio', newAudioSong);
      }
    
    try {
      const response = await axios
        .put(`${baseURL}/admin/song?id=${id}`, data, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'multipart/form-data',
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
      console.error('An unexpected error occurred:', error);
    }
  };
  return (
    <>
      <div class="my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4">
              <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
                <div class="mr-auto shrink-0 sm:py-3">
                  <p class="font-medium">Identity Details</p>
                  <p class="text-sm text-gray-600">Update existing data</p>
                </div>
                
                <button
                  onClick={handleUpdate}
                  class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
                >
                  Update
                </button>
              </div>
              <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="w-32 shrink-0 font-medium">Artist</p>
                <input
                  readOnly={true}
                  value={oldArtist}
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 font-medium">Album</p>
                <div className="relative w-full rounded-lg ">
                  <select
                    onChange={(e) => {
                      const selectedAlbum = dataAlbum.find(
                        (album) => album.name === e.target.value,
                      );
                      setFormData((prevData) => ({
                        ...prevData,
                        album: selectedAlbum.name,
                        id_album: selectedAlbum.id_album,
                      }));
                    }}
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  >
                    <option value="#">Please select album...</option>
                    {dataAlbum.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 font-medium">Track Name</p>
                <input
                  defaultValue={oldTrackName}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Type track name"
                  className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 font-medium">Genre</p>
                <div className="relative w-full rounded-lg ">
                  <select
                    onChange={(e) => updateField('genre', e.target.value)}
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  >
                    <option value="#">Please select genre...</option>
                    {dataGenre.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="w-32 shrink-0 font-medium">Release Date</p>
                <input
                  value={oldReleased}
                  onChange={(e) => updateField('release_date', e.target.value)}
                  type="date"
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>
              <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="w-32 shrink-0 font-medium">Audio</p>
                <input
                  type="file"
                  onChange={handleAudioChange}
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
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
                          src={`${baseURLFile}/assets/image/song/${oldImageSong}`}
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
                                    handleImageChange(event)
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