import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser} = useAuth();
 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await loginUser(data.email, data.password);
    setLoading(false);
    if (res.ok) {
      toast.success("Login successful!");
      
    const redirectTo = location.state?.from || "/account";

    navigate(redirectTo, { replace: true });
    } else {
      toast.error(res.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FAF8F6] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-[#4F8C71] mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Login to your ShiCraft account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-full mt-2 focus:ring-2 focus:ring-[#4F8C71] outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-full mt-2 focus:ring-2 focus:ring-[#4F8C71] outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-[#4F8C71] font-medium hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register redirect */}
        <p className="text-center text-gray-700 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#4F8C71] font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
