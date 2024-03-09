import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../serverApi/axios";
import API_URLS from "../serverApi/serverApIPaths";

export function useDeletePost(userId: string, page: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) =>
      axiosInstance.delete(`${API_URLS.deletePost}/${postId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, page] });
      console.log("deleted successfully");
    },
  });
}
