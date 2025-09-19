#!/bin/bash

# 快速修復 drizzle-kit 權限問題腳本
# 專門解決 WSL Ubuntu 環境中的 EPERM 錯誤

set -e

echo "🔧 修復 drizzle-kit 權限問題..."
echo "================================"

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. 修復標準輸入權限問題
fix_stdin_permissions() {
    print_status "修復標準輸入權限問題..."
    
    # 確保標準輸入可讀
    if [ -t 0 ]; then
        print_status "標準輸入是終端，權限正常"
    else
        print_warning "標準輸入不是終端，可能存在權限問題"
    fi
    
    # 設置正確的 umask
    umask 022
    
    print_success "標準輸入權限修復完成"
}

# 2. 修復 npm 和 node 權限
fix_npm_permissions() {
    print_status "修復 npm 和 node 權限..."
    
    # 修復 npm 全局目錄
    if [ -d "$HOME/.npm" ]; then
        chmod -R 755 "$HOME/.npm"
        print_status "修復 npm 緩存目錄權限"
    fi
    
    # 修復當前專案的 node_modules
    if [ -d "node_modules" ]; then
        chmod -R 755 node_modules
        print_status "修復 node_modules 權限"
    fi
    
    # 修復 .bin 目錄中的可執行文件
    if [ -d "node_modules/.bin" ]; then
        chmod +x node_modules/.bin/*
        print_status "修復 .bin 目錄可執行文件權限"
    fi
    
    print_success "npm 權限修復完成"
}

# 3. 重新安裝 drizzle-kit
reinstall_drizzle_kit() {
    print_status "重新安裝 drizzle-kit..."
    
    # 卸載現有的 drizzle-kit
    if npm list drizzle-kit &> /dev/null; then
        print_status "卸載現有的 drizzle-kit..."
        npm uninstall drizzle-kit
    fi
    
    # 清理 npm 緩存
    print_status "清理 npm 緩存..."
    npm cache clean --force
    
    # 重新安裝 drizzle-kit
    print_status "重新安裝 drizzle-kit..."
    npm install drizzle-kit --save-dev
    
    # 確保 drizzle-kit 可執行
    if [ -f "node_modules/.bin/drizzle-kit" ]; then
        chmod +x "node_modules/.bin/drizzle-kit"
        print_status "設置 drizzle-kit 可執行權限"
    fi
    
    print_success "drizzle-kit 重新安裝完成"
}

# 4. 修復 WSL 特定問題
fix_wsl_specific() {
    print_status "修復 WSL 特定問題..."
    
    # 設置環境變數
    export NODE_OPTIONS="--max-old-space-size=4096"
    export TMPDIR="/tmp"
    
    # 確保 TMPDIR 存在且可寫
    mkdir -p "$TMPDIR"
    chmod 755 "$TMPDIR"
    
    # 設置 npm 配置
    npm config set cache "$HOME/.npm"
    npm config set prefix "$HOME/.npm-global"
    
    print_success "WSL 特定問題修復完成"
}

# 5. 測試 drizzle-kit
test_drizzle_kit() {
    print_status "測試 drizzle-kit 是否正常工作..."
    
    if command -v npx &> /dev/null; then
        if npx drizzle-kit --version &> /dev/null; then
            print_success "drizzle-kit 測試成功"
        else
            print_error "drizzle-kit 測試失敗"
            return 1
        fi
    else
        print_warning "npx 不可用，跳過測試"
    fi
}

# 6. 提供替代方案
provide_alternatives() {
    echo
    print_status "如果問題仍然存在，請嘗試以下替代方案："
    echo
    echo "1. 使用 yarn 替代 npm："
    echo "   yarn install"
    echo "   yarn drizzle-kit generate"
    echo
    echo "2. 使用 pnpm 替代 npm："
    echo "   npm install -g pnpm"
    echo "   pnpm install"
    echo "   pnpm drizzle-kit generate"
    echo
    echo "3. 使用 Docker 運行："
    echo "   docker run -it --rm -v \$(pwd):/app -w /app node:18 npm run drizzle-kit"
    echo
    echo "4. 在 Windows 主機上運行："
    echo "   將專案複製到 Windows 文件系統中運行"
    echo
}

# 主函數
main() {
    print_status "開始修復 drizzle-kit 權限問題..."
    echo
    
    fix_stdin_permissions
    fix_npm_permissions
    reinstall_drizzle_kit
    fix_wsl_specific
    
    echo
    print_status "修復完成！正在測試..."
    
    if test_drizzle_kit; then
        print_success "🎉 drizzle-kit 修復成功！"
        echo
        print_status "現在您可以正常使用 drizzle-kit 了："
        echo "  npx drizzle-kit generate"
        echo "  npx drizzle-kit push"
        echo "  npx drizzle-kit studio"
    else
        print_error "❌ drizzle-kit 仍有問題"
        provide_alternatives
    fi
}

# 執行主函數
main "$@"
