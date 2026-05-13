# RETROGRADATION — Premium Motion Design Video Ads

This project uses **Remotion** to generate premium video ads programmatically with React.

## Style Reference
- Pure black background (`#080808`)
- Kinetic typography: words slam in one by one with spring
- Very fast cuts: each scene 1.5s–3s max
- Bold white text, huge font sizes (80–140px)
- ONE color accent: purple (`#7c3aed`)
- Transitions: instant cut OR 4-frame flash-to-white/black
- No slow fades, no zooms — frame-precise
- Stats/numbers count up fast (30 frames)
- CTA massive and centered at the end

## Color System
```ts
const C = {
  bg: '#080808',
  white: '#FFFFFF',
  purple: '#7c3aed',
  purpleLight: '#a78bfa',
  purpleDim: 'rgba(124,58,237,0.15)',
  gray: '#888888',
}
```

## Key Commands
```bash
npm start          # Remotion Studio preview
npm run render     # Render to file
```

## Animation Principles
- `spring({ damping: 12–16, stiffness: 350–500 })` for snappy entrances
- NEVER slow fades — spring or slice-reveal only
- Scene duration: 1.5s–4s max
- Cuts feel like editorial video, not slideshow

## Reusable Components
- `FlashTransition` — 4-frame white flash at scene boundaries
- `WordByWord` — split by spaces, each word springs in staggered
- `SliceReveal` — clip-path mask slides left→right to reveal text
- `CountUp` — fast number count animation
- `ChatMockup` — static pre-built chat UI
- `AuraLogoMark` — SVG geometric A with purple gradient

## Project Structure
```
src/
  components/     — reusable animation components
  scenes/         — one file per scene
  compositions/   — MainVideo.tsx registers all scenes
  constants.ts    — C colors, FONT, spring configs
public/
  logo.svg        — AuraFlow AI logomark
  music.mp3       — dark electro beat
```

## Composition
```tsx
<Composition
  id="AuraFlowAd"
  component={MainVideo}
  durationInFrames={1800}
  fps={60}
  width={1080}
  height={1920}
/>
```
