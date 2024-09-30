import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';

export default function add() {
  const [dataCategories, setDataCategories] = useState([]);
  const [dataArtist, setDataArtist] = useState([]);

  const [idArtist, setIdArtist] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState('');
  const [sizeS, setSizeS] = useState(0);
  const [sizeM, setSizeM] = useState(0);
  const [sizeL, setSizeL] = useState(0);
  const [sizeXL, setSizeXL] = useState(0);
  const [sizeStock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
    
  const [uploadProgress, setUploadProgress] = useState({});
    
   useEffect(() => {
    const fetchDataCategories = async () => {
      try {
          const response = await axios.get(
            `${baseURL}/admin/choose/categories`,
          );
          setDataCategories(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    fetchDataCategories();
   }, []);
    
      useEffect(() => {
    const fetchDataCategories = async () => {
      try {
          const response = await axios.get(
            `${baseURL}/admin/choose/artist`,
          );
          setDataArtist(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    fetchDataCategories();
   }, []);

    const uploadImageToClient = (event) => {
    const newFiles = Array.from(event.target.files);
    setImage((prevFiles) => [...prevFiles, ...newFiles]);

    newFiles.forEach((file) => {
      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: 0,
      }));
    });
  };

     const removeImage = (index) => {
    const newImages = image.filter((_, i) => i !== index);
    setImage(newImages);
    };
    
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);

    formData.append('price', price);
    formData.append('description', desc);

    if (
      sizeS === 0 &&
      sizeM === 0 &&
      sizeM === 0 &&
      (sizeL === 0) & (sizeXL === 0)
    ) {
      formData.append('sizeS', 0);
      formData.append('sizeM', 0);
      formData.append('sizeL', 0);
      formData.append('sizeXL', 0);
      formData.append('stock', sizeStock);
    } else {
      const totalStock =
        parseInt(sizeS) + parseInt(sizeM) + parseInt(sizeL) + parseInt(sizeXL);
      formData.append('sizeS', sizeS);
      formData.append('sizeM', sizeM);
      formData.append('sizeL', sizeL);
      formData.append('sizeXL', sizeXL);
      formData.append('stock', totalStock);
    }

    image.forEach((image) => {
      formData.append('image', image);
    });

    try {
      await axios.post(`${baseURL}/admin/merchandise/add?id=${idArtist}`, formData).then(alert('Successfully added merchandise'));
    } catch (error) {
      if (error.response) {
        alert('Error uploading file: ' + error.response.data.message);
      } else if (error.request) {
        alert('Error sending request to server.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };
   
  return (
    <>
      <form
        onSubmit={handleUpload}
        class="relative my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4"
      >
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="mr-auto shrink-0 sm:py-3">
           <p class="font-bold text-2xl text-black">Merchandise Details</p>
            <p class="text-sm text-gray-600">Add your merchandise details</p>
          </div>
          <button
            class="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring sm:inline"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
          >
            Save
          </button>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Product Name</p>
          <input
           onChange={(e)=> setName(e.target.value)}
            placeholder="Type product name"
             class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Artist</p>
          <div class="relative w-full rounded-lg ">
            <select
             onChange={(e)=> setIdArtist(e.target.value)}
              class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            >
              <option value="#">Please select artist...</option>
              {dataArtist.map((item) => (
                <option value={item.id_artist}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Category</p>
          <div class="relative w-full rounded-lg ">
            <select
             onChange={(e)=>setCategory(e.target.value)}
               class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            >
              <option value="#">Please select category...</option>
              {dataCategories.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
              <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
             {category === 'T-shirt' ||
              category === 'Long Sleeve' ||
              category === 'Hoodie' ||
              category === 'Zipper Hoodie' ||
              category === 'Sweatshirt' ? (
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                 <p class="w-32 shrink-0 font-medium text-black">Size</p>
                  <input
                    onChange={(e) => setSizeS(e.target.value)}
                    placeholder="S"
                    type="number"
                    defaultValue={0}
                     class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
                  />
                  <input
                    onChange={(e) => setSizeM(e.target.value)}
                    placeholder="M"
                    type="number"
                    defaultValue={0}
                   class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
                  />
                  <input
                    onChange={(e) => setSizeL(e.target.value)}
                    placeholder="L"
                    type="number"
                    defaultValue={0}
                    class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
                  />
                  <input
                    onChange={(e) => setSizeXL(e.target.value)}
                    placeholder="XL"
                    type="number"
                    defaultValue={0}
                    class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4 py-4 sm:flex-row">
                  <p className="w-32 shrink-0  font-medium text-black">Stock</p>
                  <input
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Stock"
                    type="number"
                    defaultValue={0}
                    class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
                  />
                </div>
              )}
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Price</p>
          <input
           onChange={(e)=>setPrice(e.target.value)}
            placeholder="Rp. "
             class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Description</p>
          <textarea
           onChange={(e)=>setDesc(e.target.value)}
            placeholder="Write product description here"
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 py-4">
          <div class="w-32 shrink-0 sm:py-4">
            <p class="mb-auto font-bold text-3xl text-black">Image</p>
            <p class="text-sm text-gray-600">Insert product image</p>
          </div>
          <div className="flex flex-col gap-4 py-4 ">
                <div class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black">
                  <div class="mb-8">
                    <input
                      type="file"
                      onChange={uploadImageToClient}
                      name="image"
                      id="file"
                      class="sr-only"
                    />
                    <label
                      for="file"
                      class="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                    >
                      <div>
                        <span class="inline-flex cursor-pointer rounded border border-[#e0e0e0] px-7 py-2 text-base font-medium text-black">
                          Browse
                        </span>
                      </div>
                    </label>
                  </div>
                  {image.map((file, index) => (
                    <div class="mb-4 rounded-md bg-[#F5F7FB] px-8 py-4">
                      <div class="flex items-center justify-between">
                        <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                          {file.name}
                        </span>
                        <button
                          class="text-[#07074D]"
                          onClick={() => removeImage(index)}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                              fill="currentColor"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                      <div class="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                        <div class="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
        </div>
      </form>
    </>
  )
}