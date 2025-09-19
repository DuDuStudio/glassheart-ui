#!/bin/bash

# GlassHeartUI WSL Ubuntu 快速啟動腳本
# 解決 WSL 環境中的權限和依賴問題

set -e  # 遇到錯誤時立即退出

echo "🚀 GlassHeartUI WSL Ubuntu 快速啟動腳本"
echo "========================================"

# 檢查是否在 WSL 環境中
if ! grep -q Microsoft /proc/version 2>/dev/null; then
    echo "⚠️  警告：此腳本專為 WSL Ubuntu 環境設計"
    echo "   如果您不在 WSL 環境中，請使用其他啟動方式"
    read -p "是否繼續？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 函數：打印彩色消息
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 檢查並修復權限問題
fix_permissions() {
    print_status "檢查和修復權限設置..."
    
    # 修復 npm 全局目錄權限
    if [ -d "$HOME/.npm" ]; then
        chmod -R 755 "$HOME/.npm" 2>/dev/null || true
    fi
    
    # 修復 node_modules 權限
    if [ -d "node_modules" ]; then
        chmod -R 755 node_modules 2>/dev/null || true
    fi
    
    # 修復 .npm 緩存權限
    if [ -d "$HOME/.npm/_cacache" ]; then
        chmod -R 755 "$HOME/.npm/_cacache" 2>/dev/null || true
    fi
    
    print_success "權限修復完成"
}

# 檢查 Node.js 和 npm 版本
check_dependencies() {
    print_status "檢查依賴環境..."
    
    # 檢查 Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js 未安裝，請先安裝 Node.js"
        echo "建議使用 nvm 安裝："
        echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
        echo "source ~/.bashrc"
        echo "nvm install --lts"
        exit 1
    fi
    
    # 檢查 npm
    if ! command -v npm &> /dev/null; then
        print_error "npm 未安裝，請先安裝 npm"
        exit 1
    fi
    
    # 檢查 Bun（如果使用）
    if command -v bun &> /dev/null; then
        print_status "檢測到 Bun 運行時"
        BUN_VERSION=$(bun --version)
        print_success "Bun 版本: $BUN_VERSION"
    fi
    
    print_success "依賴環境檢查完成"
}

# 修復 WSL 特定的問題
fix_wsl_issues() {
    print_status "修復 WSL 特定問題..."
    
    # 設置正確的 umask
    umask 022
    
    # 確保 TMPDIR 存在且可寫
    export TMPDIR="${TMPDIR:-/tmp}"
    mkdir -p "$TMPDIR"
    chmod 755 "$TMPDIR"
    
    # 設置 npm 配置以避免權限問題
    npm config set cache "$HOME/.npm" --global
    npm config set prefix "$HOME/.npm-global" --global
    
    # 創建全局目錄
    mkdir -p "$HOME/.npm-global"
    
    print_success "WSL 問題修復完成"
}

# 清理和重新安裝依賴
clean_install() {
    print_status "清理並重新安裝依賴..."
    
    # 清理 npm 緩存
    npm cache clean --force 2>/dev/null || true
    
    # 刪除 node_modules 和 lock 文件
    if [ -d "node_modules" ]; then
        print_status "刪除現有的 node_modules..."
        rm -rf node_modules
    fi
    
    if [ -f "package-lock.json" ]; then
        print_status "刪除 package-lock.json..."
        rm -f package-lock.json
    fi
    
    if [ -f "yarn.lock" ]; then
        print_status "刪除 yarn.lock..."
        rm -f yarn.lock
    fi
    
    # 重新安裝依賴
    print_status "重新安裝依賴..."
    npm install --no-optional --legacy-peer-deps
    
    print_success "依賴安裝完成"
}

# 修復 drizzle-kit 特定問題
fix_drizzle_kit() {
    print_status "修復 drizzle-kit 權限問題..."
    
    # 檢查是否有 drizzle-kit
    if npm list drizzle-kit &> /dev/null; then
        print_status "檢測到 drizzle-kit，修復權限..."
        
        # 重新安裝 drizzle-kit
        npm uninstall drizzle-kit
        npm install drizzle-kit --save-dev
        
        # 修復 drizzle-kit 可執行文件權限
        if [ -f "node_modules/.bin/drizzle-kit" ]; then
            chmod +x "node_modules/.bin/drizzle-kit"
        fi
        
        print_success "drizzle-kit 修復完成"
    else
        print_warning "未檢測到 drizzle-kit，跳過修復"
    fi
}

# 啟動開發服務器
start_dev_server() {
    print_status "啟動開發服務器..."
    
    # 檢查可用的啟動命令
    if grep -q '"storybook"' package.json; then
        print_status "啟動 Storybook..."
        npm run storybook
    elif grep -q '"dev"' package.json; then
        print_status "啟動開發服務器..."
        npm run dev
    else
        print_warning "未找到開發服務器命令，請手動啟動"
        echo "可用的腳本："
        npm run
    fi
}

# 主函數
main() {
    echo
    print_status "開始 WSL Ubuntu 環境設置..."
    echo
    
    # 檢查參數
    case "${1:-}" in
        "clean")
            print_status "執行完整清理和重新安裝..."
            check_dependencies
            fix_wsl_issues
            fix_permissions
            clean_install
            fix_drizzle_kit
            print_success "清理和重新安裝完成！"
            ;;
        "fix")
            print_status "僅修復權限問題..."
            check_dependencies
            fix_wsl_issues
            fix_permissions
            fix_drizzle_kit
            print_success "權限修復完成！"
            ;;
        "start")
            print_status "啟動開發服務器..."
            start_dev_server
            ;;
        *)
            print_status "執行完整設置流程..."
            check_dependencies
            fix_wsl_issues
            fix_permissions
            
            # 詢問是否重新安裝依賴
            read -p "是否重新安裝依賴？這將刪除現有的 node_modules (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                clean_install
            fi
            
            fix_drizzle_kit
            
            print_success "設置完成！"
            echo
            echo "使用方法："
            echo "  ./scripts/wsl-setup.sh clean  - 完整清理和重新安裝"
            echo "  ./scripts/wsl-setup.sh fix    - 僅修復權限問題"
            echo "  ./scripts/wsl-setup.sh start  - 啟動開發服務器"
            echo
            ;;
    esac
}

# 執行主函數
main "$@"
