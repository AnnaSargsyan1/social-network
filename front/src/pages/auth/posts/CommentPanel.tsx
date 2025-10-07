import { useState } from "react";
import { IComment, IContext } from "../../../types";
import { Image } from "../../../lib/helpers/Image";
import { Link, useOutletContext } from "react-router-dom";

type CommentPanelProps = {
  comments: IComment[];
  setShowComments: (state: boolean) => void;
  onAddComment: (content: string) => void;
};

export const CommentPanel = ({
  comments,
  setShowComments,
  onAddComment,
}: CommentPanelProps) => {
  const [newComment, setNewComment] = useState("");
  const { account } = useOutletContext<IContext>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newComment.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setNewComment("");
  };

  const filteredComments = comments.filter(
    (comment) => comment.content && comment.user
  );

  return (
    <div className="w-full md:w-1/3 bg-gray-900 border-l border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-white text-lg font-semibold">Comments</h2>
        <button
          onClick={() => setShowComments(false)}
          className="text-gray-400 hover:text-white text-lg md:hidden"
        >
          ✕
        </button>
      </div>

      {/* Comments List */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {filteredComments.length ? (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-800 p-3 rounded-md text-gray-200"
            >
              {comment.user && (
                <div className="flex gap-3 items-start">
                  {/* User Avatar */}
                  <Link to={`/profile/${comment.user.id}`}>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 shrink-0">
                      <Image
                        src={comment.user.picture}
                        alt={`${comment.user.name} ${comment.user.surname}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/profile/${comment.user.id}`}
                        className="text-sm font-semibold text-white hover:underline"
                      >
                        {comment.user.name} {comment.user.surname}
                      </Link>
                      {account?.id === comment.user.id && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          Me
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the one to comment first.
          </p>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-700 bg-gray-800 flex space-x-2"
      >
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 rounded-md px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold disabled:opacity-50"
          disabled={!newComment.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};
