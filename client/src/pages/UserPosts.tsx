import { useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useFetchUserPosts from "../hooks/useFetchUserPosts";
import Layout from "../layout/Layout";
import SearchPosts from "../components/SearchPosts";
import PostsNotFound from "../components/PostsNotFound";
import { useDeletePost } from "../services/mutations";
import Error from "../components/Error";
import UserPostsTable from "../components/UserPostsTable";

const UserPosts = () => {
  const { userId } = useParams();
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<number>(-1);

  const { data, error, isLoading } = useFetchUserPosts(userId as string, page);
  const { mutateAsync, isPending } = useDeletePost(userId as string, page);

  const handleDeletePost = async (postId: number) => {
    setSelectedPost(postId);
    await mutateAsync(postId);
  };

  if (error)
    return <Error error={"Error occurred: Error fetching users posts"} />;

  const filteredPosts = data?.userPosts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={`${data?.userPosts[0]?.user?.name} posts`}>
      <SearchPosts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <Spinner />
      ) : filteredPosts && filteredPosts.length > 0 ? (
        <UserPostsTable
          posts={filteredPosts}
          selectedPost={selectedPost}
          onDeletePost={handleDeletePost}
          isDeleting={isPending}
          page={page}
          totalPosts={data?.totalUserPostsCount as number}
          onPageChange={setPage}
        />
      ) : (
        <PostsNotFound />
      )}
    </Layout>
  );
};

export default UserPosts;
