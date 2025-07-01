# 📦 smooth-components

`smooth-components` is a growing collection of elegant, customizable, and accessible React components built to help you quickly craft beautiful web interfaces.

[![npm version](https://img.shields.io/npm/v/smooth-components.svg)](https://www.npmjs.com/package/smooth-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Installation

Install the package via npm or yarn:

```bash
npm install smooth-components
# or
yarn add smooth-components
```

---

## 🖼️ Poster Component

The `Poster` component lets you display an image with customizable size, border, opacity, and an optional animated glint overlay—perfect for showcasing posters, artworks, or product previews.

### ✅ Usage

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

### 🔧 Props

| Prop                 | Type               | Default   | Description                                 |
| -------------------- | ------------------ | --------- | ------------------------------------------- |
| `alt`                | `string`           | —         | Alternative text for the image.             |
| `src`                | `string`           | —         | Image source path or URL.                   |
| `styles`             | `object`           | —         | Optional inline styles for the container.   |
| `styles.opacity`     | `number \| string` | `1`       | Opacity of the poster container.            |
| `styles.width`       | `number \| string` | `'200px'` | Width of the poster.                        |
| `styles.height`      | `number \| string` | `'300px'` | Height of the poster.                       |
| `styles.borderColor` | `string`           | `'#ccc'`  | Border color around the poster.             |
| `hasGlintEffect`     | `boolean`          | `true`    | Whether to show the animated glint overlay. |

> 💡 All style values can be in CSS units (`px`, `%`, `em`, etc.) or numbers (interpreted as pixels). The `glint` is a visual shimmer that moves across the image.

---

## 📝 License

Distributed under the MIT License.
See [LICENSE](LICENSE) for more information.

---

## 📬 Contact

* 🌐 **Portfolio**: [Visit my website](https://jaime00portfolio.netlify.app/)
* 💼 **LinkedIn**: [linkedin.com/in/jaime00](https://www.linkedin.com/in/jaime00)
* 📧 **Email**: [imjaimetorresv@gmail.com](mailto:imjaimetorresv@gmail.com)
* 🐙 **GitHub**: [github.com/jaime00](https://github.com/jaime00)
