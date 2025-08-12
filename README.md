# KOH Web - 企业官网

基于 Astro 构建的现代化企业官网，支持多语言（中文/英文/高棉语）和自动部署。

## ✨ 特性

- 🚀 **Astro** - 现代化静态站点生成器
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🌍 **多语言支持** - 中文、英文、高棉语
- 📱 **响应式设计** - 适配各种设备
- ⚡ **自动部署** - GitHub Actions + Vercel
- 🔧 **TypeScript** - 类型安全的开发体验

## 📁 项目结构

```text
/
├── .github/workflows/     # GitHub Actions 工作流
├── public/               # 静态资源
│   ├── media/           # 媒体文件
│   ├── partner/         # 合作伙伴 Logo
│   └── ...
├── src/
│   ├── components/      # Astro 组件
│   ├── i18n/           # 国际化配置
│   ├── layouts/        # 页面布局
│   ├── pages/          # 页面文件
│   └── styles/         # 样式文件
├── astro.config.mjs    # Astro 配置
├── vercel.json         # Vercel 部署配置
└── tailwind.config.js  # Tailwind 配置
```

## 🛠️ 开发命令

所有命令都在项目根目录的终端中运行：

| 命令                      | 说明                                             |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | 安装依赖                                         |
| `npm run dev`             | 启动开发服务器 `localhost:4321`                  |
| `npm run build`           | 构建生产版本到 `./dist/`                         |
| `npm run preview`         | 本地预览构建结果                                 |
| `npm run astro ...`       | 运行 Astro CLI 命令                             |
| `npm run astro -- --help` | 获取 Astro CLI 帮助                             |

## 🚀 部署

### GitHub 自动部署（推荐）

项目已配置 GitHub Actions 自动部署到 Vercel：

1. **设置 GitHub Secrets**：参考 [GITHUB_AUTO_DEPLOY_SETUP.md](./GITHUB_AUTO_DEPLOY_SETUP.md)
2. **推送代码**：推送到 `main` 分支自动部署到生产环境
3. **预览部署**：创建 Pull Request 自动生成预览环境

### 本地部署

```bash
# 构建项目
npm run build

# 使用 Vercel CLI 部署
vercel --prod
```

## 📚 相关文档

- [GITHUB_AUTO_DEPLOY_SETUP.md](./GITHUB_AUTO_DEPLOY_SETUP.md) - GitHub 自动部署设置
- [VERCEL_500_ERROR_SOLUTIONS.md](./VERCEL_500_ERROR_SOLUTIONS.md) - Vercel 错误解决方案
- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - 环境配置指南

## 🔗 技术栈

- [Astro](https://docs.astro.build) - 静态站点生成器
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [TypeScript](https://www.typescriptlang.org) - 类型安全
- [Vercel](https://vercel.com) - 部署平台
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 📄 许可证

本项目采用 MIT 许可证。
# Test GitHub Actions deployment
