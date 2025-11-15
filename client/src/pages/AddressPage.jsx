import { Link } from "react-router-dom";
import { Home, Pencil } from "lucide-react";
import { useShipping } from "../context/ShippingContext";

export default function AddressPage() {
  const { shipping, loading } = useShipping();

  // ✅ Skeleton Loader
  const Skeleton = () => (
    <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/5"></div>
      </div>
    </div>
  );

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Shipping Address
      </h1>

      {/* ✅ Loading State */}
      {loading ? (
        <Skeleton />
      ) : !shipping ? (
        // ✅ No address saved
        <div className="text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <p className="text-gray-600 mb-4">
            You haven't added a shipping address yet.
          </p>

          <Link
            to="/address/edit"
            className="px-6 py-3 bg-[#4F8C71] text-white rounded-full font-medium hover:opacity-90 transition inline-block"
          >
            Add Address
          </Link>
        </div>
      ) : (
        // ✅ Show saved address
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {/* Title Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Home size={22} className="text-[#4F8C71]" />
              <h2 className="text-lg font-semibold text-gray-800">
                Saved Address
              </h2>
            </div>

            <Link
              to="/address/edit"
              className="flex items-center gap-2 bg-[#f7dbe7] hover:bg-[#f3cadd] px-4 py-2 rounded-full text-gray-800 text-sm transition"
            >
              <Pencil size={16} />
              Edit
            </Link>
          </div>

          {/* ✅ Actual Shipping Details */}
          <div className="space-y-1 text-gray-700">
            <p className="font-medium text-gray-800">
              {shipping.firstName} {shipping.lastName}
            </p>

            <p>{shipping.houseNo}, {shipping.street}</p>

            {shipping.landmark && <p>{shipping.landmark}</p>}

            <p>{shipping.city}, {shipping.state}</p>
            <p>{shipping.country} - {shipping.pincode}</p>

            <p className="mt-2 font-medium">📞 {shipping.phone}</p>
          </div>
        </div>
      )}
    </section>
  );
}
