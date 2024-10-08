import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
export default function add() {
  const { reset } = useForm();
  const router = useRouter();

  const [dataArtist, setDataArtist] = useState([]);
  const [dataAlbum, setDataAlbum] = useState([]);
  const [dataGenre, setDataGenre] = useState([]);

  const [idArtist, setIdArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState('');
  const [lyric, setLyric] = useState('');
  const [credit, setCredit] = useState('');
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const [createObjectImageURL, setCreateObjectImageURL] = useState(null);
  const [createObjectAudioURL, setCreateObjectAudioURL] = useState(null);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchDataArtist = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/admin/choose/artist`,
        );
        setDataArtist(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataArtist();
  }, []);

    useEffect(() => {
        const fetchDataAlbum = async () => {
            try {
                const response = await axios.get(
                    `${baseURL}/admin/choose/album?id=${idArtist}`,
                );
                setDataAlbum(response.data);
            } catch (error) {
             console.error('Error fetching data:', error);
            }
        };
        fetchDataAlbum();
    }, [idArtist]);
    
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

  const uploadImageToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectImageURL(URL.createObjectURL(i));
    }
  };

  const uploadAudioToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const a = event.target.files[0];
      setAudio(a);
      setCreateObjectAudioURL(URL.createObjectURL(a));
    }
  };

  const handleUploadSong = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('audio', audio);
    formData.append('name', name);
    formData.append('genre', genre);
    formData.append('id_artist', idArtist);
    formData.append('release_date', date);
    formData.append('lyric', lyric);
    formData.append('credit', credit);
    
    if (album === "-") {
      formData.append('album', "-");
    } else {
      formData.append('album', album);
    }
    
    try {
      const response = await axios
        .post(`${baseURL}/admin/song/add`, formData)
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
        className="my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4"
      >
        <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div className="mr-auto shrink-0 sm:py-3">
           <p className="font-bold text-2xl text-black">Track Details</p>
            <p className="text-sm text-gray-600">Add your track details</p>
          </div>
          <button
            onClick={()=>handleUploadSong()}
            className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
          >
            Save
          </button>
        </div>
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="w-32 shrink-0 font-medium text-black">Artist</p>
          <div className="w-full rounded-lg ">
            <select
              onChange={(e) => setIdArtist(e.target.value)}
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            >
              <option value="#">Please select artist...</option>
              {dataArtist.map((item) => (
                <option value={item.id_artist} key={item.id_artist}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
  <p className="w-32 shrink-0 font-medium text-black">Album</p>
  <div className="w-full rounded-lg">
    <select
      onChange={(e) => setAlbum(e.target.value)}
      className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
    >
      <option value="">Please select album...</option>
      <option value="-">-</option>
       {dataAlbum.map((item) => (
      <option key={item.id_album} value={item.name}>{item.name}</option>
      ))}
    </select>
  </div>
    </div>

        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="w-32 shrink-0 font-medium text-black">Track Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Type track name"
           className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
         {errors.name && (
                <p className="mb-1 text-red-500">{errors.name}</p>
          )}
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="w-32 shrink-0 font-medium text-black">Genre</p>
          <div className="w-full rounded-lg ">
            <select
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            >
              <option value="#">Please select artist...</option>
              {dataGenre.map((item) => (
                <option value={item.name} key={item.id_genre}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
         {errors.genre && (
                <p className="mb-1 text-red-500">{errors.genre}</p>
          )}
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="w-32 shrink-0 font-medium text-black">Release Date</p>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
             className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
         {errors.release_date && (
                <p className="mb-1 text-red-500">{errors.release_date}</p>
          )}
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="w-32 shrink-0 font-medium text-black">Credit</p>
          <textarea
            onChange={(e) => setCredit(e.target.value)}
            placeholder="optional"
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
         {errors.credit && (
                <p className="mb-1 text-red-500">{errors.credit}</p>
          )}
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="w-32 shrink-0 font-medium text-black">Lyric</p>
          <textarea
            onChange={(e) => setLyric(e.target.value)}
            placeholder="(optional)"
             className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
         {errors.lyric && (
                <p className="mb-1 text-red-500">{errors.lyric}</p>
          )}
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="w-32 shrink-0 font-medium text-black">MP3/MP4 File</p>
          <input
            onChange={uploadAudioToClient}
            type="file"
            className="w-full rounded-md border bg-white px-2 py-2 text-blue-600 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
        <div className="flex flex-col gap-4 py-4  lg:flex-row">
          <div className="w-32 shrink-0  sm:py-4">
            <p className="mb-auto font-medium text-black">Image</p>
          </div>
          <input
            onChange={uploadImageToClient}
            type="file"
            className="w-full rounded-md border bg-white px-2 py-2 text-blue-600 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
      </div>
    </>
  )
}
