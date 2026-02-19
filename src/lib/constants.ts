export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  post: {
    all: ["post"],
    list: ["post", "list"],
    userList: (userId: string) => ["post", "userList", userId],
    byId: (postId: number) => ["post", "byId", postId],
  },
  commnet: {
    all: ["comment"],
    list: ["comment", "list"],
    byId: (commnetId: number) => ["commnet", "byId", commnetId],
  },
};

export const BUCKET_NAME = "uploads";
