# Claude Code 双系统配置说明

## 概述

同时维护两套 Claude Code：

| 命令 | 类型 | 用途 | 配置位置 |
|------|------|------|----------|
| `claude` | 官方版 | 连接 Anthropic 官方 API | `~/.claude/settings.json` |
| `cc` | 修改版 (claude-code-haha) | 连接百炼 Coding Plan (国内) | 本目录 `.env` |

---

## 1. 官方 `claude`（Anthropic 官方）

### 配置
```bash
# ~/.claude/settings.json
{
  "language": "中文"
}
```

### 使用
```bash
claude
```

### 特点
- 连接 Anthropic 官方 API (api.anthropic.com)
- 需要代理或海外网络
- 使用官方 Claude 模型 (Sonnet/Opus/Haiku)

---

## 2. `cc` - Claude Code Haha（百炼 Coding Plan）

### 配置
```bash
# ~/Documents/GitHub/claude-code-haha/.env
ANTHROPIC_AUTH_TOKEN=sk-sp-4e00e7f2f2bb42eda7eeb8782be4ccf5
ANTHROPIC_BASE_URL=https://coding.dashscope.aliyuncs.com/apps/anthropic
ANTHROPIC_MODEL=qwen3-coder-plus
# ... 其他模型配置见 .env 文件
```

### 使用
```bash
cc
```

### 特点
- 连接阿里云百炼 Coding Plan（国内直连）
- 无需代理
- 使用千问系列模型 (Qwen3 Coder/Max/Plus)
- 源码可编辑，便于定制和调试

---

## 快速切换

```bash
# 使用官方 Claude（海外网络）
claude

# 使用百炼版（国内直连）
cc
```

---

## 故障排查

### `cc` 卡住 "Hatching…"

可能原因：
1. **源码问题** - claude-code-haha 是修改版，可能有 bug
2. **模型配置** - 检查 `.env` 中的模型名称是否正确
3. **网络问题** - 虽然百炼是国内，但仍需检查连通性

调试方法：
```bash
cd ~/Documents/GitHub/claude-code-haha
# 查看源码中的 API 调用逻辑
grep -r "fetch\|axios" src/
```

### `claude` 无法连接

需要代理或海外网络：
```bash
export HTTPS_PROXY=http://127.0.0.1:7890  # 或其他代理
claude
```

---

## 配置变更记录

- **2026-04-07**: 分离两套配置，官方 `claude` 恢复原始配置，`cc` 保留百炼配置
