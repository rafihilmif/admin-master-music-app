import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { baseURLFile } from '@/baseURLFile';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';

export default function SongsTable() {
  const [data, setData] = useState([]);
  const [totalSong, setTotalSong] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/admin/songs?page=${currentPage}`,
        );
        setData(response.data.data);
        setTotalSong(response.data.total);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch songs data',
          confirmButtonColor: '#3085d6',
        });
      }
    };
    fetchData();
  }, [currentPage]);

  const handleDeleteSong = async (idSong) => {
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
          `${baseURL}/admin/song/delete?id=${idSong}`,
        );
        await Swal.fire({
          title: 'Deleted!',
          text: response.data.message,
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        // Refresh data instead of reloading page
        const updatedResponse = await axios.get(
          `${baseURL}/admin/songs?page=${currentPage}`,
        );
        setData(updatedResponse.data.data);
        setTotalSong(updatedResponse.data.total);
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the song',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="relative my-1 w-full border bg-white shadow-xl sm:rounded-xl sm:py-1">
      <div className="flex flex-col py-4 sm:flex-row sm:items-start">
        <section className="container mx-auto px-4">
          <div className="mr-auto shrink-0 sm:py-3">
            <p className="text-3xl text-black">Data All Songs</p>
          </div>
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      {/* Table header rows remain the same, just change class to className */}
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                      {data.map((item) => (
                        <tr key={item.id_song}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                            <div className="inline-flex items-center gap-x-3">
                              <span>{item.id_song}</span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex items-center gap-x-2">
                              {item.Artist && (
                                <>
                                  <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src={`${baseURLFile}/assets/image/avatar/${item.Artist.avatar}`}
                                    alt={`${item.Artist.name}'s avatar`}
                                    onError={(e) => {
                                      e.target.src = '/image/thumbnail3.png';
                                    }}
                                  />
                                  <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                                      {item.id_artist}
                                    </h2>
                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                      {item.Artist.name}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                            <div className="flex items-center gap-x-2">
                              <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={`${baseURLFile}/assets/image/song/${item.image}`}
                                alt={item.name}
                                onError={(e) => {
                                  e.target.src = '/image/thumbnail3.png';
                                }}
                              />
                              <div>
                                <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
                                  {item.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                            <div className="flex items-center gap-x-2">
                              {item.album !== '-' && item.Album ? (
                                <>
                                  <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src={`${baseURLFile}/assets/image/album/${item.Album.image}`}
                                    alt={item.album}
                                    onError={(e) => {
                                      e.target.src = '/image/thumbnail3.png';
                                    }}
                                  />
                                  <div>
                                    <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
                                      {item.album}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src="/image/thumbnail3.png"
                                    alt="No album"
                                  />
                                  <div>
                                    <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
                                      -
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.genre}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <button className="text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-500">
                              View
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.release_date}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.status === 1 ? 'True' : 'False'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.created_at}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={() => handleDeleteSong(item.id_song)}
                                className="text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-500"
                              >
                                <Delete className="h-6 w-6" />
                              </button>
                              <a
                                href={`/song/${item.id_song}`}
                                className="text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
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

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
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
              disabled={currentPage * 9 >= totalSong}
              className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
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
  );
}