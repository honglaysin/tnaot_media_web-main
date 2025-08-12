# 从本地部署迁移到 GitHub 自动部署

本指南将帮助你从本地手动部署切换到 GitHub Actions 自动部署。

## 🎯 迁移目标

- ✅ 自动化部署流程
- ✅ 团队协作更便捷
- ✅ 预览环境支持
- ✅ 部署历史记录
- ✅ 减少人工错误

## 📋 迁移清单

### 1. 准备工作

- [ ] 确保代码已推送到 GitHub
- [ ] 确保 Vercel 项目正常运行
- [ ] 备份当前的部署配置

### 2. 配置 GitHub Actions

- [ ] GitHub Actions 工作流已创建（`.github/workflows/deploy.yml`）
- [ ] 获取 Vercel 项目信息
- [ ] 配置 GitHub Secrets
- [ ] 测试自动部署

### 3. 清理本地配置（可选）

完成迁移后，你可以选择清理一些本地部署相关的文件：

```bash
# 删除本地 Vercel 配置（可选）
rm -rf .vercel

# 从 .gitignore 中移除 .vercel（如果你想跟踪项目配置）
# 编辑 .gitignore 文件
```

## 🔧 详细步骤

### 步骤 1：获取 Vercel 项目信息

```bash
# 确保你已登录 Vercel
vercel login

# 如果项目还没有链接到 Vercel，先链接
vercel link

# 查看项目配置
cat .vercel/project.json
```

记录输出中的 `orgId` 和 `projectId`。

### 步骤 2：获取 Vercel Token

1. 访问 [Vercel Tokens](https://vercel.com/account/tokens)
2. 创建新的 Token，命名为 `github-actions`
3. 复制生成的 Token

### 步骤 3：配置 GitHub Secrets

在 GitHub 仓库中添加以下 Secrets：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 添加以下 Secrets：
   - `VERCEL_TOKEN`: 步骤 2 中获取的 Token
   - `VERCEL_ORG_ID`: 步骤 1 中的 `orgId`
   - `VERCEL_PROJECT_ID`: 步骤 1 中的 `projectId`

### 步骤 4：测试自动部署

```bash
# 提交并推送 GitHub Actions 配置
git add .
git commit -m "feat: 配置 GitHub Actions 自动部署"
git push origin main
```

推送后，检查：
1. GitHub Actions 页面是否显示工作流运行
2. Vercel Dashboard 是否显示新的部署
3. 网站是否正常访问

## 🔄 工作流对比

### 之前：本地部署
```bash
# 每次部署需要手动执行
npm run build
vercel --prod
```

### 现在：自动部署
```bash
# 只需推送代码
git push origin main
# GitHub Actions 自动处理构建和部署
```

## 🛠️ 故障排除

### 常见问题

**1. GitHub Actions 失败：权限错误**
```
Error: Insufficient permissions
```
**解决方案**：检查 `VERCEL_TOKEN` 是否正确设置

**2. 找不到 Vercel 项目**
```
Error: Project not found
```
**解决方案**：检查 `VERCEL_ORG_ID` 和 `VERCEL_PROJECT_ID` 是否正确

**3. 构建失败**
```
Error: Build failed
```
**解决方案**：检查本地是否能正常构建 (`npm run build`)

### 调试步骤

1. **检查 GitHub Actions 日志**
   - 进入 GitHub 仓库 → Actions
   - 点击失败的工作流查看详细日志

2. **验证 Secrets 配置**
   - 确保所有必需的 Secrets 都已设置
   - 检查 Secret 名称是否正确（区分大小写）

3. **本地测试**
   ```bash
   # 测试本地构建
   npm run build
   
   # 测试 Vercel CLI
   vercel --prod
   ```

## 📈 迁移后的优势

### 开发体验提升
- 🚀 **自动化**：推送代码即部署
- 🔍 **预览环境**：每个 PR 都有独立预览
- 📊 **部署历史**：完整的部署记录
- 👥 **团队协作**：统一的部署流程

### 运维优势
- 🛡️ **一致性**：每次部署环境相同
- 🔄 **可重复**：部署过程标准化
- 📝 **可追溯**：Git 历史与部署关联
- ⚡ **快速回滚**：通过 Git 快速回滚

## 🎉 迁移完成

恭喜！你已经成功迁移到 GitHub 自动部署。现在你可以：

1. **专注开发**：不再需要手动部署
2. **团队协作**：团队成员推送代码即可部署
3. **预览功能**：PR 自动生成预览环境
4. **监控部署**：通过 GitHub Actions 和 Vercel Dashboard 监控

## 📚 相关文档

- [GITHUB_AUTO_DEPLOY_SETUP.md](./GITHUB_AUTO_DEPLOY_SETUP.md) - 详细设置指南
- [README.md](./README.md) - 项目概览
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Vercel 部署文档](https://vercel.com/docs/deployments)