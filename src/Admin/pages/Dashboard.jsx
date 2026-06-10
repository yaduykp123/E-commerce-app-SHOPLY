import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Products", value: stats.products },
    { name: "Orders", value: stats.orders },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"];

  useEffect(() => {
    axios.get("/admin/stats").then((res) => {
      setStats({
        users: res.data.users,
        orders: res.data.orders,
        products: res.data.products,
        revenue: res.data.revenue || 0,
      });
    });
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Overview Dashboard</h1>
        <p className="text-slate-500 mt-1">Real-time statistics and analytics</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Users Stat */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <i className="fa-solid fa-users text-8xl text-blue-600"></i>
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/40">
              <i className="fa-solid fa-users"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Users</p>
              <h3 className="text-4xl font-black text-slate-800 mt-1">{stats.users}</h3>
            </div>
          </div>
        </div>

        {/* Products Stat */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <i className="fa-solid fa-box-open text-8xl text-emerald-600"></i>
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/40">
              <i className="fa-solid fa-box-open"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Products</p>
              <h3 className="text-4xl font-black text-slate-800 mt-1">{stats.products}</h3>
            </div>
          </div>
        </div>

        {/* Orders Stat */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <i className="fa-solid fa-shipping-fast text-8xl text-purple-600"></i>
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-500/40">
              <i className="fa-solid fa-shopping-bag"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Orders</p>
              <h3 className="text-4xl font-black text-slate-800 mt-1">{stats.orders}</h3>
            </div>
          </div>
        </div>

        {/* Revenue Stat */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <i className="fa-solid fa-indian-rupee-sign text-8xl text-amber-600"></i>
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-amber-500/40">
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-4xl font-black text-slate-800 mt-1">₹{stats.revenue?.toLocaleString()}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Bar Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">System Metrics</h2>
            <p className="text-sm text-slate-500">Volume distribution across categories</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center">
          <div className="mb-2 w-full text-left">
            <h2 className="text-xl font-bold text-slate-800">Data Distribution</h2>
            <p className="text-sm text-slate-500">Proportional view of system activity</p>
          </div>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex gap-6 mt-4">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-sm font-medium text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
