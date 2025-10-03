import { useState, useRef } from "react"
import { Axios } from "../../../../lib/api";
import { IContext, IResponse } from "../../../../types";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export const CoverPicker = () => {
	const [preview, setPreview] = useState("");
	const picInput = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const { account, setAccount } = useOutletContext<IContext>();
	const handlePreview = () => {
		if (picInput.current?.files) {
			const file = picInput.current.files[0];

			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}
	const handleUpload = () => {
		if (picInput.current?.files) {
            const file = picInput.current.files[0];

            const form = new FormData();
            form.append("cover", file);

            Axios.patch<IResponse<string>>("/cover/upload", form).then((response) => {
                setAccount({ ...account, cover: response.data.payload });
                navigate("/profile");
            }).catch(error => {
				if (axios.isAxiosError(error)) {
					const errorResponse = error.response?.data as IResponse;
					console.error(errorResponse.message);
				}
			});
        }
	}
	const handleCancel = () => {
		setPreview("");
		if (picInput.current) {
			picInput.current.value = "";
		}
	}

	return (
  <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4 min-h-[300px]">
    <h2 className="text-2xl font-semibold text-white mb-4">Cover Picture</h2>

    {/* Preview placeholder */}
    <div className="w-full max-w-4xl h-48 rounded-xl border-4 border-gray-700 bg-gray-800 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
      {
        preview
          ? <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full"
            />
          : "Preview"
      }
    </div>

    {/* Hidden input */}
    <input
      type="file"
      className="hidden"
      onChange={handlePreview}
      ref={picInput}
    />
    {/* File input trigger */}
    <button
      onClick={() => picInput.current?.click()}
      type="button"
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:scale-[1.02] transition-transform"
    >
      Choose Picture
    </button>

    {/* Action buttons */}
    {preview && (
      <div className="flex space-x-3">
        <button
          onClick={handleUpload}
          className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:scale-[1.02] transition-transform"
        >
          Upload
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:scale-[1.02] transition-transform"
        >
          Cancel
        </button>
      </div>
    )}
  </div>
);


}