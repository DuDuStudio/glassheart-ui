#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 開始建置 GlassHeartUI...\n');

try {
  // 清理 dist 目錄
  console.log('🧹 清理 dist 目錄...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }

  // 建置 TypeScript
  console.log('📦 建置 TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  // 建置 Rollup
  console.log('🔄 建置 Rollup 套件...');
  execSync('npx rollup -c', { stdio: 'inherit' });

  // 複製 CSS 文件
  console.log('🎨 複製 CSS 文件...');
  const cssDir = path.join('dist', 'css');
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  
  fs.copyFileSync('src/styles/global.css', path.join(cssDir, 'global.css'));
  fs.copyFileSync('src/styles/variables.css', path.join(cssDir, 'variables.css'));

  // 生成 package.json 用於發布
  console.log('📋 生成發布用 package.json...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const publishPackageJson = {
    ...packageJson,
    main: 'index.js',
    module: 'index.esm.js',
    types: 'index.d.ts',
    files: ['dist', 'css'],
    scripts: undefined,
    devDependencies: undefined,
  };
  
  fs.writeFileSync(
    path.join('dist', 'package.json'),
    JSON.stringify(publishPackageJson, null, 2)
  );

  // 生成 README
  console.log('📚 複製文檔...');
  fs.copyFileSync('doc.md', path.join('dist', 'README.md'));

  console.log('\n✅ 建置完成！');
  console.log('📁 輸出目錄: dist/');
  console.log('🎨 CSS 文件: dist/css/');
  console.log('📦 套件文件: dist/index.*');
  
} catch (error) {
  console.error('\n❌ 建置失敗:', error.message);
  process.exit(1);
}
