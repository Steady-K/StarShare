import Fallback from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data";

export default function PostFeed({ authorId }: { authorId?: string }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleToggleTag = (tag: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // 선택 해제
          : [...prev, tag], // 선택 추가
    );
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostsData({ authorId, selectedTags });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-6">
      {/* 선택된 태그 표시/해제 UI */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">선택된 태그:</span>
          {selectedTags.map((tag) => (
            <span key={tag} className="rounded-full border px-2 py-1 text-xs">
              #{tag}
            </span>
          ))}
          <button
            type="button"
            onClick={handleClearTags}
            className="text-sm underline"
          >
            전체 해제
          </button>
        </div>
      )}
      <div className="flex flex-col gap-10">
        {data.pages.map((page) =>
          page.map((postId) => (
            <PostItem
              key={postId}
              postId={postId}
              type="FEED"
              selectedTags={selectedTags}
              onToggleTag={handleToggleTag}
            />
          )),
        )}
        {isFetchingNextPage && <Loader />}
        <div ref={ref}></div>
      </div>
    </div>
  );
}
