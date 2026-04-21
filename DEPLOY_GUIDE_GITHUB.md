# GitHub Pages 部署指南

如果您想要將此專案發布到 **GitHub Pages**，請遵循以下步驟：

### 1. 確保 Vite 設定正確
我已經在 `vite.config.ts` 中設定了 `base: './'`，這能確保資源路徑正確。

### 2. 手動部署方式
1. 在本地執行 `npm install`。
2. 執行 `npm run build`。這會產生一個 `dist` 資料夾。
3. 將 `dist` 資料夾內的**所有內容**上傳到 GitHub 儲存庫的 `gh-pages` 分支，或主分支的 `docs` 資料夾（需在 GitHub Settings 中設定）。

### 3. 自動化部署 (GitHub Actions) - 推薦
在您的 GitHub 儲存庫中建立檔案 `.github/workflows/deploy.yml`，並貼入以下內容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ] # 或者是您的預設分支名稱

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install
      - run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. GitHub 儲存庫設定
1. 進入 GitHub 儲存庫的 **Settings** > **Pages**。
2. 在 **Build and deployment** > **Source** 下，選擇 **GitHub Actions**。

---

**注意：** 如果您是使用 GitHub Pages 這種「靜態託管」，`server.ts` 指令將不會在 GitHub 上執行（因為 Pages 只支援靜態檔案）。如果您需要全端功能（如真正的資料庫），則需要部署到 Vercel 或 Render。
