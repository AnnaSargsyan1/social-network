import { type SubmitHandler, useForm } from "react-hook-form";
import { IResponse, PasswordUpdate } from "../../../../types.ts";
import { Axios } from "../../../../lib/api.ts";
import { useState } from "react";
import axios from "axios";

export const UpdatePassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordUpdate>();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const onUpdatePassword: SubmitHandler<PasswordUpdate> = data => {
        Axios
            .patch("/update/password", data)
            .then(() => {
                setError("");
                reset();
                setSuccess("Password updated successfully");
            })
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    const errorResponse = err.response?.data as IResponse;
                    setError(errorResponse.message);
                }
            });
    }
    return (
      <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Update Password</h2>
        { error && <p className="text-red-400 my-2">{error}</p>}
        { success && <p className="text-green-400 my-2">{success}</p>}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onUpdatePassword)}>
            <div>
                { errors.oldPassword && <p className="text-red-400 my-2">{errors.oldPassword.message}</p>}
                <input
                    {...register("oldPassword", {
                        required: "Old password is required"
                    })}
                    type="password"
                    placeholder="Old Password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                { errors.newPassword && <p className="text-red-400 my-2">{errors.newPassword.message}</p>}
                <input
                    {...register("newPassword", {
                        required: "New password is required"
                    })}
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>
    
            <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow hover:scale-[1.02] transition-transform"
            >
                Update Password
            </button>
        </form>
      </div>
    )
  }
  