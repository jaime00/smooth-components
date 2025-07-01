# 📦 smooth-components

**Elegant, customizable, and accessible React components.**

`smooth-components` is a growing library of beautifully designed, reusable UI components for React. Whether you're building a portfolio, dashboard, or e-commerce site, these components help you move fast and look great—without sacrificing accessibility or flexibility.

[![npm version](https://img.shields.io/npm/v/smooth-components.svg)](https://www.npmjs.com/package/smooth-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Installation

Install via **npm** or **yarn**:

```bash
npm install smooth-components
# or
yarn add smooth-components
```

---

## 🖼️ Poster Component

The `Poster` component is ideal for showcasing images like movie posters, artworks, product covers, or any visual element that needs emphasis. It includes styling options for borders, size, opacity, and an optional animated **glint** effect.

### ✅ Example Usage

```tsx
import { Poster } from 'smooth-components'

export default function App() {
  return (
    <Poster
      alt="Cyberpunk City"
      src="/images/cyberpunk.jpg"
      styles={{
        width: 240,
        height: 360,
        borderColor: '#555',
        opacity: 0.95,
      }}
    />
  )
}
```

---

### 🔧 Props

| Prop                 | Type               | Default                        | Description                                               |
| -------------------- | ------------------ | ------------------------------ | --------------------------------------------------------- |
| `alt`                | `string`           | —                              | Descriptive alt text for accessibility.                   |
| `src`                | `string`           | —                              | Path or URL to the image.                                 |
| `styles`             | `object`           | —                              | Optional custom styles for the container.                 |
| `styles.opacity`     | `number \| string` | `0.91`                         | Opacity of the image container.                           |
| `styles.width`       | `number \| string` | `'auto'`                       | Width of the image container.                             |
| `styles.height`      | `number \| string` | `'auto'`                       | Height of the image container.                            |
| `styles.borderColor` | `string`           | `'oklch(12.9% 0.042 264.695)'` | Color of the border around the poster.                    |
| `hasGlintEffect`     | `boolean`          | `true`                         | Enables a subtle animated glint overlay across the image. |

> 💡 You can use numbers (interpreted as `px`) or standard CSS units (`px`, `%`, `em`, etc.) for style values. The `glint` effect adds a stylish shimmer animation for extra polish.

---

## 🧩 More Components Coming Soon

This is just the beginning. Stay tuned for new additions including:

* Modals
* Cards
* Loaders
* And more...

---

## 📝 License

MIT © [Jaime Torres](https://github.com/jaime00)
See the full license in [LICENSE](./LICENSE).

---

## 📬 Connect with Me

* 🌐 [Portfolio](https://jaime00portfolio.netlify.app/)
* 💼 [LinkedIn](https://www.linkedin.com/in/jaime00)
* 📧 [Email](mailto:imjaimetorresv@gmail.com)
* 🐙 [GitHub](https://github.com/jaime00)

---

Let me know if you’d like to add:

* Usage with Tailwind or a specific framework
* Storybook/preview link
* Development & contribution guide
* More animated gifs/screenshots

Want me to help generate a demo GIF or improve visuals? Happy to assist.
