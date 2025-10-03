import type { IPost } from "../../../types";
import { Image } from "../../../lib/helpers/Image";
import { Link } from "react-router-dom";

type PostsProps = {
  posts: IPost[];
};

export const ProfilePosts = ({ posts }: PostsProps) => {

  return (
    <div className="mt-10 w-full">
      <h3 className="text-lg font-bold mb-4">Posts</h3>

      <div className="grid grid-cols-3">
        {/* Posts */}
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <div
                key={post.id}
                className="aspect-square relative bg-gray-700 overflow-hidden shadow-md cursor-pointer group"
              >
                <Image
                  src={post.picture}
                  alt="Post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-semibold space-x-4">
                  <span>{post.likes?.length ?? 0} Likes</span>
                  <span>{post.comments?.length ?? 0} Comments</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-3 text-gray-400 italic text-sm flex items-center justify-center">
            No posts yet.
          </p>
        )}
      </div>

    </div>
  );
};
