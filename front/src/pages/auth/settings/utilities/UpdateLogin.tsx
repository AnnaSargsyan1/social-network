import { useForm, type SubmitHandler } from "react-hook-form"
import type { IResponse, LoginUpdate } from "../../../../types.ts"
import { useState } from "react";
import { Axios } from "../../../../lib/api.ts";
import axios from "axios";

export const UpdateLogin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginUpdate>();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const onUpdateLogin: SubmitHandler<LoginUpdate> = data => {
        Axios
            .patch("/update/login", data)
            .then(() => {
                setError("");
                setSuccess("Login updated successfully");
                reset();
            })
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    const errorResponse = err.response?.data as IResponse;
                    setError(errorResponse.message);
                } 
            });
    }

    return <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Update Login</h2>
        {error && <p className="text-red-400 my-2">{error}</p>}
        {success && <p className="text-green-400 my-2">{success}</p>}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onUpdateLogin)}>
            <div>
                {errors.password && <p className="text-red-400 my-2">{errors.password.message}</p>}

                <input
                    {...register("password", {
                        required: "Password is required"
                    })}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                {errors.newLogin && <p className="text-red-400 my-2">{errors.newLogin.message}</p>}
                    
                <input
                    {...register("newLogin", {
                        required: "New login is required"
                    })}
                    type="text"
                    placeholder="New Login"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-[1.02] transition-transform"
            >
                Update Login
            </button>
        </form>
    </div>
    
  }
  