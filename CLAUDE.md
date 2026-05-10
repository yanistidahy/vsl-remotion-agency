# RE-MOTION Skill — Remotion Video Generation

This project uses **Remotion** to generate videos programmatically with React. Claude can create, modify, and render videos by editing the files in `src/`.

## Project Structure

```
src/
  index.ts       — Entry point, registers the Root component
  Root.tsx       — Defines all Composition components (the video registry)
  MyVideo.tsx    — A video composition component
remotion.config.ts
package.json
```

### Key commands

```bash
npm start          # Open Remotion Studio (visual preview)
npm run render     # Render the video to a file
npm run upgrade    # Upgrade Remotion packages
```

---

## Composition Setup (Root.tsx)

All videos are declared in `Root.tsx` using `<Composition>`:

```tsx
import { Composition } from "remotion";

export const Root = () => (
  <>
    <Composition
      id="MyVideo"           // unique ID used for rendering
      component={MyVideo}    // React component that renders the video
      durationInFrames={300} // total length (300 frames = 10s at 30fps)
      fps={30}               // frames per second
      width={1920}           // canvas width in pixels
      height={1080}          // canvas height in pixels
      defaultProps={{}}      // default props passed to the component
    />
  </>
);
```

---

## Animation Fundamentals

### useCurrentFrame()

Every animation is driven by the current frame number. This is the core hook in Remotion.

```tsx
import { useCurrentFrame } from "remotion";

const frame = useCurrentFrame(); // 0, 1, 2, 3 ... durationInFrames-1
```

### interpolate()

Maps an input range to an output range. Used for all value transitions.

```tsx
import { interpolate } from "remotion";

const opacity = interpolate(
  frame,          // input value
  [0, 30],        // input range (frames 0 to 30)
  [0, 1],         // output range (opacity 0 to 1)
  {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }
);
```

### spring()

Physics-based animation — produces natural-feeling motion without manual easing.

```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const { fps } = useVideoConfig();
const frame = useCurrentFrame();

const scale = spring({
  fps,
  frame,
  config: {
    damping: 200,      // higher = less bouncy
    stiffness: 100,
    mass: 0.5,
  },
  from: 0,
  to: 1,
});
```

---

## Layout Components

### AbsoluteFill

Fills the entire canvas. Stack multiple `AbsoluteFill` to layer elements.

```tsx
import { AbsoluteFill } from "remotion";

<AbsoluteFill style={{ backgroundColor: "black" }}>
  {/* content */}
</AbsoluteFill>
```

---

## Timing Components

### Sequence

Delays when a child component starts rendering. The child's `useCurrentFrame()` resets to 0 at the sequence start.

```tsx
import { Sequence } from "remotion";

// Title appears at frame 0, subtitle at frame 60
<AbsoluteFill>
  <Sequence from={0} durationInFrames={90}>
    <Title />
  </Sequence>
  <Sequence from={60}>
    <Subtitle />
  </Sequence>
</AbsoluteFill>
```

### Series

Plays children one after another automatically.

```tsx
import { Series } from "remotion";

<Series>
  <Series.Sequence durationInFrames={60}>
    <Slide1 />
  </Series.Sequence>
  <Series.Sequence durationInFrames={90}>
    <Slide2 />
  </Series.Sequence>
</Series>
```

### TransitionSeries

Like `Series` but with animated transitions between sequences (requires `@remotion/transitions`).

```tsx
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <Slide1 />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={{ type: "linear", durationInFrames: 15 }}
  />
  <TransitionSeries.Sequence durationInFrames={90}>
    <Slide2 />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

---

## Media Components

### OffthreadVideo

Embeds a video file. Use this instead of `<video>` for deterministic rendering.

```tsx
import { OffthreadVideo } from "remotion";

<OffthreadVideo
  src={staticFile("clip.mp4")}  // or a remote URL
  startFrom={30}                // skip first 30 frames of the source
  endAt={150}                   // stop at frame 150 of the source
  volume={0.8}                  // 0 to 1
/>
```

### Img

Use instead of `<img>` to ensure the image is loaded before rendering.

```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("logo.png")} style={{ width: 300 }} />
```

### Gif

Requires `@remotion/gif` (already installed).

```tsx
import { Gif } from "@remotion/gif";
import { staticFile } from "remotion";

<Gif src={staticFile("animation.gif")} width={400} height={300} fit="contain" />
```

### Audio

Embeds audio. Use `<Audio>` instead of `<audio>`.

```tsx
import { Audio, staticFile } from "remotion";

<Audio
  src={staticFile("voiceover.mp3")}
  startFrom={0}
  endAt={150}
  volume={1}
/>
```

Place static assets (videos, images, audio) in the `public/` folder and reference them with `staticFile("filename")`.

---

## Critical Rules

**Remotion components are NOT interactive React components. They must be:**

1. **Deterministic** — the same frame always renders the same output.
2. **Frame-driven** — all animation comes from `useCurrentFrame()`, not timers or events.
3. **Pure** — no `useState`, no event handlers, no `useEffect` side effects.
4. **Seeded random** — use `random("seed")` from Remotion instead of `Math.random()`.

```tsx
import { random } from "remotion";

// Good — always returns the same value for this seed
const x = random("particle-x") * 1920;

// Bad — value changes on every render
const x = Math.random() * 1920;
```

---

## Typical VSL Video Pattern

A VSL (Video Sales Letter) video typically consists of:

1. **Hook** — attention-grabbing opening (0–3s)
2. **Problem** — pain point presentation (3–15s)
3. **Solution** — product/service introduction (15–40s)
4. **Social proof** — testimonials or results (40–60s)
5. **CTA** — call to action (60–90s)

Each section maps to a `<Series.Sequence>` or `<TransitionSeries.Sequence>`.

---

## Example: Text Fade-In with Slide

```tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const TextSlide: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      <p style={{ color: "#fff", fontSize: 60, opacity, transform: `translateY(${y}px)` }}>
        {text}
      </p>
    </AbsoluteFill>
  );
};
```

---

## Rendering a Video

```bash
# Render the "MyVideo" composition to out/MyVideo.mp4
npx remotion render MyVideo out/MyVideo.mp4

# Render with custom props
npx remotion render MyVideo out/MyVideo.mp4 --props='{"titleText":"Hello World"}'
```
