import { FaSpinner } from "react-icons/fa";
export const Loader = () => {
    return <div className="flex items-center justify-center my-4">
        <FaSpinner className="animate-spin text-indigo-500 text-3xl" />
    </div>;
}