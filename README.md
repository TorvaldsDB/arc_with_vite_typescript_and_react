# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Why turn to Vite

https://blog.logrocket.com/build-react-typescript-app-vite/

## Material UI

`Tap` 最终的 html 元素, 不再是 `a` tag, 而是 `button`

`createStyles`, `makeStyles` have to be imported from `@mui/styles`

```js
import { createStyles, makeStyles } from "@mui/styles";
```

`styled` have to be imported from `@mui/material/styles` instead of ~~`@mui/styles`~~

```js
import { styled } from "@mui/material/styles";
```

## Responsive UI

https://mui.com/material-ui/guides/responsive-ui/

https://mui.com/material-ui/customization/breakpoints/#responsive-styles

- Relative Units
- Media Queries
- Grid System
- Breakpoints

### breakpoints

- xs（extra-small）: 小于 600 像素的设备，通常是手机竖屏。
- sm（small）: 600 像素到 899 像素之间的设备，通常是小型平板电脑或大型智能手机。
- md（medium）: 900 像素到 1199 像素之间的设备，通常是普通平板电脑或一些笔记本电脑。
- lg（large）: 1200 像素到 1535 像素之间的设备，通常是台式电脑或大型笔记本电脑。
- xl（extra-large）: 大于等于 1536 像素的设备，通常是大型显示器或高分辨率笔记本电脑。
