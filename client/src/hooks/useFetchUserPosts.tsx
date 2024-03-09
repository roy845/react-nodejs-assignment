import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../serverApi/axios";
import API_URLS from "../serverApi/serverApIPaths";
import { PostResponse } from "../types/postTypes";

const useFetchUserPosts = (userId: string, page: number) => {
  const queryKey = ["userPosts", userId, page];
  const queryFn = async () =>
    (
      await axiosInstance.get<PostResponse>(
        `${API_URLS.getUsersPosts}/${userId}?page=${page}`
      )
    ).data;

  return useQuery({ queryKey, queryFn });
};

export default useFetchUserPosts;
