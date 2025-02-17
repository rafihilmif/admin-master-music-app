import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/baseURL';
import { baseURLFile } from '@/baseURLFile';
import { VisibilityRounded, History, Done, Edit } from '@mui/icons-material';
import { getSession, useSession } from 'next-auth/react';

export default function index() {
  const { data: session } = useSession();
  const [dataSubscribe, setDataSubscribe] = useState([]);
  const [totalSubscribe,setTotalSubscribe] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/admin/plan?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            }
          }
        );
        setDataSubscribe(response.data.data);
        setTotalSubscribe(response.data.total);
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
    
  return (
      <>
    <div class="relative my-1 w-full border bg-white shadow-xl sm:rounded-xl  sm:py-1">
      <div class="flex flex-col py-4 sm:flex-row sm:items-start">
        <section class="container relative mx-3s">
          <div class="mr-auto shrink-0 sm:py-3 px-5">
            <p class="text-3xl text-black">Data All Subscribe Plan</p>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 md:rounded-lg dark:border-gray-700">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          <div class="flex items-center gap-x-3">
                            <button class="flex items-center gap-x-2">
                              <span>ID</span>

                              <svg
                                class="h-3"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  stroke-width="0.1"
                                />
                                <path
                                  d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  stroke-width="0.1"
                                />
                                <path
                                  d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  stroke-width="0.3"
                                />
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Email/Username
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Limit Listening
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Start
                                                  </th>
                         <th
                          scope="col"
                          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Expired
                                                  </th>
                         
                        <th
                          scope="col"
                          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                      {dataSubscribe.map((item) => (
                        <tr>
                          <td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                            <div class="inline-flex items-center gap-x-3">
                              <span>{item.id_plan}</span>
                            </div>
                          </td>
                          <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <div class="flex items-center gap-x-2">
                             {item.Fan.avatar === null ? (
                                          
                                          <img
                                className="h-8 w-8 rounded-full object-cover"
                              src='/image/thumbnail3.png' 
                              />
                                      ): (<img
                                class="h-8 w-8 rounded-full object-cover"
                                src={`${baseURLFile}/assets/image/avatar/${item.Fan.avatar}`}
                              />)}
                              <div>
                                <h2 class="text-sm font-medium text-gray-800 dark:text-white ">
                                  {item.Fan.username}
                                </h2>
                                <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                  {item.Fan.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          {item.type == "premium" ? (
                            <td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                              <div class="inline-flex items-center gap-x-2 rounded-full bg-purple-100/60 px-3 py-1 text-purple-500 dark:bg-gray-800">
                                <h2 class="text-sm font-bold text-purple-300">Premium</h2>
                              </div>
                            </td>
                          ) : item.type == "deluxe" ? (
                            <td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                              <div class="inline-flex items-center gap-x-2 rounded-full bg-blue-100/60 px-3 py-1 text-blue-500 dark:bg-gray-800">
                                <h2 class="text-sm font-bold text-blue-300">Deluxe</h2>
                              </div>
                            </td>
                              ) : item.type === "free" ? (<td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                              <div class="inline-flex items-center gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-red-500 dark:bg-gray-800">
                                <h2 class="text-sm font-bold text-red-300">Free</h2>
                              </div>
                            </td> ) : null}
                              <td class="whitespace-nowrap px-4 py-4 text-sm text-green-500 dark:text-gray-300">
                           {item.limit_listening}
                          </td>
                          <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.start}
                          </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.expired}
                          </td>
                          <td class="whitespace-nowrap px-4 py-4 text-sm">
                            <div class="flex items-center gap-x-6">
                              <a
                                 href={`/fans/subscribe/${item.id_plan}`}
                                class=" text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
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

          <div class="mt-6 flex items-center justify-between px-5">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              href="#"
              class="cursor-pointer flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage * 9 >= totalSubscribe}
              href="#"
              class="cursor-pointer flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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