import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useShipping } from "../context/ShippingContext"
export default function CartPage() {
  const { shipping } = useShipping();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const handleRedirect = () => {
    if (isAuthenticated && shipping) {
      return "/checkout";
    } else if (isAuthenticated && !shipping) {
      return "/address/add";
    } else {
      return "/login";
    }
  }
    return (
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">

            {/* ✅ LEFT SIDE (2 columns) */}
            <div className="md:col-span-2 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  {/* LEFT SIDE ITEM INFO */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm">RM {item.price}</p>
                    </div>
                  </div>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* ✅ RIGHT SIDE SUMMARY */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>RM {subtotal}</span>
              </div>

              <hr className="my-4 border-gray-200" />

              {/* ✅ Proceed to Checkout */}
              <Link
                to={handleRedirect()}
                className="block text-center bg-[#4F8C71] text-white py-3 rounded-full font-medium hover:opacity-90 transition"
              >
                Proceed to Checkout
              </Link>

              {/* ✅ Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full mt-3 text-center border border-gray-300 text-gray-600 py-3 rounded-full font-medium hover:bg-gray-100 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </section>
    );
  };

