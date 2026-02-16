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

---

## Poster

The `<Poster />` component is ideal for showcasing images like movie posters, artworks, product covers, or any visual element that needs emphasis. It includes a 3D border effect, glass overlay, and an optional animated **glint** effect on hover.

### Usage

```tsx
import { Poster } from 'smooth-components'

;<Poster
  alt="Pulp Fiction"
  src="./pulp-fiction.jpg"
  hasGlintEffect={true}
  styles={{
    height: '600px'
  }}
/>
```

### Props

| Prop             | Type           | Default | Required | Description                                      |
| ---------------- | -------------- | ------- | -------- | ------------------------------------------------ |
| `alt`            | `string`       | —       | Yes      | Descriptive alt text for accessibility.          |
| `src`            | `string`       | —       | Yes      | Path or URL to the image.                        |
| `styles`         | `PosterStyles` | —       | No       | Custom styles for the container (see below).     |
| `hasGlintEffect` | `boolean`      | `true`  | No       | Enables animated glint overlay across the image. |

#### `PosterStyles`

| Property  | Type               | Default  | Description                    |
| --------- | ------------------ | -------- | ------------------------------ |
| `opacity` | `number \| string` | `0.91`   | Opacity of the image container |
| `width`   | `number \| string` | `"auto"` | Width of the image container   |
| `height`  | `number \| string` | `"auto"` | Height of the image container  |

> Numbers are interpreted as `px`. You can also pass CSS units like `"50%"`, `"20rem"`, etc.

---

## More Components Coming Soon

Stay tuned for new additions including modals, cards, loaders, and more.

---

## License

MIT © [Jaime Torres](https://github.com/jaime00)

---

## Connect

- [Portfolio](https://jaime00portfolio.netlify.app/)
- [LinkedIn](https://www.linkedin.com/in/jaime00)
- [GitHub](https://github.com/jaime00)
- [Email](mailto:imjaimetorresv@gmail.com)
