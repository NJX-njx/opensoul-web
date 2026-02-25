# OpenSoul 全方位指南

本指南旨在为您提供 OpenSoul 项目的深度解析，涵盖方案设计、技术架构及详细的使用说明。无论您是初次接触的新用户，还是希望深入了解底层原理的开发者，都能在这里找到所需信息。

## 1. 方案说明 (Scheme)

### 1.1 应用场景与业务目标
OpenSoul 致力于构建一个**永远在线的个人 AI 灵魂伴侣（Soul Companion）**。它不仅仅是一个聊天机器人，更是一个能够深度集成到您日常生活中的智能代理。

*   **核心场景**：
    *   **多渠道统一接入**：通过 WhatsApp、Telegram、Discord、Signal 等主流通讯软件与您的 AI 代理互动，无需切换应用。
    *   **个人助理**：AI 可以代表您执行本地命令、管理文件、查询信息，甚至通过 Home Assistant 控制智能家居。
    *   **全天候陪伴**：基于长期记忆（Memory）和个性化设定（Persona），AI 能够记住您的喜好、历史对话，提供更有温度的陪伴。

### 1.2 解决的问题
*   **碎片化交互**：解决了 AI 能力分散在不同 App 中的问题，通过统一网关（Gateway）聚合所有交互。
*   **隐私与控制**：不同于云端 AI 服务，OpenSoul 强调**本地优先**。您的数据、记忆和执行逻辑运行在您控制的设备上（Local First）。
*   **执行力缺失**：赋予 AI 实际的操作能力（Tools & Skills），使其从“聊天”进化为“办事”。

### 1.3 预期效果
构建一个属于您的高可定制、安全且强大的 AI 代理系统。它既是您的数字分身，也是您最得力的助手，能够跨越设备和平台，随时响应您的需求。

---

## 2. 技术实现 (Technical Implementation)

### 2.1 技术架构
OpenSoul 采用中心化的 **Gateway（网关）** 架构，通过 WebSocket 协议连接各种客户端和节点。

*   **核心组件**：
    *   **Gateway (Daemon)**：系统的核心心脏。负责维护与各消息平台（WhatsApp/Telegram 等）的连接，处理消息路由，并管理鉴权与安全性。
    *   **Clients**：控制平面客户端，包括 CLI 命令行工具、Web 控制台（Dashboard）和桌面应用。它们通过 WebSocket 连接网关进行管理和交互。
    *   **Nodes**：执行节点（macOS/iOS/Android/Headless）。这些节点也连接到网关，提供具体的设备能力（如摄像头、定位、屏幕录制等）。

### 2.2 关键技术选型
*   **运行时**：基于 **Node.js (>=22)**，利用其强大的异步处理能力和丰富的生态系统。
*   **通信协议**：**WebSocket**。保证了低延迟的双向通信，支持实时消息推送和流式传输（Streaming）。
*   **消息适配**：
    *   **WhatsApp**: 使用 `Baileys` 库实现无头协议接入。
    *   **Telegram**: 使用 `grammY` 框架构建高效 Bot。
*   **数据存储**：本地文件系统 + JSON/Markdown。采用人类可读的格式存储配置和记忆，方便备份与版本控制（Git）。

### 2.3 核心机制
*   **沙盒与安全 (Sandboxing)**：默认情况下，外部会话运行在沙盒环境中，限制对宿主机的访问权限，确保安全。只有授权的主代理（Main Agent）才能执行敏感操作。
*   **设备配对 (Pairing)**：采用基于设备 ID 的配对机制。所有连接网关的客户端都需要通过握手和签名验证，确保只有受信任的设备能接入网络。

---

## 3. 使用指南 (Usage Guide)

### 3.1 安装与配置
OpenSoul 支持 macOS、Linux 和 Windows (WSL2)。

**快速安装命令**：

*   **macOS / Linux**:
    ```bash
    curl -fsSL https://opensoul.ai/install.sh | bash
    ```

*   **Windows (PowerShell)**:
    ```powershell
    iwr -useb https://opensoul.ai/install.ps1 | iex
    ```

**初始化配置**：
安装完成后，使用向导进行配置：
```bash
opensoul onboard --install-daemon
```
该向导将引导您完成：
1.  选择网关模式（本地/远程）。
2.  配置 AI 模型提供商（如 Anthropic, OpenAI）。
3.  接入消息渠道（WhatsApp, Telegram 等）。

### 3.2 启动与运行
如果您在安装时选择了后台服务模式，OpenSoul 会自动运行。您可以通过以下命令检查状态：
```bash
opensoul gateway status
```

手动启动网关：
```bash
opensoul gateway --port 18789
```

### 3.3 功能使用
*   **控制台 (Dashboard)**：
    运行 `opensoul dashboard` 打开 Web 管理界面，您可以在这里查看连接状态、管理会话和调试 AI 响应。

*   **双手机模式 (推荐)**：
    对于 WhatsApp 用户，建议准备一个专用手机号作为 AI 助理。使用您的主手机扫描 OpenSoul 生成的二维码，即可实现主号与 AI 助理的对话，避免消息混淆。

*   **工作区 (Workspace)**：
    您的 AI 代理的“大脑”位于 `~/.opensoul/workspace`。
    *   `AGENTS.md`: 定义代理的人设和指令。
    *   `TOOLS.md`: 配置代理可使用的工具。
    *   建议将此目录纳入 Git 版本控制，以备份您的个性化设置。

### 3.4 API 接口与开发
OpenSoul 提供了丰富的 API 供开发者扩展功能：
*   **Gateway Protocol**: 网关通信协议详解，请参考 [Gateway Protocol](/gateway/protocol)。
*   **OpenAI 兼容接口**: 支持通过 OpenAI SDK 调用 OpenSoul，请参考 [OpenAI HTTP API](/gateway/openai-http-api)。
*   **插件开发**: 了解如何编写插件，请参考 [Plugin SDK](/refactor/plugin-sdk)。

### 3.5 常见问题 (FAQ)
*   **Q: 如何重置配置？**
    A: 使用 `opensoul reset` 命令可以重置网关配置。
*   **Q: 如何查看日志？**
    A: 运行 `opensoul logs` 查看实时运行日志，有助于排查连接问题。

更多详细文档请参考：
*   [快速开始](/start/getting-started)
*   [架构详解](/concepts/architecture)
*   [安装指南](/install/index)
