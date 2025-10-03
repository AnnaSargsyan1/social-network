import { type SubmitHandler, useForm } from "react-hook-form";
import { type IResponse, type IPost } from "../../../types";
import { useRef, useState } from "react";
import { Axios } from "../../../lib/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddPost = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IPost>();
    const picInput = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const onAdd: SubmitHandler<IPost> = data => {
        if (picInput.current?.files) {
            const file = picInput.current.files[0];

            const form = new FormData();
            form.append("photo", file);
            form.append("content", data.content);

            Axios
                .post<IResponse<IPost>>("/posts", form)
                .then(() => {
                    setError("");
                    reset();
                    if (picInput.current) {
                        picInput.current.value = "";
                    }
                    navigate("/profile");
                })
                .catch(err => {
                    if (axios.isAxiosError(err)) {
                        const errorResponse = err.response?.data as IResponse;
                        setError(errorResponse.message);
                    }
                });
        }
    }
    const handlePreview = () => {
        if (picInput.current?.files) {
            const file = picInput.current.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }
    return (
      <>
        <div className="min-h-screen text-center pt-6">
  
          <div className="min-h-screen flex flex-col items-center justify-center p-6">
            { error && <p className="text-red-400 my-2">{error}</p> }
            <form className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6" onSubmit={handleSubmit(onAdd)}>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Add Post</h2>
              {/* Title Input */}
              <div className="flex flex-col text-left">
                <label className="text-sm font-semibold text-gray-300 mb-2">
                  Title
                </label>
                { errors.content && <p className="text-red-400 my-2">{ errors.content.message }</p> }
                <input
                    {...register("content", {
                        required: "Title is required"
                    })}
                    type="text"
                    placeholder="Enter post title"
                    className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 
                             focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

                {/* Preview placeholder */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-32 h-32 rounded-lg border-4 border-gray-700 bg-gray-800 flex items-center justify-center text-gray-500 text-sm overflow-hidden shadow-md">
                        {preview ? (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full object-cover"
                        />
                        ) : (
                        "Preview"
                        )}
                    </div>

                    {/* Hidden input */}
                    <input
                        type="file"
                        className="hidden"
                        onChange={handlePreview}
                        ref={picInput}
                    />

                    {/* File input trigger */}
                    <button
                        onClick={() => picInput.current?.click()}
                        type="button"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:scale-[1.02] transition-transform"
                    >
                        Choose Picture
                    </button>
                </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 
                           text-white font-bold shadow-md hover:scale-105 transition-transform"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };
  