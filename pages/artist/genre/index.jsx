import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Delete, Edit, Lock } from '@mui/icons-material';
import { baseURL } from '@/baseURL';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';

export default function index() {
  const { data: session } = useSession();
  
  const router = useRouter();
  const [dataGenre, setDataGenre] = useState([]);
  const [name, setName] = useState();
  const [totalGenre, setTotalGenre] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/admin/genres?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            }
          }
        );
        setDataGenre(response.data.data);
        setTotalGenre(response.data.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (currentPage) {
         fetchData();
    }
  }, [currentPage, session]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleAddGenre = async () => {
    try {
      const response = await axios.post(`${baseURL}/admin/genre/add`, {
        name: name
      },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          }
        });
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
      }
       window.location.reload();
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
  const handleDeleteGenre = async (idGenre) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.isConfirmed) {
        const response = await axios.delete(`${baseURL}/admin/genre/delete?id=${idGenre}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        await Swal.fire({
          title: 'Deleted!',
          text: response.data.message,
          icon: 'success',
          confirmButtonColor: '#3085d6',
        }).then(router.reload());
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
        className="y-4 w-full border bg-white px-4 shadow-xl rounded-xl"
      >
        <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div className="mr-auto shrink-0 sm:py-3">
            <p className="font-medium text-3xl text-black">Genre Details</p>
            <p className="text-sm text-gray-600">Add new genre</p>
          </div>
          <button
            type="submit"
            onClick={()=> handleAddGenre()}
            className="hidden rounded-lg border-2 border-transparent bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring sm:inline"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p className="w-32 shrink-0 font-medium text-black">Genre Name</p>
          <input
           onChange={(e)=> setName(e.target.value)}
            placeholder="Type genre name"
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
          {errors.name && (
                <p className="mb-1 text-red-500">{errors.name}</p>
          )}
      </div>
          <div className="my-1 w-full border bg-white shadow-xl sm:rounded-xl  sm:py-1">
      <div className="flex flex-col py-4 sm:flex-row sm:items-start">
        <section className="container relative mx-3s">
          <div className="mr-auto shrink-0 sm:py-3 px-16">
            <p className="text-3xl text-black">Data All Genre</p>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                        
                            <button className="flex items-center gap-x-2">
                              <span>ID</span>

                              <svg
                                className="h-3"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.1"
                                />
                                <path
                                  d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.1"
                                />
                                <path
                                  d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.3"
                                />
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                         Name
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Created_at
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                      {dataGenre.map((item) => (
                        <tr key={item.id_genre}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                            <div className="inline-flex items-center gap-x-3">
                             

                              <span>{item.id_genre}</span>
                            </div>
                          </td>
                          
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.created_at}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={()=> handleDeleteGenre(item.id_genre)}
                                className="text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-500">
                                <Delete className="h-6 w-6" />
                              </button>

                              <a
                                href={`/artist/genre/${item.id_genre}`}
                                className=" text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                              >
                                <Edit className="h-6 w-6" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between px-16">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              href="#"
              className="cursor-pointer flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage * 8 >= totalGenre}
              href="#"
              className="cursor-pointer flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </section>
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