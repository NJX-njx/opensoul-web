---
summary: "OpenSoul capabilities across channels, routing, media, and UX."
read_when:
  - You want a full list of what OpenSoul supports
title: "Features"
---

## Highlights

### 30+ Channels
WhatsApp, Telegram, Discord, Slack, iMessage, Signal, Matrix, and more with a single Gateway.

### 50+ Skills
GitHub, Notion, Obsidian, Canvas, 1Password, and extensible plugin SDK.

### Multi-agent routing
Isolated sessions per agent, workspace, or sender.

### Media
Images, audio, and documents in and out.

### Cross-platform apps
Web Control UI, macOS, Windows, iOS, Android, CLI/TUI.

### Mobile nodes
iOS and Android nodes with Canvas support.

## Full list

### Channels (30+)
- WhatsApp (Baileys), Telegram (grammY), Discord, Slack, Signal, iMessage (BlueBubbles)
- Mattermost, Matrix, LINE, Zalo, Feishu, Google Chat, Microsoft Teams (plugins)
- Nextcloud Talk, Nostr, Twitch, WebChat, REST API, WebSocket

### Agent core
- Pi agent in RPC mode with tool streaming
- Multi-model support: OpenAI, Anthropic, AWS Bedrock, Ollama (local), and more
- Memory system with vector search (LanceDB)
- Multi-agent routing for isolated sessions per workspace or sender
- Subscription auth for Anthropic and OpenAI via OAuth
- Sessions: direct chats collapse into shared `main`; groups are isolated
- Group chat support with mention-based activation
- Streaming and chunking for long responses

### Media and voice
- Images, audio, and documents in and out
- Optional voice note transcription
- Voice Call extension with TTS/STT

### Apps and UI
- Web Control UI and WebChat
- macOS menu bar app
- Windows native desktop app (WPF)
- iOS and Android nodes with pairing and Canvas
- CLI and TUI for power users

> **Note:**
> Legacy Claude, Codex, Gemini, and Opencode paths have been removed. Pi is the only
> coding agent path.
