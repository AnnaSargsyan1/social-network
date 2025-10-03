import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { Axios } from "../api";
import { IResponse } from "../../types";

export const useHttp = <T = unknown>(url: string, options: AxiosRequestConfig) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState("");
	const [data, setData] = useState<T | null>(null);

	const refetch = async () => {
		try {
			setLoading(true);
			setError("");
			const response:AxiosResponse<IResponse<T>> = await Axios(url, options);
			setData(response.data.payload);
		} catch(error) {
			if (axios.isAxiosError(error)) {
				const errorResponse = error.response?.data as IResponse;
				setError(errorResponse.message || "Request failed");
			}
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		refetch();
	}, []);

	return { loading, error, data, refetch };
}