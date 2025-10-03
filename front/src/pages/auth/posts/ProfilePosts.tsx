import type { IPost } from "../../../types";
import { Image } from "../../../lib/helpers/Image";
import { Link } from "react-router-dom";

type PostsProps = {
  posts: IPost[];
}
export const Posts = ({ posts }: PostsProps) => {
  return <div className="mt-10 w-full">
  <h3 className="text-lg font-bold mb-4">Posts</h3>

  <div className="grid grid-cols-3 gap-4">
    {/* Add Post Button */}
    <button
      className="aspect-square flex items-center justify-center rounded-lg 
                bg-gradient-to-br from-blue-600 to-purple-600 text-white 
                text-4xl font-bold shadow-md hover:scale-105 transition-transform"
    >
      <Link to={"/profile/add"}>+</Link>
    </button>

    {/* Posts */}
    {posts && posts.length > 0 ? (
      posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square bg-gray-700 rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          <Link to={`/posts/${post.id}`}>
            <Image
              src={post.picture}
              alt="Post"
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        </div>
      ))
    ) : (
      <p className="col-span-3 text-gray-400 italic text-sm flex items-center justify-center">
        No posts yet.
      </p>
    )}
  </div>
</div>;
}