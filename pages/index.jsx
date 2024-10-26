import { baseURL } from '@/baseURL';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export default function index() {
  const [orders, setOrders] = useState([]);

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
  
  const calculateStats = () => {
    if (!orders.length) return [];

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const uniqueCustomers = new Set(orders.map(order => order.id_fans)).size;

    return [
      {
        title: "Total Orders",
        value: totalOrders,
        // icon: Package2,
        bgColor: "bg-blue-400"
      },
      {
        title: "Total Revenue",
        value: `Rp ${totalRevenue.toLocaleString()}`,
        // icon: CreditCard,
        bgColor: "bg-yellow-400"
      },
      {
        title: "Unique Customers",
        value: uniqueCustomers,
        // icon: Users,
        bgColor: "bg-red-400"
      }
    ];
  };

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

  const stats = calculateStats();
  const chartData = prepareChartData();

  return (
     <>
     <div>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        {/* {stats.map((stat, index) => (
          <div key={index} className={`rounded h-40 shadow-sm p-6 ${
            index === 0 ? 'bg-blue-400' : 
            index === 1 ? 'bg-yellow-400' : 
            'bg-red-400'
          }`}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-white text-sm font-medium">{stat.title}</p>
                <h3 className="text-white text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="bg-white/20 p-3 rounded-full w-fit">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))} */}
      </div>

      <div className="grid col-1 h-96 shadow-sm p-6 bg-white rounded-lg">
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

    </div>
    </>
  )
}
