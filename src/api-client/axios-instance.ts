import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export const getAccessToken = () => localStorage?.getItem("accessToken");
const getRefreshToken = () => localStorage?.getItem("refreshToken");

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = getAccessToken();
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // toast.success(response?.data?.message);
    return response?.data;
  },
  async (error) => {
    const originalRequest = error.config;
    let res = error.response;
    if (res?.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const data = await axios({
          url: `${BASE_URL}refresh-auth`,
          method: "post",
          data: { refresh_token: getRefreshToken() },
        });
        const newAccessToken = data?.data?.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err: any) {
        // toast.error(err.message);
        toast.error(err.response?.message ?? "Error");
        console.error("Token refresh failed:", { err });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        Router.push("/login"); // Redirect to login page
      }
    }
    // toast.error(error?.response?.data?.message);
    return Promise.reject(error?.response?.data);
  }
);
