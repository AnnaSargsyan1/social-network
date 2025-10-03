import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IAccount, IResponse } from "../../types";
import { Axios } from "../../lib/api";
import { Image } from "../../lib/helpers/Image";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "../../lib/hooks/useDebounce";

export const Search = () => {
    const [text, setText] = useState("");
    const searchText = useDebounce(text, 400);
    const [users, setUsers] = useState<IAccount[]>([]);

    useEffect(() => {
        if (!searchText) {
            return setUsers([]);
        }
        console.log("Searching...", searchText);
        Axios
            .get<IResponse<IAccount[]>>(`/search/${searchText}`)
            .then(response => setUsers(response.data.payload))
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    const errorResponse = err.response?.data as IResponse;
                    console.error(errorResponse.message);
                }
            })
    }, [searchText]);

    return <div className="w-full px-4 py-6">
        {/* Search input */}
        <div className="max-w-xl mx-auto relative">
            <input
                type="text"
                placeholder="Search accounts..."
                className="w-full h-12 px-5 pl-12 rounded-2xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-700 transition-all duration-200 shadow-inner"
                onChange={e => setText(e.target.value)}
            />

            {/* Fixed vertically centered icon */}
            <div className="absolute left-4 top-0 h-12 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" size={16} />
            </div>

            <p className="mt-3 text-sm text-gray-400 text-center italic">
                {users.length} {users.length === 1 ? "user" : "users"} found
            </p>
        </div>


        <div className="max-w-7xl mx-auto mt-6 flex flex-wrap gap-4 justify-center">
            {users.map(user => (
                <Link
                key={user.id}
                to={`/profile/${user.id}`}
                className="flex items-center p-4 bg-gray-800 rounded-xl shadow-md hover:bg-gray-700 transition duration-200 w-[260px]"
                >
                <Image
                    src={user.picture}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-700 shadow-sm"
                />
                <div className="ml-4">
                    <p className="text-white font-semibold text-sm">
                    {user.name} {user.surname}
                    </p>
                </div>
                </Link>
            ))}
        </div>

    </div>
};
