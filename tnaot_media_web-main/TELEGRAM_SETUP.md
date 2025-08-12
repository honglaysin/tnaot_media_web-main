# Telegram Bot 配置指南

本项目的联系表单会将提交的信息发送到指定的Telegram聊天中。以下是配置步骤：

## 1. 创建Telegram Bot

1. 在Telegram中搜索并打开 `@BotFather`
2. 发送 `/newbot` 命令
3. 按照提示设置机器人名称和用户名
4. 获取Bot Token（格式类似：`123456789:ABCdefGHIjklMNOpqrsTUVwxyz`）

## 2. 获取Chat ID

### 方法一：个人聊天
1. 在Telegram中搜索并打开 `@userinfobot`
2. 发送任意消息
3. 机器人会回复你的用户ID

### 方法二：群组聊天
1. 创建一个群组并将你的机器人添加进去
2. 在群组中发送一条消息
3. 访问以下URL（替换`<YourBOTToken>`为你的Bot Token）：
   ```
   https://api.telegram.org/bot<YourBOTToken>/getUpdates
   ```
4. 在返回的JSON中找到 `"chat":{"id":-xxxxxxxxx}` 中的ID值

## 3. 配置环境变量

1. 复制 `.env.example` 文件为 `.env`：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，填入获取到的配置：
   ```env
   TELEGRAM_BOT_TOKEN=你的Bot Token
   TELEGRAM_CHAT_ID=你的Chat ID
   ```

## 4. 测试配置

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问联系我们页面：`http://localhost:4321/contact`

3. 填写并提交表单，检查Telegram是否收到消息

## 消息格式

提交的表单会以以下格式发送到Telegram：

```
🔔 新的联系表单提交

👤 姓名: 张三
🏢 公司: ABC公司
📧 邮箱: zhangsan@example.com
📱 电话: 13800138000
🎯 服务类型: 媒体投稿发布
💰 预算范围: 1-5万
📝 详细需求:
我们需要进行品牌推广...

⏰ 提交时间: 2024/1/15 14:30:25
```

## 故障排除

### 常见问题

1. **Bot Token无效**
   - 确认Token格式正确
   - 确认机器人已创建成功

2. **Chat ID无效**
   - 确认Chat ID格式正确（个人ID为正数，群组ID为负数）
   - 确认机器人已添加到群组（如果使用群组）

3. **消息发送失败**
   - 检查网络连接
   - 确认机器人有发送消息的权限
   - 查看浏览器控制台的错误信息

### 调试方法

1. 检查API端点是否正常工作：
   ```bash
   curl -X POST http://localhost:4321/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"测试","email":"test@example.com","message":"测试消息"}'
   ```

2. 直接测试Telegram API：
   ```bash
   curl -X POST "https://api.telegram.org/bot<YourBOTToken>/sendMessage" \
     -H "Content-Type: application/json" \
     -d '{"chat_id":"<YourChatID>","text":"测试消息"}'
   ```

## 安全注意事项

1. **永远不要**将Bot Token提交到版本控制系统
2. 定期更换Bot Token
3. 限制机器人的权限范围
4. 考虑使用专门的群组来接收表单消息