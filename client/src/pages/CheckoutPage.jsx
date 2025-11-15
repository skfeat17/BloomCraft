import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupModal from "../components/Modal";
import { MessageCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useShipping } from "../context/ShippingContext.jsx";
import { useCart } from "../context/CartContext.jsx";     // ⭐ IMPORT CART CONTEXT
import { createOrderHandler } from "../api/order.js";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { shipping } = useShipping();
  const { cartItems } = useCart();                         // ⭐ REAL CART ITEMS
  const userId = user?._id;
  
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // const handlePlaceOrder = () => setOpen(true);
  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
         items: cartItems.map(item => ({ productId: item._id, quantity: 1 })),
         shippingDetails: shipping._id
      }

      const response = await createOrderHandler(orderData);
      setLoading(false);
      console.log("Order Created:", response);
      setOpen(true);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  }  

  const userIdMessage = userId || "Unknown User";

  // ⭐ Convert cart items to WhatsApp format
  const itemsList = cartItems
    .map((item, index) => `${index + 1}) ${item.title}`)
    .join("%0A");

  const whatsappMessage =
    `Hi%0A%0A` +
    `I want to order:%0A%0A` +
    `${itemsList}%0A%0A` +
    `User ID: ${userIdMessage}`;

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT: SHIPPING DETAILS */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-gray-600">
              {shipping ? (
                <div className="space-y-2 text-gray-700">
                  <p><b>Name:</b> {shipping.firstName} {shipping.lastName}</p>
                  <p><b>Phone:</b> {shipping.phone}</p>

                  <p>
                    <b>Address:</b><br />
                    {shipping.houseNo}, {shipping.street}<br />
                    {shipping.landmark && `${shipping.landmark},`}<br />
                    {shipping.city} - {shipping.pincode}<br />
                    {shipping.state}, {shipping.country}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No shipping details saved yet.
                </p>
              )}
            </div>

            <button
              onClick={() => navigate("/add-address")}
              className="mt-4 text-[#4F8C71] font-medium hover:underline"
            >
              Edit Shipping Details
            </button>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Your Order</h2>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">{item.title}</h3>
                    <p className="text-gray-500 text-sm">RM {item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between text-lg font-medium text-gray-700">
                <span>Total</span>
                <span>RM {total}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="block w-full text-center bg-[#4F8C71] text-white mt-8 py-3 rounded-full font-medium hover:opacity-90 transition"
            >
             {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </section>

      {/* POPUP MODAL */}
      <PopupModal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
          Confirm Your Order
        </h2>

        <p className="text-gray-600 text-center leading-relaxed">
          To confirm your order and complete payment, please contact us on WhatsApp.
          Your order has been created with status <b>Pending</b>.
        </p>

        <a
          href={`https://wa.me/60123456789?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => navigate("/order-success/12345")}
          className="flex items-center justify-center gap-2 mt-6 w-full py-3 rounded-full bg-[#4F8C71] text-white font-medium hover:opacity-90 text-center transition"
        >
          <MessageCircle size={20} />
          Contact on WhatsApp
        </a>
      </PopupModal>
    </>
  );
}
