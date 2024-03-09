import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../serverApi/axios";
import API_URLS from "../serverApi/serverApIPaths";
import { UserResponse } from "../types/userTypes";

const useFetchUsers = (page: number) => {
  const queryKey = ["getUsers", page];
  const queryFn = async () =>
    (await axiosInstance.get<UserResponse>(`${API_URLS.getUsers}${page}`)).data;

  const { isLoading, error, data } = useQuery({ queryKey, queryFn });

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetchUsers;
