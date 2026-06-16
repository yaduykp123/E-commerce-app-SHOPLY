import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "../public/Shimmer";


function Home() {
  const [mobiles, setMobiles] = useState([]);
  const [index, setIndex] = useState(0);
const [loading, setLoading] = useState(true);


 useEffect(() => {
  const fetchMobiles = async () => {
    try {
      const res = await axios.get("/products?limit=50");

            
                    setMobiles(res.data.products || []);
                    setLoading(false);
               

    } catch (err) {
      console.error(err);
    }
  };

  fetchMobiles();
}, []);


  // Auto slide every 3s
  useEffect(() => {
    if (mobiles.length === 0) return ;

    const slider = setInterval(() => {
      setIndex(prev => (prev + 1) % mobiles.length);
    }, 3000);

    return () => clearInterval(slider);
  }, [mobiles.length]);

if (loading) return (  

  <Shimmer>
      <div>

      {/* ================= BRAND STRIP ================= */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-6 overflow-hidden">
          {Array(10).fill("").map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 rounded-full shimmer"
            />
          ))}
        </div>
      </div>

      {/* ================= HERO ================= */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div>
            <div className="h-10 w-64 shimmer mb-4 rounded" />
            <div className="h-4 w-72 shimmer mb-6 rounded" />
            <div className="h-12 w-40 shimmer rounded-full" />
          </div>

          <div className="flex justify-center">
            <div className="w-[380px] h-[250px] shimmer rounded-xl" />
          </div>

        </div>
      </div>

      {/* ================= TRENDING ================= */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 flex flex-col md:flex-row gap-6">
          <div className="w-[220px] h-[180px] shimmer rounded mx-auto md:mx-0" />
          <div className="flex-1">
            <div className="h-6 w-48 shimmer mb-2 rounded" />
            <div className="h-4 w-32 shimmer mb-2 rounded" />
            <div className="h-5 w-24 shimmer mb-4 rounded" />
            <div className="h-10 w-32 shimmer rounded-full" />
          </div>
        </div>
      </div>

      {/* ================= BRAND IMAGE GRID ================= */}
      <div className="flex flex-wrap justify-center gap-10 py-10 bg-white">
        {Array(4).fill("").map((_, i) => (
          <div key={i} className="text-center">
            <div className="h-4 w-20 mx-auto mb-3 shimmer rounded" />
            <div className="h-40 w-40 shimmer rounded-xl" />
          </div>
        ))}
      </div>

      {/* ================= BUDGET / MID / PREMIUM ================= */}
      <div className="px-4 py-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {Array(3).fill("").map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6"
            >
              <div className="h-5 w-40 mx-auto shimmer rounded mb-6" />

              <div className="grid grid-cols-2 gap-3">
                {Array(4).fill("").map((_, j) => (
                  <div
                    key={j}
                    className="h-20 shimmer rounded"
                  />
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
    </Shimmer>

)

  const mobile = mobiles[index];

  return (
    <div>

     {/* ================= BRAND STRIP (FLIPKART STYLE) ================= */}
<div className="w-full bg-white border-b">
  <div className="max-w-7xl mx-auto px-6 py-4 overflow-hidden">

    {/* White space edges */}
    <div className="relative">

      <div className="flex gap-6 animate-brandSlide">

        {[
          "Apple",
          "Samsung",
          "Google",
          "OnePlus",
          "Xiaomi",
          "Realme",
          "Vivo",
          "Oppo",
          "Motorola",
          "Nothing",
          "Infinix",
          "iQOO",
        ].map((brand, i) => (
          <Link
            key={i}
            to={`/mobileBrand/${brand}`}
            className="px-6 py-2 whitespace-nowrap rounded-full
                       bg-white
                       text-sm md:text-base font-semibold text-gray-700
                       shadow-md
                       border border-transparent
                       hover:border-black
                       hover:shadow-xl
                       hover:text-black
                       transition-all duration-300"
          >
            {brand}
          </Link>
        ))}

      </div>

    </div>
  </div>
</div>


     
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 items-center gap-10">
          <div className="z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Latest Smartphones
            </h1>
            <p className="text-gray-300 mb-8 max-w-md">
              Flagship mobiles · Best prices · Trusted brands
            </p>

            <Link
              to="/productsAll"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                         bg-gradient-to-r from-blue-600 to-purple-600
                         hover:opacity-90 transition shadow-lg font-semibold"
            >
              Shop Mobiles
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

       
          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-[380px] aspect-[4/3] overflow-hidden">
              <img
                src={mobile.image}
                alt={mobile.model}
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

      
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      
      <div className="py-12 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-8">
          Trending Mobiles
        </h2>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center transition-all duration-500">

          <img
            src={mobile.image}
            alt={mobile.model}
            className="w-[220px] object-contain drop-shadow-md"
          />

          <div className="md:ml-10 text-center md:text-left">
            <h3 className="text-xl font-semibold">
              {mobile.brand} {mobile.model}
            </h3>

            <p className="text-gray-500 my-1">
              {mobile.ram} | {mobile.storage}
            </p>

            <p className="text-lg font-bold text-green-600">
              ₹{mobile.price}
            </p>

            {!mobile.inStock && (
              <p className="text-red-500 font-semibold mt-1">
                Out of Stock
              </p>
            )}

            <div className="mt-4 flex gap-4 justify-center md:justify-start">
              <Link to={`/single-product/${mobile.id}`}>
                <button
                  disabled={!mobile.inStock}
                  className={`px-6 py-2 rounded-full text-white transition ${
                    mobile.inStock
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  View now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap justify-center gap-10 py-10 bg-white">
        {[
          { name: "Apple", path: "Apple", img: "https://cdn.moglix.com/p/jJK3dNIWMNQvV-xxlarge.jpg" },
          { name: "Google", path: "Google", img: "https://cdn.beebom.com/mobile/2024/05/Google-Pixel-7-1.png" },
          { name: "Samsung", path: "Samsung", img: "https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/t/0/g/-original-imah4zp7fvqp8wev.jpeg?q=90" },
          { name: "Others", path: "others", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-dFECiGDNiEnmfJgGFc9aUp_2lJOSDat0wg&s" },
        ].map(b => (
          <div key={b.name} className="text-center">
            <h1 className="font-semibold mb-2">{b.name}</h1>
            <Link to={`/mobileBrand/${b.path}`}>
              <img
                src={b.img}
                alt={b.name}
                className="h-40 object-contain mx-auto cursor-pointer hover:scale-105 transition"
              />
            </Link>
          </div>
        ))}
      </div>


      <div className="px-4 py-6 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[
            { title: "Budget Phones", min: 0, max: 30000 },
            { title: "Mid Range Phones", min: 30000, max: 50000 },
            { title: "Premium Phones", min: 50000, max: Infinity },
          ].map((range, i) => (
            <Link
              key={i}
              to={`mobileBudget/${range.min}/${range.max}`}
              state={{ mobiles }}
            >
              <div className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-xl transition">
                <h2 className="text-lg font-bold my-6 text-center text-gray-600">
                  {range.title}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {mobiles
                    .filter(m => m.price > range.min && m.price <= range.max)
                    .slice(0, 4)
                    .map(m => (
                      <img
                        key={m.id}
                        src={m.image}
                        alt={m.model}
                        className="h-20 object-contain mx-auto"
                      />
                    ))}
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Home;
