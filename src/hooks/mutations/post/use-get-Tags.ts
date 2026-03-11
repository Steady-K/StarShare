import { getSuggestedTags } from "@/api/ai";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useGetTags(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: (imageFile: File) => getSuggestedTags(imageFile),

    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks?.onError(error);
    },
  });
}
