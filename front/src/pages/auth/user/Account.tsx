import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../lib/api";
import { FaLock } from "react-icons/fa";
import { IAccount, IResponse } from "../../../types";
import { Image } from "../../../lib/helpers/Image";
import { Stats } from "./Stats";
import { useHttp } from "../../../lib/hooks/useHttp";
import axios from "axios";

export const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, data: account, error, refetch } = useHttp<IAccount>("/account/" + id, { method: "GET"});

  useEffect(() => {
    console.log(account);
    if (!loading && !account) {
      navigate("/profile");
    }
  }, [loading, account, navigate]);

  const handleFollowToggle = () => {
    if (!account) return;
    Axios
      .post<IResponse<IAccount>>(`/account/follow/${id}`)
      .then(() => {
        refetch();
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          const errorResponse = error.response?.data as IResponse;
          console.error(errorResponse.message);
        }
      })
  };

  if (!account) return null;

  return (
    <div className="min-h-screen text-white">
      {/* Cover Section */}
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

      {/* Profile Content */}
      <div className="relative px-6">
        <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-6 -translate-y-16">

          {/* Avatar */}
          <div className="flex flex-col items-center">
            <Image
              src={account.picture}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-gray-800 shadow-lg object-cover"
            />

            {/* Name */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-wide">
              {account.name} {account.surname}
            </h2>
            { account.login && !account.isPrivate && <p className="text-gray-400 text-sm my-2">@{account.login}</p>}

            {/* Follow Button */}
            <button
              onClick={handleFollowToggle}
              disabled={loading}
              className={`
                mt-6 px-8 py-2 rounded-full font-semibold text-sm
                transition-all duration-300 shadow-md
                ${account.connection.following || (account.isPrivate && account.connection?.requested)
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white"}
                ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {loading
                ? "Loading..."
                : account.connection.following ? 
                "Unfollow" 
                : account.isPrivate ? account.connection.requested ? "Cancel Request" :  "Request" : "Follow"
              }
            </button>


            {/* Private Account Notice */}
            {/* {account.isPrivate && (
              <div className="mt-3 text-red-400 text-sm italic">
                This account is private.
              </div>
            )} */}
          </div>

          {/* Stats */}
          <Stats 
            postsLength={account.posts?.length ?? 0}
            followers={account.followers ?? []}  
            following={account.following ?? []}  
            isPrivate={account.isPrivate}
            className="mt-8 flex justify-around border-t border-gray-700 pt-6 text-center"
          />

          {/* Bio Section */}
          {/* <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-2">About</h3>
            <p className="text-gray-300 text-sm">
              {account.bio || "This user hasn’t written a bio yet."}
            </p>
          </div> */}

          <div className="mt-10">

            {/* If account is private and you don’t follow */}
            {account.isPrivate && !account.connection.following ? (
              <div className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <FaLock />
                <p className="text-gray-300 font-medium">This account is private</p>
                <p className="text-gray-500 text-sm mt-1">
                  Follow to see their photos and videos.
                </p>
              </div>
            ) : (<>
              <div className="mt-10 w-full max-w-4xl mx-auto">
                <h3 className="text-lg font-bold text-white mb-4">Posts</h3>

                {account.posts && account.posts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {account.posts.map((post) => (
                      <Link to={`/posts/${post.id}`} key={post.id}>
                        <div
                          className="relative w-full aspect-square bg-gray-800 overflow-hidden shadow-md group hover:shadow-xl transition-shadow cursor-pointer"
                        >
                          {/* Post Image */}
                          <Image
                            src={post.picture}
                            alt="Post"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Overlay on hover (shows likes/comments) */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-semibold space-x-4">
                            <span>{post.likes?.length ?? 0} Likes</span>
                            <span>{post.comments?.length ?? 0} Comments</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic text-center">
                    This user hasn’t posted anything yet.
                  </p>
                )}
              </div>

              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
