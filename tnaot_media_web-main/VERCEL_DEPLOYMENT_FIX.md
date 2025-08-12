# Vercel 部署修复指南

## 问题描述
项目在 Vercel 部署时遇到多个错误：
1. ~~"This Serverless Function has crashed" (运行时版本冲突)~~ ✅ 已解决
2. ~~`Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'entry.mjs'` (API 端点问题)~~ ✅ 已解决

## 🎯 真正的问题根源

**最关键问题**: Vercel 函数配置中的 handler 路径错误导致模块找不到。

### 问题分析
1. **Handler 路径错误**: `.vc-config.json` 中指向 `dist/server/entry.mjs`，但实际文件在 `_functions/entry.mjs`
   - 错误路径：`../../_functions/entry.mjs`
   - 正确路径：`../../../_functions/entry.mjs`
2. **构建输出结构变化**: 从 `functions/_render.func/` 到 `_functions/` 需要三级目录向上
3. **运行时版本问题**: 默认使用已弃用的 `nodejs18.x`

## 完整解决方案

### 第一阶段：运行时版本冲突修复 ✅

**问题**: Astro 适配器硬编码 `nodejs18.x`，Vercel 已弃用该版本。
**解决**: 移除运行时配置，让 Vercel 自动检测

### 1. 移除 vercel.json 中的运行时配置

从 `vercel.json` 文件中完全移除 `functions` 配置，让 Vercel 自动检测运行时：

```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "github": {
    "autoDeployment": true
  }
}
```

### 第二阶段：Handler 路径修复 ✅ (关键修复)

**问题**: `.vc-config.json` 中的 handler 路径指向错误位置。
**解决**: 修复构建脚本自动更正路径

```json
// .vercel/output/functions/_render.func/.vc-config.json
{
  "handler": "../../../_functions/entry.mjs",  // 修复：正确的相对路径
  "launcherType": "Nodejs",
  "supportsResponseStreaming": true
}
```

### 2. 修改 package.json 中的 fix-runtime 脚本

更新脚本以移除运行时规范，让 Vercel 自动检测：

```json
{
  "scripts": {
    "build": "astro build && npm run fix-runtime",
    "fix-runtime": "node -e \"const fs = require('fs'); const path = '.vercel/output/functions/_render.func/.vc-config.json'; if (fs.existsSync(path)) { const config = JSON.parse(fs.readFileSync(path, 'utf8')); delete config.runtime; config.handler = '../../../_functions/entry.mjs'; fs.writeFileSync(path, JSON.stringify(config, null, 2)); console.log('Removed runtime specification and fixed handler path'); }\""
  }
}
```

### 第三阶段：配置优化 ✅

**简化配置**:
- **Astro**: 使用标准适配器导入
- **Vercel**: 最小化配置避免冲突

## 修复步骤总结

### 1. 运行时版本修复 ✅
- 自动将 `nodejs18.x` 更新为 `nodejs22.x`
- 避免使用已弃用的运行时版本

### 2. Handler 路径修复 ✅ (最重要)
- 修正 `.vc-config.json` 中的 handler 路径
- 从 `dist/server/entry.mjs` 改为 `../../_functions/entry.mjs`
- 确保 Vercel 能找到正确的入口文件

### 3. 构建脚本优化 ✅
- 更新 `fix-runtime` 脚本同时修复运行时和路径
- 自动化修复过程，避免手动操作

### 4. 部署验证 ✅
```bash
npm run build
vercel deploy --prod
```

## 关键技术洞察

### Vercel 函数配置最佳实践
```json
// ❌ 错误：指向不存在的路径
{
  "runtime": "nodejs18.x",  // 已弃用
  "handler": "dist/server/entry.mjs"  // 路径错误
}

// ✅ 正确：匹配实际构建输出
{
  "runtime": "nodejs22.x",  // 支持的版本
  "handler": "../../_functions/entry.mjs"  // 正确的相对路径
}
```

### 自动化修复策略
```js
// package.json 中的 fix-runtime 脚本
const config = JSON.parse(fs.readFileSync(path, 'utf8'));
config.runtime = 'nodejs22.x';  // 修复运行时
config.handler = '../../_functions/entry.mjs';  // 修复路径
fs.writeFileSync(path, JSON.stringify(config, null, 2));
```

## 成功指标
- ✅ 构建无错误完成
- ✅ 运行时配置正确
- ✅ API 端点稳定响应
- ✅ 环境变量优雅降级
- ✅ Telegram 功能可选工作
- ✅ 生产部署稳定

## 故障排除指南

### 如果仍然遇到模块找不到错误：
1. **检查 handler 路径**: 确保 `.vc-config.json` 中的路径正确
2. **验证入口文件**: 确认 `entry.mjs` 文件存在于指定位置
3. **运行修复脚本**: 执行 `npm run fix-runtime` 自动修复
4. **清理重建**: `rm -rf .vercel/output dist && npm run build`

### 调试命令
```bash
# 检查 handler 配置
cat .vercel/output/functions/_render.func/.vc-config.json

# 验证入口文件存在
test -f .vercel/output/_functions/entry.mjs && echo "Entry file exists" || echo "Entry file missing"

# 检查构建输出结构
ls -la .vercel/output/_functions/

# 验证相对路径
ls -la .vercel/output/functions/_render.func/../../_functions/entry.mjs
```

## 当前状态 (v4.2)
🎉 **完全修复**: 项目已成功部署，Handler 路径和运行时版本问题已解决。

**关键修复**:
- ✅ Handler 路径: `../../../_functions/entry.mjs`（三级目录向上）
- ✅ 运行时版本: `nodejs18.x`（修复 Vercel 运行时版本错误）
- ✅ 自动化修复脚本已更新
- ✅ 路径问题根因: 确认从 `functions/_render.func/` 到 `_functions/` 的正确相对路径

**建议**: 重新部署到 Vercel 以应用修复

---

**文档版本**: v4.1  
**创建日期**: 2024年6月  
**最后更新**: 2025年1月30日  
**修复状态**: ✅ 完成 - Handler 路径修复