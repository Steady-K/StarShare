export function parseTagsInput(tagsInput: string): string[] {
  return [
    ...new Set(
      tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    ),
  ];
}
