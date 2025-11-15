import { Link } from "react-router-dom";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

export default function ProductCard({ item }) {
  const { loading } = useProducts();
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);

  const isInCart = cartItems.some((cartItem) => cartItem._id === item._id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(item);
      setAdded(true);
    }
  };

  // ✅ Skeleton Loader
  if (loading) {
    return (
      <div className="border-sm rounded-xl overflow-hidden shadow-sm bg-white animate-pulse flex flex-col">
        <div className="w-full h-56 bg-gray-300"></div>
        <div className="p-4 flex flex-col flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-300 rounded-full w-full mt-auto"></div>
        </div>
      </div>
    );
  }

  // ✅ Normal Product Card
  return (
    <div className="border-sm rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition flex flex-col">
      {/* Image */}
      <Link to={`/product/${item._id}`}>
        <div className="w-full h-56 overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <Link
          to={`/product/${item._id}`}
          className="text-lg font-semibold hover:text-[#4F8C71] transition line-clamp-1"
        >
          {item.title}
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-1 line-clamp-2 min-h-[42px]">
          {item.description}
        </p>

        {/* Price */}
        <p className="text-xl font-semibold mt-3">RM {item.price}</p>

        {/* Add to Cart */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isInCart || added}
            className={`cursor-pointer w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-full transition ${
              isInCart || added
                ? "text-white"
                : "bg-[#f7dbe7] hover:bg-[#f3cadd] text-gray-800"
            }`}
            style={{
              backgroundColor: isInCart || added ? "#4F8C71" : undefined,
            }}
          >
            {isInCart || added ? (
              <>
                <CheckCircle size={18} />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
