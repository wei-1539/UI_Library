# Component By Storybook

這是一個以 **Nuxt + Vue 3 + Storybook** 為基礎的元件庫練習專案。  
專案主軸是根據《為你自己寫 Vue Component》文章與書籍中的觀念，練習把元件做成可重用、可文件化的 UI Library。

---

## 專案目標

- 練習元件庫設計思維：`Props`、`Slots`、`Events`、受控/非受控模式
- 建立一致的元件 API 與命名方式（Atom / Common 分層）
- 使用 Storybook 建立互動式文件，讓每個元件可視化驗證
- 在開發階段就先把使用方式、邊界行為、範例情境整理清楚

---

## 技術組成

- `Nuxt 3`
- `Vue 3` + `TypeScript`
- `Storybook`（`@nuxtjs/storybook`）
- `Tailwind CSS`
- `@floating-ui/vue`（用於 Popover 類型元件定位）

---

## 目前練習內容（節錄）

- Atom 元件：`Button`、`Icon`、`Breadcrumb`、`Pagination`
- Common 元件：`Tab`、`Marquee`、`Poppover`
- Storybook stories + MDX 文件撰寫
- Popover 的受控 / 非受控行為設計與示範

---

## 專案啟動

安裝依賴：

```bash
npm install
```

啟動 Nuxt 開發環境：

```bash
npm run dev
```

啟動 Storybook：

```bash
npm run storybook
```

---

## 常用指令

```bash
# 開發
npm run dev

# Storybook（元件文件）
npm run storybook

# 打包 Storybook
npm run build-storybook

# 打包 Nuxt
npm run build

# 預覽 Nuxt build
npm run preview

# Lint
npm run lint
npm run lint:fix
```

---

## 學習定位

這個 repo 不是單純「做出畫面」，而是偏向元件工程化練習：

- 同一顆元件要能在不同情境重用
- 文件（Storybook）要能讓人快速理解 API 與行為
- 寫法要兼顧實作彈性與維護性

如果你也在練習建立自己的 Vue 元件庫，這個專案可以當成一個逐步演進的實作筆記。
