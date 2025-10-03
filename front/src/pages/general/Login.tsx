import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { AuthUser, IResponse } from "../../types.ts";
import { Axios } from "../../lib/api.ts";
import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthUser>()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin: SubmitHandler<AuthUser> = (data) => {
    Axios
      .post("/login", data)
      .then(() => {
        navigate("/profile")
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const responseError = error.response?.data as IResponse
          setError(responseError.message)
        }
      })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          Welcome Back
        </h1>
        {error && <p className="text-red-400 my-2">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Login */}
          <div>
            {errors.login && <p className="text-red-400 my-2">{errors.login.message}</p>}
            <label className="block text-gray-300 text-sm mb-2">Login</label>
            <input
              {...register("login", { required: "Please fill your login" })}
              type="text"
              placeholder="Enter your login"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            {errors.password && <p className="text-red-400 my-2">{errors.password.message}</p>}
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              {...register("password", { required: "please fill your password" })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-transform"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};
