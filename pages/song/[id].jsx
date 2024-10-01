import React from 'react'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL } from '@/baseURL';
export default function songById() {
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

  const { id } = router.query;
  const [idArtist, setIdArtist] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseURL}/admin/song?id=${id}`);
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
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchDataGenre();
  }, []);

  useEffect(() => {
    fetchDataAlbum();
  }, [idArtist]);

  const fetchDataAlbum = async () => {
    await axios
      .get(`${baseURL}/admin/album?id_artist=${idArtist}`)
      .then((res) => {
        setDataAlbum(res.data.data);
      })
      .catch((err) => console.error('error' + err));
  };
  const fetchDataGenre = async () => {
    await axios
      .get(`${baseURL}/genre`)
      .then((res) => {
        setDataGenre(res.data.data);
      })
      .catch((err) => console.error('error' + err));
  };

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
    await axios
      .put(`${baseURL}/admin/song?id=${id}`, data)
      .then(alert('Data berhasil diubah'), router.push('/admin/song/data'))
      .catch((err) => console.error('error' + err));
  };

  const removeImageSong = async () => {
    await axios
      .put(`${baseURL}/admin/song/remove/avatar?id=${id}`)
      .then(router.reload())
      .catch((err) => console.error('error' + err));
  };
  const removeAudioSong = async () => {
    await axios
      .put(`${baseURL}/admin/song/remove/audio?id=${id}`)
      .then(router.reload())
      .catch((err) => console.error('error' + err));
  };
  return (
      <>
      </>
  )
}
