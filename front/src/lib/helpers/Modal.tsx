import { Link } from "react-router-dom";
import { IAccount } from "../../types";
import { Image } from "./Image";

interface ModalProps {
  title: string;
  accounts: IAccount[];
  onClose: () => void;
}

export const Modal = ({ title, accounts, onClose }: ModalProps) => {
	console.log(accounts);
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
      </div>

      {/* Account List */}
      <div className="flex-1 overflow-y-auto bg-gray-950 px-6 py-4">
        {accounts.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center mt-20">
            No users found.
          </p>
        ) : (
          <ul className="space-y-3">
            {accounts.map(user => (
              <li
                key={user.id}
                className="flex items-center justify-between py-2 px-2 hover:bg-gray-800 rounded-md transition"
              >
                <Link to={`/profile/${user.id}`} className="flex items-center space-x-4">
                  <Image
                    src={user.picture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover bg-gray-700"
                  />
                  <div>
                    <p className="font-medium">
                      {user.name} {user.surname}
                    </p>
                  </div>
                </Link>

                {/* Follow/Request button — adjust logic based on user relationship */}
                {/* <button
                  onClick={() => {
                    // TODO: Handle follow/request/cancel here
                    console.log("Button clicked for", user.id);
                  }}
                  className={`
                    text-sm font-medium px-3 py-1 rounded-md transition 
                    ${
                      user.isFollowing
                        ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        : user.hasPendingRequest
                        ? "bg-yellow-600 text-white hover:bg-yellow-700"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }
                  `}
                >
                  {user.isFollowing
                    ? "Following"
                    : user.hasPendingRequest
                    ? "Cancel Request"
                    : "Follow"}
                </button> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
