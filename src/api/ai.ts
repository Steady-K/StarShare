import { fileToBase64 } from "@/lib/fileToBase64";

export async function getSuggestedTags(imageFile: File): Promise<string[]> {
  console.log("API KEY:", import.meta.env.VITE_OPENAI_API_KEY); // 임시 확인용

  const base64 = await fileToBase64(imageFile);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
            {
              type: "text",
              text: `이 별 사진을 분석해서 SNS 해시태그로 쓸 수 있는 한국어 태그를 5개 추천해줘.
                - # 기호 없이 태그명만
                - 별, 천체와 관련 없는 사진이면 사진에 맞는 태그 추천해줘
                - 쉼표로 구분
                - 천체 관련 전문 용어 포함
                - 예시: 은하수, 오리온자리, 별궤적, 겨울밤하늘, 천체사진`,
            },
          ],
        },
      ],
      max_tokens: 100,
    }),
  });
  const data = await response.json();

  const text = data.choices[0].message.content as string;

  return text.split(",").filter((line: string) => line.trim() !== "");
}
