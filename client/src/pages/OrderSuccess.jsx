import { CheckCircle2, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function OrderSuccessPage() {
    const { id } = useParams(); // get order ID from URL

    return (
        <section className="max-w-xl mx-auto px-6 py-20 text-center">

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
                <CheckCircle2 size={140} className="text-[#4F8C71]" />
            </div>

            <h1 className="text-3xl font-semibold text-gray-800">
                Order Placed Successfully!
            </h1>

            <p className="text-gray-600 mt-3 leading-relaxed">
                Thank you for shopping with <span className="font-medium">ShiCraft</span>.
                Your order has been created with <b>Pending</b> status.
                Once you complete the payment, your order will be <b>confirmed</b>.
            </p>
            {/* Highlight Notice */}
            <div className="mt-4 bg-[#fff4fa] border border-pink-200 text-gray-700 p-4 rounded-xl text-sm space-y-2">
                <p>✅ Please confirm your order manually by contacting us on WhatsApp.</p>
                <p>⏳ If you already paid, it may take a few minutes for your order status to update in your account.</p>
            </div>


            {/* ORDER ID */}
            <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <p className="text-gray-500 text-sm">Order ID</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                    #{id}
                </p>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4">

                {/* ✅ Confirm Order on WhatsApp Button */}
                  <Link
                    to={`/orders/${id}`}
                    className="w-full py-3 rounded-full bg-[#4F8C71] text-white font-medium hover:opacity-90 transition"
                >
                    Go to Orders to Confirm
                </Link>

                {/* Continue Shopping */}
                <Link
                    to="/shop"
                    className="w-full py-3 rounded-full bg-[#4F8C71] text-white font-medium hover:opacity-90 transition"
                >
                    Continue Shopping
                </Link>

                {/* View Order */}
                <Link
                    to={`/order/${id}`}
                    className="w-full py-3 rounded-full bg-[#f7dbe7] text-gray-800 font-medium hover:bg-[#f3cadd] transition"
                >
                    View Your Order
                </Link>

            </div>
        </section>
    );
}
