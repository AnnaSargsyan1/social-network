import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IResponse, NewUser } from "../../types.ts";
import { Axios } from "../../lib/api.ts";
import axios from "axios";
import { useState } from "react";

export const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<NewUser>()
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSignup: SubmitHandler<NewUser> = data => {
        Axios
            .post("/signup", data)
            .then(() => {
                navigate("/login")
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    const errorResp = error.response?.data as IResponse
                    setError(errorResp.message)
                }
            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
            <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
                    Create an Account 
                </h1>
                {error && <p className="text-red-400 my-2">{error}</p>}
                <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
                    {/* Name */}
                    <div>
                        {errors.name && <p className="text-red-400">{errors.name.message}</p>}

                        <label className="block text-gray-300 text-sm mb-2">Name</label>
                        <input
                            {...register("name", { required: "Please fill the name" })}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Surname */}
                    <div>
                        {errors.surname && <p className="text-red-400">{errors.surname.message}</p>}

                        <label className="block text-gray-300 text-sm mb-2">Surname</label>
                        <input
                            {...register("surname", { required: "Please fill your surname" })}
                            type="text"
                            placeholder="Enter your surname"
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Login */}
                    <div>
                        {errors.login && <p className="text-red-400">{errors.login.message}</p>}

                        <label className="block text-gray-300 text-sm mb-2">Login</label>
                        <input
                            {...register("login", { required: "Please fill your login" })}
                            type="text"
                            placeholder="Choose a login"
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                        <label className="block text-gray-300 text-sm mb-2">Password</label>
                        <input
                            {...register("password", { required: "Please fill your password", minLength: { value: 8, message: "Password is too short" } })}

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
                        Sign Up
                    </button>
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};
