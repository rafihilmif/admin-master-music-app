
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PeopleAlt, LocalOffer, MusicNote } from '@mui/icons-material';
import { baseURL } from '@/baseURL';
import { baseURLFile } from '@/baseURLFile';

export default function index() {
  const [orders, setOrders] = useState([]);

  const [totalFans, setFansTotal] = useState();
  const [totalArtist, setArtistTotal] = useState();
  const [totalMerchandise, setTotalMerchandise] = useState();
  const [totalSong, setTotalSong] = useState();
  const [dataTopMerchandise, setDataTopMerchandise] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/ordered/chart`);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch order data:', error);
      }
    };
    fetchOrderData();
  }, []);
  
  useEffect(() => {
    const fetchTotalFans = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/account/fans/total`)
        setFansTotal(response.data);
      } catch (error) {
        console.error('Failed to fetch fans total:', error);
      }
    }
    fetchTotalFans();
  }, []);
  
  useEffect(() => {
    const fetchTotalArtist = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/account/artist/total`)
        setArtistTotal(response.data);
      } catch (error) {
        console.error('Failed to fetch artist total:', error);
      }
    }
    fetchTotalArtist();
  }, []);
  
  useEffect(() => {
    const fetchTotalMerch = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/total/merchandise`);
        setTotalMerchandise(response.data);
      } catch (error) {
        console.error('Failed to fetch merchandise total:', error);
      }
    }
    fetchTotalMerch();
  }, []);

  useEffect(() => {
    const fetchTotalSong = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/total/song`);
        setTotalSong(response.data);
      } catch (error) {
        console.error('Failed to fetch merchandise total:', error);
      }
    }
    fetchTotalSong();
  }, []);
  
  useEffect(() => {
    const fetchTopMerchandise = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/most/merchandise`);
        setDataTopMerchandise(response.data);
      } catch (error) {
        console.error("Failed to fetch top merchandise sales", error);
      }
    }
    fetchTopMerchandise();
  }, []);
  
  const prepareChartData = () => {
    const monthlyData = orders.reduce((acc, order) => {
      const date = new Date(order.created_at);
      const monthStr = date.toLocaleString('default', { month: 'long' });

      if (!acc[monthStr]) {
        acc[monthStr] = {
          date: monthStr,
          totalRevenue: 0,
          orderCount: 0
        };
      }

      acc[monthStr].totalRevenue += order.total;
      acc[monthStr].orderCount += 1;

      return acc;
    }, {});

    return Object.values(monthlyData);
  };


  const chartData = prepareChartData();

  return (
     <>
    
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

<div className="grid lg:grid-cols-4 gap-5 mb-16">
  <div className="rounded-lg bg-white h-40 shadow-sm p-6">
    <div className="flex items-center justify-between h-full">
      <div>
        <p className="text-gray-500 text-sm font-medium">Total Fans</p>
        <h3 className="text-black text-2xl font-bold mt-1">{totalFans}</h3>
      </div>
      <div className="bg-blue-50 p-3 rounded-full">
        <PeopleAlt className="w-6 h-6 text-blue-600"/>
      </div>
    </div>
  </div>
  
  <div className="rounded-lg bg-white h-40 shadow-sm p-6">
    <div className="flex items-center justify-between h-full">
      <div>
        <p className="text-gray-500 text-sm font-medium">Total Artists</p>
        <h3 className="text-black text-2xl font-bold mt-1">{totalArtist}</h3>
      </div>
      <div className="bg-purple-50 p-3 rounded-full">
        <PeopleAlt className="w-6 h-6 text-purple-600"/>
      </div>
    </div>
  </div>
  
  <div className="rounded-lg bg-white h-40 shadow-sm p-6">
    <div className="flex items-center justify-between h-full">
      <div>
        <p className="text-gray-500 text-sm font-medium">Total Merchandise</p>
        <h3 className="text-black text-2xl font-bold mt-1">{totalMerchandise}</h3>
      </div>
      <div className="bg-green-50 p-3 rounded-full">
        <LocalOffer className="w-6 h-6 text-green-600"/>
      </div>
    </div>
        </div>
         <div className="rounded-lg bg-white h-40 shadow-sm p-6">
    <div className="flex items-center justify-between h-full">
      <div>
        <p className="text-gray-500 text-sm font-medium">Total Song</p>
        <h3 className="text-black text-2xl font-bold mt-1">{totalSong}</h3>
      </div>
      <div className="bg-orange-50 p-3 rounded-full">
        <MusicNote className="w-6 h-6 text-orange-600"/>
      </div>
    </div>
  </div>
</div>

      <div className="grid col-1 h-96 shadow-sm p-6 bg-white rounded-lg mb-16">
  <h2 className="text-gray-800 text-xl font-bold mb-4">Total Order</h2>
  <div className="h-full w-full">
    <ResponsiveContainer width="100%" height="80%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
        <XAxis dataKey="date" stroke="rgba(0, 0, 0, 0.6)" />
        <YAxis stroke="rgba(0, 0, 0, 0.6)" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '5px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
          formatter={(value, name) => [
            value,
            name === 'totalQty' ? 'Items Sold' : 'Orders',
          ]}
        />
        <Bar dataKey="totalQty" fill="#1E88E5" name="Items Sold" />
        <Bar dataKey="orderCount" fill="rgba(0, 0, 0, 0.3)" name="Orders" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

      <div class="relative my-1 w-full bg-white shadow-sm rounded-lg sm:py-1">
      <div class="flex flex-col py-4 sm:flex-row sm:items-start">
        <section class="container relative mx-3s">
             <div class="mr-auto shrink-0 sm:py-3 px-16">
            <p class="text-3xl text-black">Top Sales Merchandise</p>
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
                                <span>No. </span>

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
                            ID Merchandise
                          </th>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                          >
                            Artist
                          </th>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                          >
                            Product Name
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                          >
                            Category
                          </th>
                           <th
                            scope="col"
                            class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                        {dataTopMerchandise.map((item, index) => (
                          <tr>
                             <td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                              <div class="inline-flex items-center gap-x-3">
                                <span>{index+1}</span>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                              <div class="inline-flex items-center gap-x-3">
                                <span>{item.id_merchandise}</span>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                              <div class="flex items-center gap-x-2">
                                <img
                                  class="h-8 w-8 rounded-full object-cover"
                                  src={`${baseURLFile}/assets/image/avatar/${item.Merchandise.Artist.avatar}`}
                                  alt=""
                                />
                                <div>
                                  <h2 class="text-sm font-medium text-gray-800 dark:text-white ">
                                    {item.Merchandise.Artist.id_artist}
                                  </h2>
                                  <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    {item.Merchandise.Artist.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {item.Merchandise.name}
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {item.Merchandise.category}
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {item.total_qty}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    
    </>
  )
}
