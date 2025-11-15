import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShipping } from "../context/ShippingContext";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function EditAddressPage() {
  const navigate = useNavigate();
  const { shipping, loading, addShipping, updateShipping } = useShipping();

  const [saving, setSaving] = useState(false);

  // ✅ Prepare default form values
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });

  // ✅ Set form values when shipping is fetched
  useEffect(() => {
    if (shipping) {
      reset({
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        phone: shipping.phone,
        houseNo: shipping.houseNo,
        street: shipping.street,
        landmark: shipping.landmark || "",
        city: shipping.city,
        state: shipping.state,
        country: shipping.country,
        pincode: shipping.pincode,
      });
    }
  }, [shipping, reset]);

  // ✅ Saving Logic
  const onSubmit = async (data) => {
    setSaving(true);

    const payload = {
      ...data,
      address: `${data.houseNo}, ${data.street}, ${data.city}`,
    };

    let res;

    if (shipping) {
      res = await updateShipping(payload);
    } else {
      res = await addShipping(payload);
    }

    setSaving(false);

    if (res.ok) {
      toast.success("Address saved successfully!");
      navigate("/address");
    } else {
      toast.error(res?.message || "Something went wrong");
    }
  };

  // ✅ Skeleton Loader
  const FormSkeleton = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <section className="max-w-xl mx-auto px-6 py-10">
      {/* Back Button */}
      <Link
        to="/address"
        className="flex items-center gap-2 text-gray-600 hover:text-[#4F8C71] mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {shipping ? "Edit Shipping Address" : "Add Shipping Address"}
      </h1>

      {loading ? (
        <FormSkeleton />
      ) : (
        <>
          {/* ✅ Actual Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5"
          >
            {/* FIRST NAME */}
            <div>
              <label className="text-gray-700 font-medium">First Name</label>
              <input
                {...register("firstName")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="text-gray-700 font-medium">Last Name</label>
              <input
                {...register("lastName")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-gray-700 font-medium">Phone</label>
              <input
                {...register("phone")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* HOUSE NO */}
            <div>
              <label className="text-gray-700 font-medium">House / Flat No</label>
              <input
                {...register("houseNo")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* STREET */}
            <div>
              <label className="text-gray-700 font-medium">Street</label>
              <input
                {...register("street")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* LANDMARK */}
            <div>
              <label className="text-gray-700 font-medium">Landmark (Optional)</label>
              <input
                {...register("landmark")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
              />
            </div>

            {/* CITY */}
            <div>
              <label className="text-gray-700 font-medium">City</label>
              <input
                {...register("city")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* STATE */}
            <div>
              <label className="text-gray-700 font-medium">State</label>
              <input
                {...register("state")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* COUNTRY */}
            <div>
              <label className="text-gray-700 font-medium">Country</label>
              <input
                {...register("country")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* PINCODE */}
            <div>
              <label className="text-gray-700 font-medium">Pincode</label>
              <input
                {...register("pincode")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4F8C71]"
                required
              />
            </div>

            {/* ✅ Button With Saving State */}
            <button
              type="submit"
              disabled={saving}
              className={`w-full mt-3 py-3 rounded-full text-white font-medium transition
                ${saving ? "bg-[#3e6c58] opacity-70 cursor-not-allowed" : "bg-[#4F8C71] hover:opacity-90"}
              `}
            >
              {saving ? "Saving..." : "Save Address"}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
