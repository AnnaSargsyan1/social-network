import { useEffect } from "react";
import { IRequest } from "../../../types";
import { useHttp } from "../../../lib/hooks/useHttp";
import { Loader } from "../../../lib/helpers/Loader";
import { Image } from "../../../lib/helpers/Image";
import { Link } from "react-router-dom";
import { Axios } from "../../../lib/api";

export const Notifications = () => {
  const { loading, data: notifications, error, refetch } = useHttp<IRequest[]>("/requests", {
    method: "GET",
  });

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  // Placeholder functions for Accept/Decline
  const acceptRequest = (id: number) => {
    console.log("Accepted request", id);
    Axios
        .patch(`/requests/accept/${id}`)
        .then(() => {
            refetch();
        })
  };

  const declineRequest = (id: number) => {
    Axios
    .patch(`/requests/decline/${id}`)
    .then(() => {
        refetch();
    })
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load notifications
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">All Notifications</h2>
      <ul className="space-y-4">
        {notifications && notifications.length > 0 ? (
          notifications.map((n) => (
            <li
              key={n.id}
              className="p-4 rounded-lg border border-blue-600 bg-gray-900 flex items-center justify-between space-x-4 hover:bg-gray-700 transition"
            >
              {/* Left: Avatar + Text */}
              <div className="flex items-center space-x-4">
                <Link to={`/profile/${n.user.id}`}>
                  <Image
                    src={n.user.picture || "/images/default-avatar.png"}
                    alt={n.user.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-600"
                  />
                </Link>

                <div>
                  <p className="text-gray-200 font-medium">
                    {n.user.name} {n.user.surname} sent you a request
                  </p>
                  {n.user.isPrivate ? (
                    <p className="text-xs text-gray-400">Private account</p>
                  ) : null}
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => acceptRequest(n.id)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => declineRequest(n.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-md text-sm transition"
                >
                  Decline
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-400 text-center">No notifications yet.</li>
        )}
      </ul>
    </div>
  );
};
