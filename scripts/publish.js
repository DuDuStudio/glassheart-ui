#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packages = [
  { name: 'core', path: 'packages/core' },
  { name: 'react', path: 'packages/react' },
  { name: 'vue', path: 'packages/vue' },
  { name: 'svelte', path: 'packages/svelte' },
  { name: 'js', path: 'packages/js' }
];

function buildPackage(pkg) {
  console.log(`🔨 Building ${pkg.name}...`);
  try {
    execSync(`cd ${pkg.path} && npm run build`, { stdio: 'inherit' });
    console.log(`✅ ${pkg.name} built successfully`);
  } catch (error) {
    console.error(`❌ Failed to build ${pkg.name}:`, error.message);
    process.exit(1);
  }
}

function publishPackage(pkg) {
  console.log(`📦 Publishing ${pkg.name}...`);
  try {
    execSync(`cd ${pkg.path} && npm publish`, { stdio: 'inherit' });
    console.log(`✅ ${pkg.name} published successfully`);
  } catch (error) {
    console.error(`❌ Failed to publish ${pkg.name}:`, error.message);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const packageName = args[0];
  
  if (packageName) {
    const pkg = packages.find(p => p.name === packageName);
    if (!pkg) {
      console.error(`❌ Package ${packageName} not found`);
      process.exit(1);
    }
    
    buildPackage(pkg);
    publishPackage(pkg);
  } else {
    // Build and publish all packages
    console.log('🚀 Building and publishing all packages...\n');
    
    // Build all packages first
    packages.forEach(buildPackage);
    
    console.log('\n📦 Publishing packages...\n');
    
    // Publish packages in order (core first)
    packages.forEach(publishPackage);
  }
  
  console.log('\n🎉 All packages published successfully!');
}

main();
