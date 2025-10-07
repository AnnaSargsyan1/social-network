import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { IPost, IResponse, IContext, IComment } from "../../../types";
import { Axios } from "../../../lib/api";
import axios from "axios";
import { Loader } from "../../../lib/helpers/Loader";
import { Image } from "../../../lib/helpers/Image";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { useHttp } from "../../../lib/hooks/useHttp";
import { CommentPanel } from "./CommentPanel";
import { UserHeader } from "./UserHeader";

export const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { account } = useOutletContext<IContext>();

  const {
    data: post,
    error: postError,
    loading: postLoading,
    refetch
  } = useHttp<IPost>(`/posts/${id}`, { method: "GET" });
console.log(post);

  useEffect(() => {
    if (!post || !post.likes) {
      return;
    }
    const liked = post.likes.find(like => like.id == account.id);
    setIsLiked(!!liked);
    setLikeCount(post.likes.length);
  }, [post]);
  const handleAddComment = (content: string) => {
    if (!post) {
      return;
    }
    Axios.post<IResponse<IComment>>(`/posts/comment/${post.id}`, { text: content })
      .then(response => {
        console.log(response);
        refetch();
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleLike = () => {
    if (!post) {
      return;
    }
    Axios.post(`/posts/react/${post.id}`)
      .then(response => {
        console.log(response);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        setIsLiked(prev => !prev);
      })
      .catch(err => {
        console.error(err);
      })
  }

  if (postLoading) return <Loader />;
  if (!post) return <p className="text-white p-4">Post not found.</p>;

  return (
    <div className="min-h-screen text-white px-4 py-6 flex bg-gray-950 gap-6 transition-all duration-300">
      {/* Post Section */}
      <div
        className={`bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 max-w-md mx-auto
          ${showComments ? "w-full md:w-2/3" : "w-full"}`}
      >

        <UserHeader userId={post.userId} />

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
        {/* Title */}
        {post.title && (
          <p className="text-2xl font-bold text-white">{post.title}</p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
          <div className="flex items-center space-x-4">
            { post.likes && <span>
                <button onClick={handleLike}>
                  {isLiked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>{" "}
                {likeCount >= 0 ? likeCount : 0}
              </span>
            }

            <span>
              <button onClick={() => setShowComments((prev) => !prev)}>
                <FaComment />
              </button>{" "}
              {post.comments?.length ?? 0}
            </span>
          </div>
        </div>

        {/* Preview of Comments */}
        {post.comments?.length ? (
          <div className="mt-4 border-t border-gray-700 pt-4 space-y-2">
            {post.comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="text-gray-300 text-sm">
                {comment.content}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>

    {/* Comments Panel */}
    {showComments && <CommentPanel comments={post.comments || []} setShowComments={setShowComments} onAddComment={handleAddComment}/>}
  </div>
  );
};
