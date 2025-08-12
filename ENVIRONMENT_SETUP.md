# 环境变量设置说明

为了确保应用正常运行，需要在 Vercel 控制台中设置以下环境变量：

## 必需的环境变量

### Telegram Bot Configuration
- `TELEGRAM_BOT_TOKEN`: 您的 Telegram Bot Token
- `TELEGRAM_CHAT_ID`: 接收消息的 Telegram 聊天 ID

## 在 Vercel 中设置环境变量

1. 登录 Vercel 控制台
2. 进入项目设置
3. 点击 "Environment Variables" 选项卡
4. 添加上述环境变量

## 本地开发环境设置

在项目根目录创建 `.env` 文件：

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here
```

**注意：** 不要将 `.env` 文件提交到代码仓库中。 