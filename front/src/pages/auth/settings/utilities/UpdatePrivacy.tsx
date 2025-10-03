import { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { IContext, IResponse } from "../../../../types.ts";
import { Axios } from "../../../../lib/api.ts";
import axios from "axios";

export const UpdatePrivacy = () => {
  const { account, setAccount } = useOutletContext<IContext>();
  const [error, setError] = useState("");
  const handleToggle = () => {
    Axios
      .patch("/account/set")
      .then(() => {
        setError("");
        setAccount({...account, isPrivate: !account.isPrivate});
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          const errorResponse = err.response?.data as IResponse;
          setError(errorResponse.message);
        }
      });
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold text-white mb-4">Account Privacy</h2>
      { error && <p className="text-red-400 my-2">{error}</p>}
      {/* Toggle */}
      <div
        onClick={handleToggle}
        className={`w-32 h-12 flex items-center bg-gray-700 rounded-full cursor-pointer p-1 transition-all duration-300 ${
          account.isPrivate ? "justify-start" : "justify-end"
        }`}
      >
        <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 rounded-full text-white shadow-md">
          {account.isPrivate ? <FaLock /> : <FaLockOpen />}
        </div>
      </div>

      {/* Status text */}
      <p className="mt-4 text-gray-300 font-medium">
        Account is {account.isPrivate ? "private" : "public"}
      </p>
    </div>
  );
};
