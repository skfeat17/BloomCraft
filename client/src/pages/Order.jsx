import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MessageCircle, Truck, ArrowLeft, Check, ArrowRight } from "lucide-react";
import { getSingleOrderHandler } from "../api/order";
import { phone } from "../utils/WhatsAppContact";
export default function OrderDetailsPage() {

    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ✅ Fetch order */
    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await getSingleOrderHandler(id);

            if (res?.data) setOrder(res.data);

            setLoading(false);
        })();
    }, [id]);

    /* ✅ Skeleton Loader */
    const Skeleton = () => (
        <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-36"></div>
            <div className="h-6 bg-gray-200 rounded w-52"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
            </div>
        </div>
    );

    if (loading || !order) {
        return (
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
                <Skeleton />
            </section>
        );
    }

    /* ✅ Steps System */
    const steps = [
        { label: "Processing", value: "Processing" },
        { label: "Ordered", value: "Ordered" },
        { label: "Shipped", value: "Shipped" },
        { label: "Delivered", value: "Delivered" }
    ];

    const currentStep = steps.findIndex((s) => s.value === order.orderStatus);
    const itemsList = order.items
        .map((item, index) => `${index + 1}) ${item.productId.title}`)
        .join("%0A");
    const whatsappMessage =
        `Hi%0A%0A` +
        `I want to order:%0A%0A` +
        `${itemsList}%0A%0A` +
        `User ID: ${order.userId}`;        ;

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

            {/* Back Button */}
            <Link
                to="/orders"
                className="flex items-center gap-2 text-gray-600 hover:text-[#4F8C71] mb-6"
            >
                <ArrowLeft size={18} />
                Back to Orders
            </Link>

            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Order #{order._id.slice(-6)}
            </h1>

            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 font-medium">
                    {order.orderStatus}
                </span>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                >
                    Payment: {order.paymentStatus}
                </span>
            </div>
{/* SUCCESS ALERT */}
{order.paymentStatus === "Paid" && order.orderStatus==="Ordered"&& (
    <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700 font-medium text-center">
        ✅ Payment received! Your order is confirmed.  
        We are currently crafting your order.
    </div>
)}
{order.orderStatus === "Shipped" && (
  <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700 font-medium text-center">
      🚚 Great news! Your order has been shipped.  
      It’s on its way and will reach you soon.
  </div>
)}

{order.orderStatus === "Delivered" && (
  <div className="mb-6 p-4 rounded-lg bg-blue-100 border border-blue-400 text-blue-700 font-medium text-center">
      🎉 Your order has been delivered!  
      We hope you love your purchase. Thank you for choosing us!
  </div>
)}


    {order.paymentStatus !== "Paid" && (
        <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700 font-medium text-center">
            🚨 Your order hasn’t been confirmed yet.  
            Please complete your payment using the contact button below.
        </div>
    )}


            {/* Progress Tracker */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Status</h3>

                <div className="flex items-center justify-between">
                    {steps.map((step, index) => {
                        const isCompleted = index <= currentStep;
                        return (
                            <div key={step.value} className="flex items-center flex-1">
                                <div className="flex flex-col items-center text-center w-full">
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${isCompleted
                                                ? "bg-[#4F8C71] border-[#4F8C71] text-white"
                                                : "bg-gray-200 border-gray-400 text-gray-600"
                                            }`}
                                    >
                                        {isCompleted ? <Check size={18} /> : index + 1}
                                    </div>
                                    <p className="mt-2 text-xs sm:text-sm text-gray-700">
                                        {step.label}
                                    </p>
                                </div>

                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 mx-2 ${index < currentStep ? "bg-[#4F8C71]" : "bg-gray-300"
                                            }`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Shipping + Items Grid */}
            <div className="grid md:grid-cols-2 gap-8">

                {/* Shipping */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Truck size={20} className="text-[#4F8C71]" /> Shipping Details
                    </h2>

                    <p className="font-medium text-gray-800">
                        {order.shippingDetails.firstName} {order.shippingDetails.lastName}
                    </p>
                    <p className="text-gray-600 mt-1">{order.shippingDetails.address}</p>
                    <p className="text-gray-600">
                        {order.shippingDetails.city}, {order.shippingDetails.state}
                    </p>
                    <p className="text-gray-600">
                        {order.shippingDetails.country} - {order.shippingDetails.pincode}
                    </p>
                    <p className="text-gray-700 mt-2">📞 {order.shippingDetails.phone}</p>
                </div>

                {/* Items */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>

                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-4 border border-gray-200 rounded-xl p-3"
                            >
                                <img
                                    src={item.productId.images[0]}
                                    className="w-16 h-16 rounded-xl object-cover"
                                />

                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">
                                        {item.productId.title}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        RM {item.productId.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between font-semibold text-gray-700 text-lg">
                        <span>Total</span>
                        <span>RM {order.totalAmount}</span>
                    </div>
                </div>
            </div>

            {/* WhatsApp CTA */}
            {order.orderStatus === "Processing" && (
                <a
                    href={`https://wa.me/${phone}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 w-full md:w-auto py-3 px-6 flex items-center justify-center gap-2 rounded-full bg-[#4F8C71] text-white font-medium hover:opacity-90 transition mx-auto block"
                >
                    <MessageCircle size={20} />
                    Confirm Order on WhatsApp
                </a>
            )}

        </section>
    );
}
