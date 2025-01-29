import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { baseURLFile } from '@/baseURLFile';
import { Delete, Edit, Lock, LockOpen } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';
export default function index() {
   const { data: session } = useSession();

  const router = useRouter();
  const [data, setData] = useState([]);
  const [totalArtist, setTotalArtist] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/admin/artists?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setData(response.data.data);
        setTotalArtist(response.data.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (currentPage) {
      fetchData();
    }
  }, [currentPage, session]);

  const handleDeleteArtist = async (idArtist) => {
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
        const response = await axios.delete(
          `${baseURL}/admin/artist/delete?id=${idArtist}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        await Swal.fire({
          title: 'Deleted!',
          text: response.data.message,
          icon: 'success',
          confirmButtonColor: '#3085d6',
        }).then(router.reload());
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the artist account',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
      window.location.reload();
    }
  };

   const handleBlock= async (idArtist) => {
    try {
      const response = await axios.put(`${baseURL}/admin/artist/block?id=${idArtist}`,{}, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log(response.data.message);
         await Swal.fire({
           title: 'Blocked',
           text: response.data.message,
           icon: 'success',
           confirmButtonColor: '#3085d6',
         });
      } 
      window.location.reload();
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while block the artist account',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
      window.location.reload();
    }
  };

  const handleUnblock = async (idArtist) => {
    try {
      const response = await axios.put(`${baseURL}/admin/artist/unblock?id=${idArtist}`,{}, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        await Swal.fire({
          title: 'Unblocked',
          text: response.data.message,
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }   
      window.location.reload();
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while unblock the artist account',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
      window.location.reload();
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
      <>
          <div className="my-1 w-full border bg-white shadow-xl sm:rounded-xl  sm:py-1">
      <div className="flex flex-col py-4 sm:flex-row sm:items-start">
        <section className="container mx-3s">
          <div className="mr-auto shrink-0 sm:py-3 px-16">
            <p className="text-3xl text-black">Data All Artist</p>
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
                          Email/Username
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Genre
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Formed
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Reported
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Created/At
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
                      {data.map((item) => (
                        <tr key={item.id_artist}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                            <div className="inline-flex items-center gap-x-3">
                             
                              <span>{item.id_artist}</span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex items-center gap-x-2">
                             {item.avatar === null ? (
                                          
                                          <img
                                className="h-8 w-8 rounded-full object-cover"
                                src='/image/thumbnail3.png' 
                              />
                                      ): (<img
                                className="h-8 w-8 rounded-full object-cover"
                                src={`${baseURLFile}/assets/image/avatar/${item.avatar}`}
                              />)}
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                  {item.username}
                                </h2>
                                <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                  {item.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          {item.status == 1 ? (
                            <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                              <div className="inline-flex items-center gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-emerald-500 dark:bg-gray-800">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>

                                <h2 className="text-sm font-normal">Non-blocked</h2>
                              </div>
                            </td>
                          ) : item.status == 0 ? (
                            <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                              <div className="inline-flex items-center gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-red-500 dark:bg-gray-800">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9 3L3 9M3 3L9 9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>

                                <h2 className="text-sm font-normal">Blocked</h2>
                              </div>
                            </td>
                          ) : null}
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.genre}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.formed}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <button className="hover:text-indigo-500 focus:outline-none">
                              View
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.created_at}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={()=> handleDeleteArtist(item.id_artist)}
                                className="text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-500">
                                <Delete className="h-6 w-6" />
                              </button>

                              <a
                                href={`/artist/${item.id_artist}`}
                                className=" text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                              >
                                <Edit className="h-6 w-6" />
                              </a>
                              {item.status === 0 ? (
                                <button
                                 onClick={() => handleUnblock(item.id_artist)}
                                  className=" text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                <LockOpen className="h-6 w-6" />
                              </button>
                              ) : (
                                  <button
                                     onClick={() => handleBlock(item.id_artist)}
                                    className=" text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                <Lock className="h-6 w-6" />
                              </button>
                              )}
                             
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
              disabled={currentPage * 9 >= totalArtist}
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