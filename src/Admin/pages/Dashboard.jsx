import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart, Pie,Cell,} from "recharts";

const Dashboard = () => {
  
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });


const chartData = [
  { name: "Users", value: stats.users },
  { name: "Products", value: stats.products },
  { name: "Orders", value: stats.orders },
];

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6"];





  useEffect(() => {
    // Fetch users → count users  And  orders
    axios.get("http://localhost:31234/users").then((res) => {
      const usersCount = res.data.length;

      const ordersCount = res.data.reduce(
        (total, user) => total + (user.orders?.length || 0),
        0
      );

      setStats((prev) => ({
        ...prev,
        users: usersCount,
        orders: ordersCount,
      }));
    });

    // Fetch products → count products
    axios.get("http://localhost:31234/products").then((res) => {
      setStats((prev) => ({
        ...prev,
        products: res.data.length,
      }));
    });
  }, []);

  return (
    <div className="p-6">
    
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
      
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full text-2xl">
            <i className="fa-solid fa-users"></i>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-orange-500">{stats.users}</p>
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-4 bg-green-100 text-green-600 rounded-full text-2xl">
            <i className="fa-solid fa-box"></i>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-2xl font-bold text-orange-500">{stats.products}</p>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-full text-2xl">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-orange-500">{stats.orders}</p>
          </div>
        </div>

      </div>

     
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

  
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">
      Overview (Bar Chart)
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>

  
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">
      Distribution (Pie Chart)
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  

</div>

    </div>
  );
};

export default Dashboard;
