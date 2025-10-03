import { FiLogOut } from "react-icons/fi";
import { CoverPicker } from "./utilities/CoverPicker.tsx";
import { ImagePicker } from "./utilities/ImagePicker.tsx";
import { UpdateLogin } from "./utilities/UpdateLogin.tsx";
import { UpdatePassword } from "./utilities/UpdatePassword.tsx";
import { UpdatePrivacy } from "./utilities/UpdatePrivacy.tsx";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../lib/api.ts";

export const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Axios.post("/logout").then(() => navigate("/login"));
  };
  return (
    <div className="min-h-screen text-center pt-6 relative">

      {/* Logout button */}
      <button
        onClick={handleLogout}
        title="Logout"
        className="absolute top-6 right-6 p-3 rounded-full 
                   bg-gray-800 hover:bg-gray-700 text-red-400 
                   hover:text-red-500 transition-all shadow-md"
      >
        <FiLogOut size={22} />
      </button>

      {/* Page title */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        Settings
      </h1>

      {/* Settings content */}
      <div className="flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
          <UpdateLogin />
          <UpdatePassword />
          <UpdatePrivacy />
          <div className="md:col-span-2">
            <ImagePicker />
          </div>
          <div className="md:col-span-2">
            <CoverPicker />
          </div>
        </div>
      </div>
    </div>
  );
};
