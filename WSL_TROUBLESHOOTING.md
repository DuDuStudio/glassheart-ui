# WSL Ubuntu 環境故障排除指南

本指南專門解決在 WSL Ubuntu 環境中使用 GlassHeartUI 時遇到的常見問題。

## 🚨 常見問題

### 1. EPERM: operation not permitted 錯誤

**問題描述：**
```
EPERM: operation not permitted, read
fd: 0,
syscall: "read",
errno: -1,
code: "EPERM"
```

**原因：**
- WSL 環境中的權限設置不當
- npm 緩存目錄權限問題
- 標準輸入流權限問題

**解決方案：**

#### 快速修復
```bash
# 使用我們提供的快速修復腳本
./scripts/fix-drizzle-kit.sh
```

#### 手動修復
```bash
# 1. 修復 npm 權限
sudo chown -R $(whoami) ~/.npm
chmod -R 755 ~/.npm

# 2. 修復專案權限
chmod -R 755 node_modules
chmod +x node_modules/.bin/*

# 3. 重新安裝問題包
npm uninstall drizzle-kit
npm install drizzle-kit --save-dev
chmod +x node_modules/.bin/drizzle-kit
```

### 2. drizzle-kit 無法讀取標準輸入

**問題描述：**
drizzle-kit 在嘗試讀取用戶輸入時失敗

**解決方案：**

#### 方案 1：使用非交互模式
```bash
# 使用 --yes 標誌跳過交互式確認
npx drizzle-kit push --yes
npx drizzle-kit generate --yes
```

#### 方案 2：重新安裝 drizzle-kit
```bash
# 完全重新安裝
npm uninstall drizzle-kit
rm -rf node_modules/.bin/drizzle-kit
npm install drizzle-kit --save-dev
chmod +x node_modules/.bin/drizzle-kit
```

#### 方案 3：使用替代包管理器
```bash
# 使用 yarn
yarn add drizzle-kit --dev
yarn drizzle-kit generate

# 或使用 pnpm
npm install -g pnpm
pnpm add drizzle-kit --dev
pnpm drizzle-kit generate
```

### 3. 文件系統權限問題

**問題描述：**
無法創建或修改文件，權限被拒絕

**解決方案：**

```bash
# 檢查當前用戶權限
whoami
id

# 修復專案目錄權限
sudo chown -R $(whoami):$(whoami) .
chmod -R 755 .

# 修復特定目錄
chmod 755 node_modules
chmod 755 dist
chmod 755 packages
```

### 4. npm 緩存問題

**問題描述：**
npm 安裝失敗或緩存損壞

**解決方案：**

```bash
# 清理 npm 緩存
npm cache clean --force

# 刪除 node_modules 和 lock 文件
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# 重新安裝
npm install
```

### 5. WSL 特定環境問題

**問題描述：**
WSL 環境中的特殊配置問題

**解決方案：**

```bash
# 設置正確的環境變數
export NODE_OPTIONS="--max-old-space-size=4096"
export TMPDIR="/tmp"

# 確保 TMPDIR 存在且可寫
mkdir -p /tmp
chmod 755 /tmp

# 設置 npm 配置
npm config set cache "$HOME/.npm"
npm config set prefix "$HOME/.npm-global"
```

## 🛠️ 完整修復流程

如果遇到多個問題，建議按以下順序執行完整修復：

```bash
# 1. 使用完整 WSL 設置腳本
./scripts/wsl-setup.sh clean

# 2. 如果仍有問題，手動執行以下步驟
sudo chown -R $(whoami):$(whoami) .
chmod -R 755 .

# 3. 清理並重新安裝
rm -rf node_modules package-lock.json yarn.lock
npm cache clean --force
npm install

# 4. 修復可執行文件權限
chmod +x node_modules/.bin/*

# 5. 測試 drizzle-kit
npx drizzle-kit --version
```

## 🔧 預防措施

為了避免這些問題，建議：

1. **定期更新 WSL**：
   ```bash
   wsl --update
   ```

2. **使用正確的文件系統**：
   - 將專案放在 WSL 文件系統中（如 `/home/username/projects/`）
   - 避免在 Windows 文件系統中運行 Node.js 專案

3. **設置正確的權限**：
   ```bash
   # 在 ~/.bashrc 中添加
   umask 022
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```

4. **使用包管理器版本管理器**：
   ```bash
   # 安裝 nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   nvm install --lts
   ```

## 🆘 如果問題仍然存在

如果上述方法都無法解決問題，請嘗試：

1. **使用 Docker**：
   ```bash
   # 創建 Dockerfile
   cat > Dockerfile << EOF
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   CMD ["npm", "run", "dev"]
   EOF
   
   # 構建和運行
   docker build -t glassheart-ui .
   docker run -it --rm -p 3000:3000 glassheart-ui
   ```

2. **在 Windows 主機上運行**：
   - 將專案複製到 Windows 文件系統
   - 使用 Windows 上的 Node.js 環境運行

3. **使用 GitHub Codespaces**：
   - 在 GitHub 上創建 Codespaces
   - 在雲端環境中開發

## 📞 獲取幫助

如果問題仍然無法解決，請：

1. 檢查 [GitHub Issues](https://github.com/DuDuStudio/glassheart-ui/issues)
2. 創建新的 Issue 並提供：
   - WSL 版本：`wsl --version`
   - Node.js 版本：`node --version`
   - npm 版本：`npm --version`
   - 完整的錯誤訊息
   - 已嘗試的解決方案

## 📚 相關資源

- [WSL 官方文檔](https://docs.microsoft.com/en-us/windows/wsl/)
- [Node.js WSL 最佳實踐](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [npm 故障排除](https://docs.npmjs.com/troubleshooting)
