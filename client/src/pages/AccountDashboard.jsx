import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, MapPin, ShoppingBag, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../api/auth.js";
export default function AccountDashboard() {
    const navigate = useNavigate();
    const { currentUser, loading,logoutUser } = useAuth();
    const [user, setUser] = useState({});
    const logoutHandler = async () => {
        navigate("/");
        const res = await logoutUser();
        console.log("LOGOUT RESPONSE",res);
        if (res?.ok) {
            toast.success("Logged out successfully!");
        } else {
            toast.error(res?.message || "Logout failed. Please try again.");
        }
    };
    // Simulate 2 seconds loading
    useEffect(() => {
        console.log("Fetching current user data...", currentUser());
        (async () => {
            const data = await currentUser();
            setUser(data.data);
        })();
    }, []);

    // ✅ Skeleton shared class
    const skeleton = "animate-pulse bg-gray-200 rounded-md";

    return (
        <section className="max-w-4xl mx-auto px-6 py-10">

            {/* Heading */}
            {loading ? (
                <div className={`${skeleton} h-8 w-40 mb-6`}></div>
            ) : (
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    My Account
                </h1>
            )}

            {/* Profile Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                {/* Title */}
                {loading ? (
                    <div className={`${skeleton} h-6 w-56 mb-6`}></div>
                ) : (
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                        <User size={22} className="text-[#4F8C71]" />
                        Account Overview
                    </h2>
                )}

                <div className="space-y-4">

                    {/* Full Name */}
                    {loading ? (
                        <div>
                            <div className={`${skeleton} h-3 w-24 mb-2`}></div>
                            <div className={`${skeleton} h-5 w-40`}></div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-xs uppercase text-gray-400 tracking-wider">
                                Full Name
                            </p>
                            <p className="text-gray-700 font-medium text-lg">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                    )}

                    {/* Email */}
                    {loading ? (
                        <div>
                            <div className={`${skeleton} h-3 w-20 mb-2`}></div>
                            <div className={`${skeleton} h-5 w-60`}></div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-xs uppercase text-gray-400 tracking-wider">
                                Email
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-gray-700">{user.email}</p>

                                {user.verified ? (
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                                        ✓ Verified
                                    </span>
                                ) : (
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600 flex items-center gap-1">
                                        ✕ Not Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Member Since */}
                    {loading ? (
                        <div>
                            <div className={`${skeleton} h-3 w-28 mb-2`}></div>
                            <div className={`${skeleton} h-5 w-24`}></div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-xs uppercase text-gray-400 tracking-wider">
                                Member Since
                            </p>
                            <p className="text-gray-700">
                                {user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })
                                    : "2025"}
                            </p>

                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* If loading, show skeleton boxes */}
                {loading ? (
                    Array(3)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
                            >
                                <div className={`${skeleton} h-12 w-12 rounded-full mb-4`}></div>
                                <div className={`${skeleton} h-5 w-32 mb-2`}></div>
                                <div className={`${skeleton} h-4 w-48`}></div>
                            </div>
                        ))
                ) : (
                    <>
                        {/* Orders */}
                        <Link
                            to="/orders"
                            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#f1faf6] flex items-center justify-center">
                                <ShoppingBag size={22} className="text-[#4F8C71]" />
                            </div>
                            <div>
                                <p className="text-gray-800 font-semibold">Your Orders</p>
                                <p className="text-gray-500 text-sm">View all your past orders</p>
                            </div>
                        </Link>

                        {/* Address */}
                        <Link
                            to="/address"
                            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#fdf2f7] flex items-center justify-center">
                                <MapPin size={22} className="text-[#d66fa6]" />
                            </div>
                            <div>
                                <p className="text-gray-800 font-semibold">Manage Address</p>
                                <p className="text-gray-500 text-sm">Add or update shipping address</p>
                            </div>
                        </Link>

                        {/* Logout */}
                        <button
                            onClick={logoutHandler}
                            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition text-left w-full"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#fff4f4] flex items-center justify-center">
                                <LogOut size={22} className="text-red-500" />
                            </div>
                            <div>
                                <p className="text-gray-800 font-semibold">Logout</p>
                                <p className="text-gray-500 text-sm">Sign out of your account</p>
                            </div>
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}
