import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { baseURLFile } from '@/baseURLFile';
import { useRouter } from 'next/router';
import {Clear} from '@mui/icons-material';
export default function merchandiseById() {
  const router = useRouter();
  const { id } = router.query;
    
    const [dataCategories, setDataCategories] = useState([]);
    
  const [loading, setLoading] = useState(true);
  const [OldName, setOldName] = useState('');
  const [OldDesc, setOldDesc] = useState('');
  const [OldImage, setOldImage] = useState([]);
  const [OldCategory, setOldCategory] = useState('');
  const [OldSizeS, setOldSizeS] = useState(0);
  const [OldSizeM, setOldSizeM] = useState(0);
  const [OldSizeL, setOldSizeL] = useState(0);
  const [OldSizeXL, setOldSizeXL] = useState(0);
  const [OldPrice, setOldPrice] = useState(0);
  const [OldStock, setOldStock] = useState();
    
   const [formData, setFormData] = useState({});

    const [newImage, setNewImage] = useState([]);
    
  const [uploadProgress, setUploadProgress] = useState({});
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const fetchImageData = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/artist/image/merchandise?id=${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching image data:', error);
      return [];
    }
  };

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/admin/detail/merchandise?id=${id}`,
        );
        setOldName(response.data.name);
        setOldDesc(response.data.description);
        setOldCategory(response.data.category);
        setOldSizeS(response.data.s);
        setOldSizeM(response.data.m);
        setOldSizeL(response.data.l);
        setOldSizeXL(response.data.xl);
        setOldStock(response.data.stock);
        setOldPrice(response.data.price);

        const images = await fetchImageData(id);
        setOldImage(images);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
    }, [id]);
    
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
    

    const uploadImageToClient = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedNewImages = [...newImage];
      updatedNewImages[index] = { file, number: OldImage[index].number };
      setNewImage(updatedNewImages);
    };
    reader.readAsDataURL(file);
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
    newImage.forEach(({ file, number }) => {
      data.append('image', file);
      data.append('number', number);
    });

    try {
      await axios.put(`${baseURL}/admin/merchandise/update?id=${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Successfully updated merchandise', router.reload());
    } catch (error) {
      console.error('Error updating merchandise:', error);
      alert('Error updating merchandise: ' + error.message);
    }
    };
    
  return (
    <>
      <form
        onSubmit={handleUpdate}
        class="my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4"
      >
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="mr-auto shrink-0 sm:py-3">
           <p class="font-bold text-2xl text-black">Update an merchandise</p>
            <p class="text-sm text-gray-600">Update some merchandise details</p>
          </div>
          <button
            type="submit"
            class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
          >
            Update
          </button>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Product Name</p>
          <input
            defaultValue={OldName}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Type product name"
             class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 text-lg font-medium">Category</p>
                <select
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full rounded-md border bg-transparent px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                >
                  <option className="text-black" value={OldCategory}>
                    {OldCategory}
                  </option>
                  {dataCategories.map((item, i) => (
                    <option className="text-black" key={i} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
        {OldCategory === 'T-shirt' ||
              OldCategory === 'Long Sleeve' ||
              OldCategory === 'Hoodie' ||
              OldCategory === 'Zipper Hoodie' ||
              OldCategory === 'Sweatshirt' ? (
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                  <p className="w-32 shrink-0 text-lg font-medium">Size</p>
                  <input
                    onChange={(e) => updateField('sizeS', e.target.value)}
                    placeholder="S"
                    type="number"
                    defaultValue={OldSizeS}
                    className="mb-2 w-full rounded-md border bg-transparent px-2 py-2 outline-none ring-blue-600 focus:ring-1 sm:mb-0 sm:mr-4"
                  />
                  <input
                    onChange={(e) => updateField('sizeM', e.target.value)}
                    placeholder="M"
                    type="number"
                    defaultValue={OldSizeM}
                    className="w-full rounded-md border bg-transparent px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  />
                  <input
                    onChange={(e) => updateField('sizeL', e.target.value)}
                    placeholder="L"
                    type="number"
                    defaultValue={OldSizeL}
                    className="w-full rounded-md border bg-transparent px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  />
                  <input
                    onChange={(e) => updateField('sizeXL', e.target.value)}
                    placeholder="XL"
                    type="number"
                    defaultValue={OldSizeXL}
                    className="w-full rounded-md border bg-transparent px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                  <p className="w-32 shrink-0 text-lg font-medium">Stock</p>
                  <input
                    onChange={(e) => updateField('stock', e.target.value)}
                    placeholder="Stock"
                    type="number"
                    defaultValue={OldStock}
                    className="w-full rounded-md border bg-transparent px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  />
                </div>
              )}
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Price</p>
                  <input
                      defaultValue={OldPrice}
             onChange={(e) => updateField('price', e.target.value)}
            placeholder="Rp. "
             class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Description</p>
          <textarea
            onChange={(e) => updateField('description', e.target.value)}
            defaultValue={OldDesc}
            rows={15}
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
                  <div className="flex flex-wrap justify-center gap-4">
                  {OldImage.map((item, i) => (
                    <label
                      key={i}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative flex min-h-[200px] w-64 items-center justify-center rounded-md border border-solid border-gray-300 p-4 text-center shadow-lg"
                    >
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-white">
                        <img
                          height={100}
                          width={100}
                          className="block h-full w-auto rounded-xl"
                          alt=""
                          src={`${baseURLFile}/assets/image/merchandise/${item.name}`}
                        />
                        {hoveredIndex === i && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                            
                              <label
                                htmlFor={`file-input-${i}`}
                                className="text-md group relative h-10 w-36 cursor-pointer overflow-hidden rounded-md bg-blue-500 p-2 font-bold text-white"
                              >
                                Change Picture
                                <input
                                  id={`file-input-${i}`}
                                  type="file"
                                  name="image"
                                  className="hidden"
                                  onChange={(event) =>
                                    uploadImageToClient(event, i)
                                  }
                                />
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                </div>
            </div>
        </div>
      </form>
    </>
  )
}
