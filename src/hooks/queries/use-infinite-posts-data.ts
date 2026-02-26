import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
const PAGE_SIZE = 5;

export function useInfinitePostsData({
  authorId,
  selectedTags,
}: {
  authorId?: string;
  selectedTags?: string[];
}) {
  const queryClient = useQueryClient();
  const session = useSession();

  return useInfiniteQuery({
    queryKey: !authorId
      ? QUERY_KEYS.post.list(selectedTags)
      : QUERY_KEYS.post.userList(authorId, selectedTags),
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({
        from,
        to,
        userId: session!.user.id,
        authorId,
        tags: selectedTags,
      });
      posts.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });
      return posts.map((post) => post.id);
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    staleTime: Infinity,
  });
}
