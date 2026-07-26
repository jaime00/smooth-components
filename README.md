# smooth-components

**Elegant, customizable, and accessible React components.**

`smooth-components` is a growing library of beautifully designed, reusable UI components for React. Whether you're building a portfolio, dashboard, or e-commerce site, these components help you move fast and look great — without sacrificing accessibility or flexibility.

[![npm version](https://img.shields.io/npm/v/smooth-components.svg)](https://www.npmjs.com/package/smooth-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Zero CSS imports** — styles are automatically injected at runtime, no extra setup needed
- **Fully typed** — built with TypeScript, includes type declarations out of the box
- **Accessible** — components enforce accessibility props (e.g. required `alt` text)
- **Smooth animations** — hover effects, glint overlays, 3D borders, and glass reflections
- **Lightweight** — React and react-dom are externalized, keeping the bundle small
- **ESM & UMD** — works with any bundler or via CDN

---

## Installation

```bash
npm install smooth-components
```

### Peer Dependencies

Requires React 18 or 19:

```json
"react": "^18.0.0 || ^19.0.0"
"react-dom": "^18.0.0 || ^19.0.0"
```

### Importing Types

All prop types are exported for use in your own components:

```ts
import type { PosterProps, PosterStyles, FrameSize } from 'smooth-components'
import type { BundlephobiaWidgetProps } from 'smooth-components'
```

---

## Poster

The `<Poster />` component is ideal for showcasing images and videos like movie posters, artworks, product covers, or any visual element that needs emphasis. It includes a 3D border effect, glass overlay, and an optional animated **glint** effect on hover. Pass a video URL (`.mp4`, `.webm`, etc.) to `src` and it will auto-detect, playing the video in loop with no controls.

### Usage

```tsx
import { Poster } from 'smooth-components'

<Poster
  alt="Pulp Fiction"
  src="./pulp-fiction.jpg"
  hasFrame={true}
  frameSize="sm"
  hasGlintEffect={true}
  followCursor={true}
  onClick={() => console.log('clicked')}
  styles={{
    opacity: 0.91,
    height: '600px',
    width: 'auto'
  }}
/>
```

#### Video

```tsx
import { Poster } from 'smooth-components'

<Poster
  alt="Abstract animation"
  src="https://example.com/video.mp4"
  hasFrame={true}
  frameSize="md"
  followCursor={true}
  styles={{ width: '500px' }}
/>
```

### Props

| Prop             | Type                   | Default | Required | Description                                                     |
| ---------------- | ---------------------- | ------- | -------- | --------------------------------------------------------------- |
| `alt`            | `string`               | —       | Yes      | Descriptive alt text for accessibility.                         |
| `src`            | `string`               | —       | Yes      | Path or URL to the image or video (`.mp4`, `.webm`, etc.).      |
| `styles`         | `PosterStyles`         | —       | No       | Custom styles for the container (see below).                    |
| `hasFrame`       | `boolean`              | `true`  | No       | Shows or hides the 3D border frame around the image.            |
| `frameSize`      | `'sm' \| 'md' \| 'lg'` | `'sm'`  | No       | Controls frame thickness: `sm` (6px), `md` (12px), `lg` (18px). |
| `hasGlintEffect` | `boolean`              | `false` | No       | Enables animated glint overlay across the image.                |
| `followCursor`   | `boolean`              | `true`  | No       | Enables 3D tilt effect that follows the mouse cursor.           |
| `onClick`        | `() => void`           | —       | No       | Callback function triggered when the poster is clicked.         |

#### `PosterStyles`

| Property  | Type               | Default  | Description                    |
| --------- | ------------------ | -------- | ------------------------------ |
| `opacity` | `number \| string` | `0.91`   | Opacity of the image container |
| `width`   | `number \| string` | `"auto"` | Width of the image container   |
| `height`  | `number \| string` | `"auto"` | Height of the image container  |

> Numbers are interpreted as `px`. You can also pass CSS units like `"50%"`, `"20rem"`, etc.

---

## BundlephobiaWidget

The `<BundlephobiaWidget />` component displays real-time bundle size data for any npm package, powered by the [Bundlephobia](https://bundlephobia.com) API. It shows minified/gzipped sizes, download times, tree-shaking support, dependency count, and composition — with built-in skeleton loading states.

### Usage

```tsx
import { BundlephobiaWidget } from 'smooth-components'

<BundlephobiaWidget
  pkg="react@19.1.0"
  size="lg"
  repository="https://github.com/facebook/react"
  isDarkMode={false}
/>
```

### Props

| Prop         | Type                                            | Default | Required | Description                                       |
| ------------ | ----------------------------------------------- | ------- | -------- | ------------------------------------------------- |
| `pkg`        | `` `${string}@${number}.${number}.${number}` `` | —       | Yes      | Package name with exact semver version.           |
| `size`       | `'sm' \| 'md' \| 'lg'`                          | `'sm'`  | No       | Widget size variant (controls visible sections).  |
| `repository` | `string`                                        | —       | No       | URL to the source repository (shows GitHub link). |
| `isDarkMode` | `boolean`                                       | `false` | No       | Enables dark mode styling.                        |

### Size Variants

| Size | Description                                           | Minified | Gzipped | Download times | Badges | Description text | Composition |
| ---- | ----------------------------------------------------- | -------- | ------- | -------------- | ------ | ---------------- | ----------- |
| `sm` | Compact — metrics and download times only             | ✓        | ✓       | ✓              | —      | —                | —           |
| `md` | Standard — adds badges, description, and header links | ✓        | ✓       | ✓              | ✓      | ✓                | —           |
| `lg` | Full — includes dependency composition breakdown      | ✓        | ✓       | ✓              | ✓      | ✓                | ✓           |

---

## More Components Coming Soon

Stay tuned for new additions including modals, cards, loaders, and more.

---

## License

MIT © [Jaime Torres](https://jaimetorresv.com)

---

## Connect

- [Portfolio](https://jaimetorresv.com)
- [LinkedIn](https://www.linkedin.com/in/jaimetorresv)
- [GitHub](https://github.com/jaime00)
- [Email](mailto:imjaimetorresv@gmail.com)
