import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import PopupModal from "../../components/Modal.jsx";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [showVerifyModal, setShowVerifyModal] = React.useState(false);

  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await registerUser(
      data.firstName,
      data.lastName,
      data.email,
      data.password
    );
    setLoading(false);

    if (res.ok) {
      toast.success("Registration Successful!");
      setShowVerifyModal(true);
    } else {
      toast.error(res.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FAF8F6] px-4 ">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md my-10">
        
        <h1 className="text-3xl font-semibold text-center text-[#4F8C71] mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join the ShiCraft family
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="font-medium text-gray-700">First Name</label>
            <input
              {...register("firstName", { required: true })}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border rounded-full mt-2 focus:ring-2 focus:ring-[#4F8C71]"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                First name is required
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="font-medium text-gray-700">Last Name</label>
            <input
              {...register("lastName", { required: true })}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border rounded-full mt-2 focus:ring-2 focus:ring-[#4F8C71]"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                Last name is required
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-full mt-2 focus:ring-2 focus:ring-[#4F8C71]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid email address
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Create a password"
              className="w-full px-4 py-3 border rounded-full mt-2 focus:ring-2 focus:ring-[#4F8C71]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-[#4F8C71] text-white py-3 rounded-full text-lg transition
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#41785f]"}
            `}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#4F8C71] font-semibold">
            Login
          </Link>
        </p>
      </div>

      {/* ✅ Popup Modal */}
      <PopupModal
        open={showVerifyModal}
        onClose={() => {
          setShowVerifyModal(false);
          navigate("/account");
        }}
      >
        <h2 className="text-2xl font-semibold text-center text-[#4F8C71]">
          Verify Your Email
        </h2>

        <p className="text-gray-700 text-center mt-3 leading-relaxed">
          We’ve sent a verification email to your registered email address.
          Please click the verification link to activate your account.
        </p>

        <p className="text-gray-600 text-center mt-2 text-sm">
          Verifying your email ensures you never lose access to your account.
        </p>
      </PopupModal>
    </div>
  );
};

export default Register;
