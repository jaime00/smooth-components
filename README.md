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
import type { HyperLinkProps, HyperLinkStyles, HyperLinkPreviewConfig } from 'smooth-components'
import type { ContributionsOnGithubProps } from 'smooth-components'
```

---

## Poster

The `<Poster />` component is ideal for showcasing images and videos like movie posters, artworks, product covers, or any visual element that needs emphasis. It includes a 3D border effect, glass overlay, and an optional animated **glint** effect on hover. Pass a video URL (`.mp4`, `.webm`, etc.) to `src` and it will auto-detect, playing the video in loop with no controls.

### Usage

```tsx
import { Poster } from 'smooth-components'

<Poster
  alt="My favorite poster hey!"
  src="./severance.webp"
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
  frameSize="sm"
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

| Prop             | Type                                            | Default | Required | Description                                       |
| ---------------- | ----------------------------------------------- | ------- | -------- | ------------------------------------------------- |
| `pkg`            | `` `${string}@${number}.${number}.${number}` `` | —       | Yes      | Package name with exact semver version.           |
| `size`           | `'sm' \| 'md' \| 'lg'`                          | `'sm'`  | No       | Widget size variant (controls visible sections).  |
| `repository`     | `string`                                        | —       | No       | URL to the source repository (shows GitHub link). |
| `isDarkMode`     | `boolean`                                       | `false` | No       | Enables dark mode styling.                        |
| `hasHoverEffect` | `boolean`                                       | `true`  | No       | Enables hover lift effect on the widget.          |

### Size Variants

| Size | Description                                           | Minified | Gzipped | Download times | Badges | Description text | Composition |
| ---- | ----------------------------------------------------- | -------- | ------- | -------------- | ------ | ---------------- | ----------- |
| `sm` | Compact — metrics and download times only             | ✓        | ✓       | ✓              | —      | —                | —           |
| `md` | Standard — adds badges, description, and header links | ✓        | ✓       | ✓              | ✓      | ✓                | —           |
| `lg` | Full — includes dependency composition breakdown      | ✓        | ✓       | ✓              | ✓      | ✓                | ✓           |

---

## HyperLink

The `<HyperLink />` component is a polymorphic link with an animated underline and an animated external-link icon that plays on hover. It renders an `<a>` by default but accepts any element type via the `as` prop (e.g. React Router's `Link`), making it easy to integrate with any routing library.

### Usage

```tsx
import { HyperLink } from 'smooth-components'

<HyperLink href="https://github.com" external>
  Visit GitHub
</HyperLink>
```

#### With a custom component

```tsx
import { Link } from 'react-router-dom'
import { HyperLink } from 'smooth-components'

<HyperLink as={Link} to="/about" showIcon={false}>
  About page
</HyperLink>
```

### Props

| Prop               | Type                     | Default | Required | Description                                                         |
| ------------------ | ------------------------ | ------- | -------- | ------------------------------------------------------------------- |
| `children`         | `ReactNode`              | —       | Yes      | Content rendered inside the link.                                   |
| `href`             | `string`                 | —       | No       | URL destination (used when rendering as `<a>`).                     |
| `as`               | `ElementType`            | `'a'`   | No       | Polymorphic element or component to render (e.g. `Link`).           |
| `external`         | `boolean`                | `true`  | No       | Opens in a new tab with `noopener noreferrer`.                      |
| `showIcon`         | `boolean`                | `true`  | No       | Shows an animated external-link icon (only when rendered as `<a>`). |
| `icon`             | `ReactNode`              | —       | No       | Custom icon to replace the default animated icon.                   |
| `styles`           | `HyperLinkStyles`        | —       | No       | Custom styles (see below).                                          |
| `className`        | `string`                 | —       | No       | CSS class for the outer container.                                  |
| `contentClassName` | `string`                 | —       | No       | CSS class for the inner content wrapper.                            |
| `showUnderline`    | `boolean`                | `true`  | No       | Shows an animated underline on hover.                               |
| `previewConfig`    | `HyperLinkPreviewConfig` | —       | No       | Hover preview popup (image, gif, video, or custom React content).   |

> Any additional props are forwarded to the underlying element.

#### `HyperLinkStyles`

| Property          | Type     | Default          | Description                     |
| ----------------- | -------- | ---------------- | ------------------------------- |
| `color`           | `string` | —                | Text color of the link          |
| `underscoreColor` | `string` | `'currentColor'` | Color of the animated underline |

#### `HyperLinkPreviewConfig`

| Property          | Type                                      | Default | Description                                                |
| ----------------- | ----------------------------------------- | ------- | ---------------------------------------------------------- |
| `type`            | `'image' \| 'gif' \| 'video' \| 'custom'` | —       | Media type of the preview content.                         |
| `src`             | `string`                                  | —       | URL for image, gif, or video previews.                     |
| `alt`             | `string`                                  | —       | Alt text for image/gif previews.                           |
| `content`         | `ReactNode`                               | —       | Any React content for `type: 'custom'`.                    |
| `placement`       | `'top' \| 'bottom'`                       | `'top'` | Preferred placement (auto-flips if not enough space).      |
| `width`           | `number`                                  | `240`   | Preview width in px (defaults to auto for `custom` type).  |
| `height`          | `number`                                  | `160`   | Preview height in px (defaults to auto for `custom` type). |
| `borderRadius`    | `number`                                  | `16`    | Border radius of the preview container in px.              |
| `delay`           | `number`                                  | `300`   | Delay in ms before the preview appears on hover.           |
| `backgroundColor` | `string`                                  | —       | Background color of the preview container.                 |

Resources (images, videos, custom components) are loaded once when the `HyperLink` mounts — not on each preview open.

#### Example with custom preview

```tsx
import { HyperLink, ContributionsOnGithub } from 'smooth-components'

<HyperLink
  href="https://github.com/username"
  previewConfig={{
    type: 'custom',
    content: <ContributionsOnGithub username="username" />,
    placement: 'bottom'
  }}
>
  GitHub
</HyperLink>
```

#### Example with image preview

```tsx
<HyperLink
  href="https://example.com"
  previewConfig={{
    type: 'image',
    src: 'https://example.com/preview.png',
    alt: 'Site preview',
    width: 320,
    height: 200,
    placement: 'top'
  }}
>
  Visit site
</HyperLink>
```

---

## ContributionsOnGithub

The `<ContributionsOnGithub />` component renders a GitHub-style contribution grid for any public user. It fetches data automatically, shows a skeleton while loading, and supports dark mode. Renders the last N weeks of activity with per-cell tooltips.

### Usage

```tsx
import { ContributionsOnGithub } from 'smooth-components'

<ContributionsOnGithub
  username="torvalds"
  year={2025}
  isDarkMode={false}
  weeks={26}
/>
```

### Props

| Prop         | Type                           | Default      | Required | Description                                       |
| ------------ | ------------------------------ | ------------ | -------- | ------------------------------------------------- |
| `username`   | `string`                       | —            | Yes      | GitHub username to fetch contributions for.       |
| `year`       | `number`                       | current year | No       | Year to display contributions for.                |
| `isDarkMode` | `boolean`                      | `false`      | No       | Enables dark mode styling.                        |
| `weeks`      | `number`                       | `14`         | No       | Number of weeks to display (columns in the grid). |
| `cellSize`   | `number`                       | `14`         | No       | Size of each contribution cell in px.             |
| `cellGap`    | `number`                       | `3`          | No       | Gap between cells in px.                          |
| `styles`     | `{ width?: string \| number }` | —            | No       | Custom width for the container.                   |

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
