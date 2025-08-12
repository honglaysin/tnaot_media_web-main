#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('[fix-runtime] 开始修复运行时配置...');

// 查找所有 .vc-config.json 文件
let configFiles = [];
try {
  const findResult = execSync('find .vercel -name ".vc-config.json" -type f 2>/dev/null || true', { encoding: 'utf8' });
  configFiles = findResult.trim().split('\n').filter(file => file.length > 0);
} catch (error) {
  console.log('[fix-runtime] 查找配置文件时出错:', error.message);
}

if (configFiles.length === 0) {
  console.log('[fix-runtime] 未找到任何 .vc-config.json 文件');
  process.exit(0);
}

console.log(`[fix-runtime] 找到 ${configFiles.length} 个配置文件:`, configFiles);

let fixedCount = 0;

for (const configPath of configFiles) {
  if (fs.existsSync(configPath)) {
    console.log(`[fix-runtime] 处理配置文件: ${configPath}`);
    
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      console.log(`[fix-runtime] 原始配置内容: ${JSON.stringify(config)}`);
      
      if (config.runtime) {
        console.log(`[fix-runtime] 发现 runtime 字段: "${config.runtime}"`);
        config.runtime = 'nodejs20.x';
        console.log('[fix-runtime] 已设置 runtime 为 nodejs20.x');
        
        // 确保必要的字段存在
        if (!config.handler) {
          config.handler = '../../_functions/entry.mjs';
        }
        // 修复handler路径（这是关键修复）
        config.handler = '../../_functions/entry.mjs';
        if (!config.launcherType) {
          config.launcherType = 'Nodejs';
        }
        if (config.supportsResponseStreaming === undefined) {
          config.supportsResponseStreaming = true;
        }
        
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log(`[fix-runtime] 配置已修复并保存: ${configPath}`);
        console.log(`[fix-runtime] 新配置内容: ${JSON.stringify(config)}`);
        fixedCount++;
      } else {
        console.log(`[fix-runtime] 文件 ${configPath} 未发现 runtime 字段，无需修复`);
      }
    } catch (error) {
      console.log(`[fix-runtime] 处理文件 ${configPath} 时出错:`, error.message);
    }
  } else {
    console.log(`[fix-runtime] 配置文件不存在: ${configPath}`);
  }
}

console.log(`[fix-runtime] 修复完成，共修复了 ${fixedCount} 个文件`);