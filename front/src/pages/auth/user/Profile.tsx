import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { IContext } from "../../../types.ts";
import { Axios } from "../../../lib/api.ts";
import { Image } from "../../../lib/helpers/Image.tsx";
import { Posts } from "../posts/ProfilePosts.tsx";
import { useEffect, useState } from "react";
import type { IResponse, IPost } from "../../../types.ts";
import axios from "axios";
import { Loader } from "../../../lib/helpers/Loader.tsx";
import { Stats } from "./Stats.tsx";

export const Profile = () => {
  const { account, setAccount } = useOutletContext<IContext>();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleLogout = () => {
    Axios.post("/logout").then(() => navigate("/login"));
  };
  useEffect(() => {
    Axios.get<IResponse<IPost[]>>("/posts")
      .then(response => {
        setAccount({...account, posts: response.data.payload});
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        if (axios.isAxiosError(err)) {
          const errorResponse = err.response?.data as IResponse;
          setError(errorResponse.message);
          console.error(errorResponse.message);
        }
      })
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Cover Banner */}
      <div className="relative w-full h-60">
        {account.cover ? (
          <>
            <Image
              src={account.cover}
              alt="Cover"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-900 to-indigo-900" />
        )}
      </div>



      {/* Profile Section */}
      <div className="flex flex-col items-center px-4 max-w-4xl mx-auto -translate-y-16">
        {/* Profile Picture */}
        <Image
          src={account.picture}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-lg object-cover bg-gray-700"
        />

        {/* Name */}
        <h2 className="mt-4 text-3xl font-extrabold tracking-wide">
          {account.name} {account.surname}
        </h2>
        <p className="text-gray-400 text-sm italic">Welcome back 👋</p>

        {/* Stats Row */}
        <Stats 
          postsLength={account.posts?.length ?? 0}
          followers={account.followers ?? []}  
          following={account.following ?? []}  
          className="mt-6 flex space-x-12 text-gray-300"
        />

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <Link
            to="/profile/settings"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:scale-[1.05] transition-transform"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 font-semibold border border-gray-700 hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Bio Section */}
        {/* <div className="mt-10 w-full bg-gray-800/60 rounded-xl shadow-lg p-6 text-left">
          <h3 className="text-lg font-bold mb-2">Bio</h3>
          <p className="text-gray-300 text-sm">
            This is your personal space. Share a little about yourself,
            interests, or anything that defines you.
          </p>
        </div> */}
        
        { isLoading &&  <Loader />}
        { error 
          ?
            <p className="text-red-400 my-2">{error}</p>
          : 
            <Posts posts={account.posts} />
        }
      </div>
    </div>
  );
};
