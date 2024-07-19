import { BASE_URL } from "@/utils/constants";
import { IApi, IApiResponse } from "@/utils/interfaces";
import axios from "axios";
import { toast } from "react-toastify";

export const patchApi = async ({ data, endUrl, params, headers }: IApi) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios({
    method: "patch",
    url: `${BASE_URL}${endUrl}`,
    params,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      return response?.data;
    })
    .catch((err) => toast.error(err?.response?.data?.message ?? "Error"));
};

export const postApi = async ({ data, endUrl, params, headers }: IApi) => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    axios({
      method: "post",
      url: `${BASE_URL}${endUrl}`,
      params,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response?.data;
      })

      // .catch((err) => toast.error(err?.message ?? "Error "));
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Error");
      })
  );
};

export const getApi = async <T extends {}>({
  endUrl,
  params,
}: IApi): Promise<IApiResponse<T>> => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    axios({
      method: "get",
      url: `${BASE_URL}${endUrl}`,
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        return res?.data;
      })

      // console.log(res))
      .catch((err) => console.log(err))
  );
};

export const putApi = async ({ endUrl, params, data }: IApi) => {
  return axios({
    method: "put",
    url: `${BASE_URL}${endUrl}`,
    params,
    data,
  })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => console.log(err));
};

export const deleteApi = async ({ endUrl, params }: IApi) => {
  return axios({
    method: "delete",
    url: `${BASE_URL}${endUrl}`,
    params,
  })
    .then((res) => {
      return res?.data;
    })

    .catch((err) => console.log(err));
};
