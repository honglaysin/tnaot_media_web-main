# GitHub 自动部署到 Vercel 设置指南

本指南将帮助你配置 GitHub Actions 自动部署到 Vercel。

## 🚀 功能特性

- **自动预览部署**：每个 Pull Request 都会自动创建预览环境
- **生产环境部署**：推送到 `main` 或 `master` 分支时自动部署到生产环境
- **Node.js 18**：使用稳定的 Node.js 18 运行时
- **缓存优化**：利用 npm 缓存加速构建

## 📋 前置要求

1. GitHub 仓库已创建并推送代码
2. Vercel 账户已创建
3. 项目已在 Vercel 中创建（可以先手动部署一次）

## 🔧 配置步骤

### 1. 获取 Vercel 项目信息

在本地项目目录运行以下命令：

```bash
# 登录 Vercel（如果还没登录）
vercel login

# 链接项目到 Vercel
vercel link

# 获取项目信息
cat .vercel/project.json
```

你会看到类似这样的输出：
```json
{
  "orgId": "team_xxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxx"
}
```

### 2. 获取 Vercel Token

1. 访问 [Vercel Dashboard](https://vercel.com/account/tokens)
2. 点击 "Create Token"
3. 输入 Token 名称（如：`github-actions`）
4. 选择适当的权限范围
5. 复制生成的 Token

### 3. 配置 GitHub Secrets

在 GitHub 仓库中设置以下 Secrets：

1. 进入 GitHub 仓库
2. 点击 `Settings` → `Secrets and variables` → `Actions`
3. 点击 `New repository secret` 添加以下 Secrets：

| Secret 名称 | 值 | 说明 |
|------------|----|---------|
| `VERCEL_TOKEN` | 从步骤2获取的 Token | Vercel API Token |
| `VERCEL_ORG_ID` | 从 project.json 的 `orgId` | Vercel 组织 ID |
| `VERCEL_PROJECT_ID` | 从 project.json 的 `projectId` | Vercel 项目 ID |

### 4. 推送代码触发部署

配置完成后，推送代码到 GitHub：

```bash
# 添加 GitHub Actions 工作流文件
git add .github/workflows/deploy.yml
git add GITHUB_AUTO_DEPLOY_SETUP.md
git commit -m "feat: 添加 GitHub Actions 自动部署配置"
git push origin main
```

## 🔄 工作流程说明

### Pull Request 流程
1. 创建 Pull Request
2. GitHub Actions 自动触发
3. 安装依赖并构建项目
4. 部署到 Vercel 预览环境
5. 在 PR 中查看预览链接

### 生产部署流程
1. 合并 PR 到 `main`/`master` 分支
2. GitHub Actions 自动触发
3. 安装依赖并构建项目
4. 部署到 Vercel 生产环境
5. 网站自动更新

## 🛠️ 故障排除

### 常见问题

**1. 部署失败：权限错误**
- 检查 `VERCEL_TOKEN` 是否正确
- 确保 Token 有足够的权限

**2. 找不到项目**
- 检查 `VERCEL_ORG_ID` 和 `VERCEL_PROJECT_ID` 是否正确
- 确保项目已在 Vercel 中创建

**3. 构建失败**
- 检查 `package.json` 中的构建脚本
- 查看 GitHub Actions 日志了解具体错误

### 调试命令

```bash
# 查看 Vercel 项目列表
vercel ls

# 查看项目详情
vercel inspect [project-name]

# 本地测试构建
npm run build
```

## 📚 相关文档

- [Vercel CLI 文档](https://vercel.com/docs/cli)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Astro 部署指南](https://docs.astro.build/en/guides/deploy/vercel/)

## 🔄 从本地部署迁移

如果你之前使用本地部署，现在可以：

1. 删除本地的 `.vercel` 目录（可选）
2. 移除 `package.json` 中的 `fix-runtime` 脚本（可选）
3. 专注于代码开发，让 GitHub Actions 处理部署

## ✅ 验证部署

部署成功后，你可以：

1. 在 GitHub Actions 页面查看部署状态
2. 在 Vercel Dashboard 查看部署历史
3. 访问你的网站确认更新

---

🎉 **恭喜！** 你已经成功配置了 GitHub 自动部署到 Vercel。现在每次推送代码都会自动部署，大大提高了开发效率！