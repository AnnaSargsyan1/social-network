import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { IPost, IResponse } from "../../../types";
import { Axios } from "../../../lib/api";
import axios from "axios";
import { Loader } from "../../../lib/helpers/Loader";
import { Image } from "../../../lib/helpers/Image";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa";

export const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState<IPost | null>(null);
    const navigate = useNavigate(); 
    useEffect(() => {
        Axios
            .get<IResponse<IPost>>(`/posts/${id}`)
            .then(response => {
                if (!response.data.payload) {
                    return navigate("/profile");
                }
                setPost(response.data.payload);
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    const errorResponse = error.response?.data as IResponse;
                    console.error(errorResponse.message);
                }
                navigate("/profile");
            })
    }, [ id ]);
    if (!post) {
        return <Loader />
    }
    return <div className="min-h-screen text-white px-4 py-6 flex justify-center">
    <div className="w-full max-w-2xl bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Post Image */}
      {post.picture && (
        <div className="w-full h-fit bg-gray-800 overflow-hidden">
          <Image
            src={post.picture}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
      )}
  
      {/* Post Content */}
      <div className="p-6 space-y-4">
  
        {/* Content */}
        {post.title && (
          <p className="text-2xl font-bold text-white">
            {post.title}
          </p>
        )}
  
        {/* Stats */}
        <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
          <div className="flex items-center space-x-2">
            <span><button>
                {post.isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button> {post.likes?.length ?? 0}</span>
            <span><button><FaComment /></button> {post.comments?.length ?? 0}</span>
          </div>
          {/* <span className="text-gray-500 text-xs">
            {new Date(post.createdAt).getDate()}
          </span> */}
        </div>
  
        {/* Comments */}
        {post.comments?.length ? (
          <div className="mt-4 border-t border-gray-700 pt-4 space-y-2">
            {post.comments.map((comment) => (
              <div key={comment.id} className="text-gray-300 text-sm">
                {/* <span className="font-semibold text-white">{comment.userId.name}: </span> */}
                {comment.content}
              </div>
            ))}
          </div>
        ): null}
      </div>
    </div>
  </div>
  

}