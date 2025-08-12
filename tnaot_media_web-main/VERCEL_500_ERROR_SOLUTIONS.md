# Vercel 500 错误完整解决方案

## 问题描述

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/_functions/entry.mjs'
```

## 解决方案汇总

### 方案 1: 修复 Handler 路径（推荐）

**问题**: `.vc-config.json` 中的 `handler` 路径不正确

**解决步骤**:

1. 确保 `package.json` 中的 `fix-runtime` 脚本正确:
```json
{
  "scripts": {
    "build": "astro build && npm run fix-runtime",
    "fix-runtime": "node -e \"const fs = require('fs'); const path = '.vercel/output/functions/_render.func/.vc-config.json'; if (fs.existsSync(path)) { const config = JSON.parse(fs.readFileSync(path, 'utf8')); config.runtime = 'nodejs22.x'; config.handler = '../../../_functions/entry.mjs'; fs.writeFileSync(path, JSON.stringify(config, null, 2)); console.log('Fixed runtime to nodejs22.x and handler path'); }\""
  }
}
```

2. 重新构建:
```bash
npm run build
```

### 方案 2: Astro 配置优化

**在 `astro.config.mjs` 中添加 Vercel 适配器配置**:

```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    functionPerRoute: false,
    edgeMiddleware: false,
  }),
  // ... 其他配置
});
```

### 方案 3: Vercel.json 配置

**在 `vercel.json` 中明确指定函数配置**:

```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "functions": {
    "_render.func/index.js": {
      "runtime": "nodejs22.x"
    }
  },
  "github": {
    "autoDeployment": true
  }
}
```

### 方案 4: 手动路径验证

**验证文件结构**:
```bash
# 检查文件是否存在
ls -la .vercel/output/_functions/entry.mjs
ls -la .vercel/output/functions/_render.func/.vc-config.json

# 验证路径关系
cd .vercel/output/functions/_render.func/
ls -la ../../../_functions/entry.mjs
```

### 方案 5: 完全重新部署

如果以上方案都不起作用:

1. **删除 `.vercel` 目录**:
```bash
rm -rf .vercel
```

2. **重新构建**:
```bash
npm run build
```

3. **重新部署到 Vercel**:
```bash
vercel --prod
```

## 调试命令

```bash
# 检查当前配置
cat .vercel/output/functions/_render.func/.vc-config.json

# 检查文件结构
find .vercel/output -name "entry.mjs" -type f

# 验证路径
cd .vercel/output/functions/_render.func && ls -la ../../../_functions/
```

## 预防措施

1. **确保构建脚本包含修复步骤**:
```json
{
  "scripts": {
    "build": "astro build && npm run fix-runtime"
  }
}
```

2. **使用 Node.js 版本管理**:
```bash
# 使用 .nvmrc 文件
echo "22" > .nvmrc
nvm use
```

3. **定期验证部署**:
```bash
# 本地预览
npm run preview

# 检查构建输出
npm run build && echo "Build successful"
```

## 常见错误模式

| 错误信息 | 可能原因 | 解决方案 |
|---------|---------|----------|
| `Cannot find module '/_functions/entry.mjs'` | Handler 路径错误 | 方案 1 |
| `FUNCTION_INVOCATION_FAILED` | 函数配置问题 | 方案 2 + 3 |
| `Runtime not supported` | Node.js 版本问题 | 更新 runtime 配置 |
| `Module not found` | 依赖问题 | 检查 package.json |

---

**最后更新**: 2025年1月30日  
**版本**: v1.0