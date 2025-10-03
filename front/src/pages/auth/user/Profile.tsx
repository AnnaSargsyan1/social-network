import { useOutletContext } from "react-router-dom";
import { IContext, IPost } from "../../../types.ts";
import { Image } from "../../../lib/helpers/Image.tsx";
import { ProfilePosts } from "../posts/ProfilePosts.tsx";
import { useState } from "react";
import { Loader } from "../../../lib/helpers/Loader.tsx";
import { Stats } from "./Stats.tsx";
import { useHttp } from "../../../lib/hooks/useHttp.ts";
import { AddPost } from "../posts/AddPost";

export const Profile = () => {
  const { account } = useOutletContext<IContext>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, data: posts, error, refetch } = useHttp<IPost[]>("/posts", {
    method: "GET",
  });

  return (
    account && (
      <div className="min-h-screen text-white">
        {/* Cover Banner */}
        <div className="relative w-full h-56">
          {account.cover ? (
            <>
              <Image
                src={account.cover}
                alt="Cover"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-900 to-indigo-900" />
          )}
        </div>

        {/* Profile Section */}
        <div className="max-w-5xl mx-auto px-6 -translate-y-12">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between bg-gray-900/40 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-gray-800">
            {/* Left Side - Profile Info */}
            <div className="flex items-center space-x-6">
              <Image
                src={account.picture}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-lg object-cover bg-gray-700"
              />
              <div className="text-left">
                <h2 className="text-3xl font-bold">
                  {account.name} {account.surname}
                </h2>
                <p className="text-gray-400 text-sm mt-1">Welcome back 👋</p>
              </div>
            </div>

            {/* Right Side - Stats + Add Post */}
            <div className="flex flex-col items-end space-y-3 mt-6 md:mt-0">
              <Stats
                postsLength={posts?.length ?? 0}
                followers={account.followers ?? []}
                following={account.following ?? []}
                className="flex space-x-6 text-gray-300"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold text-sm hover:scale-105 transition-transform shadow-md"
              >
                + Add Post
              </button>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="max-w-5xl mx-auto px-6 mt-10">
          {loading && <Loader />}
          {error ? (
            <p className="text-red-400 my-2">{error}</p>
          ) : (
            posts && <ProfilePosts posts={posts} />
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <AddPost
            handleOpenModal={setIsModalOpen}
            handleRefetch={() => refetch()}
          />
        )}
      </div>
    )
  );
};
