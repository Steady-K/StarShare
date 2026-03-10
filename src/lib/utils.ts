import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const adjectives = [
  "고요한",
  "반짝이는",
  "은은한",
  "맑은",
  "신비로운",
  "잔잔한",
  "차가운",
  "푸른",
  "희미한",
  "빛나는",
  "초롱한",
  "고독한",
  "포근한",
  "조용한",
  "깊은",
  "아련한",
  "선명한",
  "부드러운",
  "영롱한",
  "찬란한",
];

const nouns = [
  "달빛",
  "별빛",
  "성운",
  "은하",
  "유성",
  "북극성",
  "초승달",
  "밤하늘",
  "오리온",
  "혜성",
  "성단",
  "은하수",
  "달무리",
  "별자리",
  "망원경",
  "궤도",
  "우주먼지",
  "새벽별",
  "코스모스",
  "월광",
];

export const getRandomNickname = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);

  return `${adjective}${noun}${number}`;
};
