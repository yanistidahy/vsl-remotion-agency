export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

export const COMPOSITIONS = {
  Intro: { durationInFrames: 150 },       // 5s
  Problem: { durationInFrames: 210 },     // 7s
  Solution: { durationInFrames: 210 },    // 7s
  SocialProof: { durationInFrames: 210 }, // 7s
  Offer: { durationInFrames: 240 },       // 8s
  CTA: { durationInFrames: 180 },         // 6s
} as const;