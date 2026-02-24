---
read_when:
  - 向新用户介绍 OpenSoul
summary: OpenSoul — 你的 AI 灵魂伴侣。自托管 AI 智能体，支持 30+ 消息渠道。
title: OpenSoul
x-i18n:
  generated_at: "2026-02-04T17:53:40Z"
  model: claude-opus-4-5
  provider: pi
  source_hash: fc8babf7885ef91d526795051376d928599c4cf8aff75400138a0d7d9fa3b75f
  source_path: index.md
  workflow: 15
---

# OpenSoul 🦞

<p align="center">
  <img src="/assets/girl1.png" alt="OpenSoul Companion" width="300" style="border-radius: 16px; box-shadow: 0 0 30px rgba(255,255,255,0.15);" />
</p>

> _"去壳！去壳！"_ — 大概是一只太空龙虾说的

<p align="center">
  <strong>你的 AI 灵魂伴侣 — 聊天、协作、创造。</strong><br />
  自托管 AI 智能体，支持 WhatsApp、Telegram、Discord、Slack 等 30+ 渠道。
  生活与工作中的个人 AI 伴侣。
</p>

### [入门指南](/start/getting-started)
安装 OpenSoul 并在几分钟内启动 Gateway 网关。

### [运行向导](/start/wizard)
通过 `opensoul onboard` 和配对流程进行引导式设置。

### [打开控制界面](/web/control-ui)
启动浏览器仪表板，管理聊天、配置和会话。

OpenSoul 通过单个 Gateway 网关进程将聊天应用连接到 Pi 等 AI 智能体。支持情感陪伴、生产力协作和编程辅助，可本地或远程部署。

## 工作原理

```mermaid
flowchart LR
  A["Chat apps + plugins"] --> B["Gateway"]
  B --> C["Pi agent"]
  B --> D["CLI"]
  B --> E["Web Control UI"]
  B --> F["macOS app"]
  B --> G["iOS and Android nodes"]
```

Gateway 网关是会话、路由和渠道连接的唯一事实来源。

## 核心功能

### 多渠道 Gateway 网关
通过单个 Gateway 网关进程连接 WhatsApp、Telegram、Discord 和 iMessage。

### 插件渠道
通过扩展包添加 Mattermost 等更多渠道。

### 多智能体路由
按智能体、工作区或发送者隔离会话。

### 媒体支持
发送和接收图片、音频和文档。

### Web 控制界面
浏览器仪表板，用于聊天、配置、会话和节点管理。

### 移动节点
配对 iOS 和 Android 节点，支持 Canvas。

## 快速开始

### 安装 OpenSoul
```bash
npm install -g opensoul@latest
```

### 新手引导并安装服务
```bash
opensoul onboard --install-daemon
```

### 配对 WhatsApp 并启动 Gateway 网关
```bash
opensoul channels login
opensoul gateway --port 18789
```

需要完整的安装和开发环境设置？请参阅[快速开始](/start/quickstart)。

## 仪表板

Gateway 网关启动后，打开浏览器控制界面。

- 本地默认地址：http://127.0.0.1:18789/
- 远程访问：[Web 界面](/web/index)和 [Tailscale](/gateway/tailscale)

## 配置（可选）

配置文件位于 `~/.opensoul/opensoul.json`。

- 如果你**不做任何修改**，OpenSoul 将使用内置的 Pi 二进制文件以 RPC 模式运行，并按发送者创建独立会话。
- 如果你想要限制访问，可以从 `channels.whatsapp.allowFrom` 和（针对群组的）提及规则开始配置。

示例：

```json5
{
  channels: {
    whatsapp: {
      allowFrom: ["+15555550123"],
      groups: { "*": { requireMention: true } },
    },
  },
  messages: { groupChat: { mentionPatterns: ["@opensoul"] } },
}
```

## 从这里开始

### [文档中心](/start/hubs)
所有文档和指南，按用例分类。

### [配置](/gateway/configuration)
核心 Gateway 网关设置、令牌和提供商配置。

### [远程访问](/gateway/remote)
SSH 和 tailnet 访问模式。

### [渠道](/channels/telegram)
WhatsApp、Telegram、Discord 等渠道的具体设置。

### [节点](/nodes/index)
iOS 和 Android 节点的配对与 Canvas 功能。

### [帮助](/help/index)
常见修复方法和故障排除入口。

## 了解更多

### [完整功能列表](/concepts/features)
全部渠道、路由和媒体功能。

### [多智能体路由](/concepts/multi-agent)
工作区隔离和按智能体的会话管理。

### [安全](/gateway/security/index)
令牌、白名单和安全控制。

### [故障排除](/gateway/troubleshooting)
Gateway 网关诊断和常见错误。

### [关于与致谢](/reference/credits)
项目起源、贡献者和许可证。
