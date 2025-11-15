import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Package } from "lucide-react";
import { getAllOrdersHandler } from "../api/order";

export default function OrdersListPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await getAllOrdersHandler();

            if (res?.data?.orders) {
                setOrders(res.data.orders.reverse());
            }

            setLoading(false);
        })();
    }, []);

    /* Status Badge Colors */
    const getStatusColor = (status) => {
        switch (status) {
            case "Ordered":
                return "bg-yellow-100 text-yellow-700";
            case "Shipped":
                return "bg-blue-100 text-blue-700";
            case "Delivered":
                return "bg-green-100 text-green-700";
            case "Cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    /* Skeleton Loader */
 const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm animate-pulse flex items-center justify-between">
        
        {/* LEFT SIDE */}
        <div className="flex items-start gap-4">
            
            {/* Icon box skeleton */}
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>

            {/* Text skeleton */}
            <div className="flex flex-col gap-3">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>

                <div className="flex gap-2">
                    <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                </div>
            </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-end gap-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded-full w-24"></div>
        </div>
    </div>
);

    return (
        <section className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                My Orders
            </h1>

            {/* Loading State */}
            {loading ? (
                <div className="space-y-5">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : orders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
            ) : (
                <div className="space-y-5">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                            {/* LEFT SIDE */}
                            <div className="flex items-start gap-4">
                                {/* Order Icon */}
                                <div className="p-3 bg-[#4F8C71]/10 rounded-xl">
                                    <Package size={28} className="text-[#4F8C71]" />
                                </div>

                                {/* Text Info */}
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Order #{order._id.slice(-6)}
                                    </h3>

                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Calendar size={16} />
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                order.orderStatus
                                            )}`}
                                        >
                                            {order.orderStatus}
                                        </span>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                order.paymentStatus === "Paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex flex-col md:items-end gap-2">
                                <p className="text-gray-700 font-medium text-lg">
                                    RM {order.totalAmount}
                                </p>

                                <Link
                                    to={`/order/${order._id}`}
                                    className="flex items-center gap-2 bg-[#4F8C71] text-white px-4 py-2 rounded-full hover:opacity-90 transition text-sm w-fit"
                                >
                                    View Details
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
