import { Image } from "../../../lib/helpers/Image";
import { useHttp } from "../../../lib/hooks/useHttp";
import { IAccount } from "../../../types";
import { Loader } from "../../../lib/helpers/Loader";
import { Link } from "react-router-dom";

export const UserHeader = ({ userId }: { userId: string }) => {
  const {
    data: owner,
    error,
    loading,
  } = useHttp<IAccount>(`/account/${userId}`, { method: "GET" });

  if (loading) return <Loader />;

  if (!owner) {
    return <p className="text-white p-4">User not found.</p>;
  }

  return (
    <div className="p-4 border-b border-gray-800 bg-gray-900">
      <Link to={`/profile/${userId}`} className="flex items-center space-x-4" >
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
          <Image
            src={owner.picture}
            alt={`${owner.name} ${owner.surname}`}
            className="w-full h-full object-cover"
            />
        </div>
        <div>
          <p className="text-white font-semibold">
            {owner.name} {owner.surname}
          </p>
        </div>
      </Link>
    </div>
  );
};
