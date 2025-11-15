import { get, set, useForm } from "react-hook-form";
import { getName } from "country-list";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShipping } from "../context/ShippingContext";
import toast from "react-hot-toast";
import detectCountryByIP from "../utils/getCountry";
import { useEffect, useState } from "react";
export default function AddAddressPage() {
  const navigate = useNavigate();
  const { addShipping, loading } = useShipping();
  const { register, handleSubmit } = useForm();


  const onSubmit = (data) => {
    console.log("✅ Address Submitted:", data);


    const [firstName, ...rest] = data.name.split(" ");
    const lastName = rest.join(" ") || "";


    const formattedData = {
      firstName,
      lastName,
      phone: data.phone,
      houseNo: data.houseNo,
      street: data.street,
      landmark: data.landmark || "",
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode
    };

    console.log("✅ Formatted For Handler:", formattedData);

    // Send to shipping context
    addShipping(formattedData);
    toast.success("Address added successfully!");
    navigate("/address");
  };


  return (
    <section className="max-w-xl mx-auto px-6 py-10">

      {/* Back Button */}
      <Link
        onClick={() => { navigate(-1) }}
        className="flex items-center gap-2 text-gray-600 hover:text-[#4F8C71] mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Shipping Address
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5"
      >
        {/* FULL NAME */}
        <div>
          <label className="text-gray-700 font-medium">Full Name</label>
          <input
            {...register("name")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-gray-700 font-medium">Phone</label>
          <input
            {...register("phone")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div>

        {/* HOUSE NO */}
        <div>
          <label className="text-gray-700 font-medium">House / Flat No</label>
          <input
            {...register("houseNo")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div>

        {/* STREET */}
        <div>
          <label className="text-gray-700 font-medium">Street</label>
          <input
            {...register("street")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div>

        {/* LANDMARK */}
        <div>
          <label className="text-gray-700 font-medium">Landmark (Optional)</label>
          <input
            {...register("landmark")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
          />
        </div>

        {/* CITY */}
        <div>
          <label className="text-gray-700 font-medium">City</label>
          <input
            {...register("city")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div>

        {/* STATE */}
        <div>
          <label className="text-gray-700 font-medium">State</label>
          <input
            {...register("state")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div>

        {/* COUNTRY */}
        {/* <div>
          <label className="text-gray-700 font-medium">Country</label>
          <input
            {...register("country")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div> */}

        {/* PINCODE */}
        <div>
          <label className="text-gray-700 font-medium">Pincode</label>
          <input
            {...register("pincode")}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-3 py-3 rounded-full text-white font-medium transition
                ${loading ? "bg-[#3e6c58] opacity-70 cursor-not-allowed" : "bg-[#4F8C71] hover:opacity-90"}
              `}
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </form>
    </section>
  );
}
