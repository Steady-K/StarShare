export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  post: {
    all: ["post"],
    list: (tags?: string[] | null) => ["post", "list", { tags: tags ?? null }],
    userList: (userId: string, tags?: string[] | null) => [
      "post",
      "userList",
      userId,
      { tags: tags ?? null },
    ],
    byId: (postId: number) => ["post", "byId", postId],
  },
  comment: {
    all: ["comment"],
    post: (postId: number) => ["comment", "post", postId],
  },
};

export const BUCKET_NAME = "uploads";
