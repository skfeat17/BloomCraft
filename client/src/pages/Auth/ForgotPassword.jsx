
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("Reset request for:", data.email);
    // TODO: API call → /auth/send-reset
    setTimeout(() => {
      navigate("/reset-password");
      
    }, 500);
  };

  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Forgot Password
      </h1>

      <p className="text-gray-600 text-center mb-8">
        Enter your email address and we'll send you an OTP to reset your password.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5"
      >
        {/* Email */}
        <div>
          <label className="text-gray-700 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 
            focus:ring-2 focus:ring-[#4F8C71] focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-[#4F8C71] text-white font-medium hover:opacity-90 transition"
        >
          Send Reset OTP
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Remember your password?{" "}
        <Link to="/login" className="text-[#4F8C71] font-medium hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
}
