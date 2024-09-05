[![NPM Version][npm-version-shield]][npm-package]
![npm bundle size][bundle-shield]

# Klee
An Unreal Engine Blueprint visualizer for the web.

> [!NOTE]
> This package has been forked from its original creator to support newer implementations
> and include a default react component

## Install (New)
```bash
npm i @dirtycajunrice/klee
```

## Usage
```tsx
import { Blueprint } from "@dirtycajunrice/klee";

const myCode = `...`
export const MyComponent = () => {
  return (
    <Blueprint code={myCode} className="w-full h-40" />
  )
}
```

## Build  (Original)
To build a standalone minified JavaScript file of the original klee you have to install the development dependencies:
```bash
npm install
```

As soon as the dependencies are installed you can run the following command to build a minified JavaScript file.
```bash
npm run build:original
```

You can find the output at `dist/klee.min.js` relative to the root of the project directory.

## Development setup

```bash
npm install
npm run dev
```

[npm-version-shield]: https://img.shields.io/npm/v/%40dirtycajunrice%2Fklee?style=for-the-badge&logo=npm&labelColor=cb0000&color=grey
[npm-package]: https://www.npmjs.com/package/@dirtycajunrice/klee
[bundle-shield]: https://img.shields.io/bundlephobia/minzip/%40dirtycajunrice%2Fklee?style=for-the-badge&label=Bundle%20Size
