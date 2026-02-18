import { Link } from "react-router-dom";
import { useStore } from "../../public/StoreContext";

function WhishList() {
  const { wishlist, removeFromWhishList } = useStore();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        My Wishlist
      </h2>

      {wishlist.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          Your wishlist is empty ❤️
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md
                       transition p-4 flex flex-col"
          >
            {/* PRODUCT IMAGE */}
           <Link to={`/single-product/${item.id}`}>
            <div className="h-44 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
              <img
                src={item.image}
                alt={item.brand}
                className="max-h-full object-contain"
              />
            </div>
           </Link>

            {/* PRODUCT DETAILS */}
            <div className="flex-1 space-y-1">
              <h4 className="text-lg font-semibold text-gray-800">
                {item.brand}
              </h4>

              <p className="text-sm text-gray-500">
                {item.model}
              </p>

              <p className="text-sm text-gray-600">
                <b>RAM:</b> {item.ram} | <b>Storage:</b> {item.storage}
              </p>

              <p className="text-sm text-gray-600">
                <b>Color:</b> {item.color}
              </p>

              <p
                className={`inline-block text-xs px-2 py-1 rounded-full mt-1
                  ${item.inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"}`}
              >
                {item.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <p className="text-xl font-bold text-gray-900 mt-2">
                ₹{item.price}
              </p>
            </div>

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeFromWhishList(item)}
              className="mt-4 w-full py-2 rounded-lg
                         border border-red-200 text-red-600
                         hover:bg-red-50 hover:border-red-300
                         transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhishList;
