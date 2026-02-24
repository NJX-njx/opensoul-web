---
summary: "Get OpenSoul installed and run your first chat in minutes."
read_when:
  - First time setup from zero
  - You want the fastest path to a working chat
title: "Getting Started"
---

# Getting Started

Goal: go from zero to a first working chat with minimal setup.

> **Info:**
> Fastest chat: open the Control UI (no channel setup needed). Run `opensoul dashboard`
> and chat in the browser, or open `http://127.0.0.1:18789/` on the
> gateway host.
> Docs: [Dashboard](/web/dashboard) and [Control UI](/web/control-ui).

Recommended path: use the **CLI onboarding wizard** (`opensoul onboard`). It configures:

- Model/Auth (OAuth recommended)
- Gateway settings
- Channels (WhatsApp, Telegram, Discord, etc.)
- Pairing defaults (secure DMs)
- Workspace bootstrapping + Skills
- Optional background services

For deeper reference, see: [Wizard](/start/wizard), [Setup](/start/setup), [Pairing](/channels/pairing), [Security](/gateway/security/index).

### Sandbox Note
`agents.defaults.sandbox.mode: "non-main"` uses `session.mainKey` (default `"main"`), so group/channel sessions are sandboxed. If you want a main agent to always run on the host, set an explicit per-agent override:

```json
{
  "routing": {
    "agents": {
      "main": {
        "workspace": "~/.opensoul/workspace",
        "sandbox": { "mode": "off" }
      }
    }
  }
}
```

## 0) Prereqs

- Node `>=22`
- `pnpm` (optional; recommended if building from source)
- **Recommended:** Brave Search API key for web search. Easiest path: `opensoul configure --section web` (stores `tools.web.search.apiKey`). See [Web tools](/tools/web).

**macOS:** If you plan to build the app, install Xcode / CLT. For CLI + Gateway only, Node is enough.
**Windows:** Use **WSL2** (Ubuntu recommended). Native Windows is untested and has more tool compatibility issues. See [Windows (WSL2)](/platforms/windows).

## 1) Install OpenSoul (CLI)

### macOS/Linux
```bash
curl -fsSL https://opensoul.ai/install.sh | bash
```

### Windows (PowerShell)
```powershell
iwr -useb https://opensoul.ai/install.ps1 | iex
```

> **Note:**
> Other install methods and requirements: [Install](/install/index).

## 2) Run the onboarding wizard

```bash
opensoul onboard --install-daemon
```

You will choose:
- **Local vs Remote** Gateway.
- **Auth**: Anthropic API key (recommended) or OAuth.
- **Providers**: WhatsApp QR login, Telegram/Discord bot tokens, etc.
- **Daemon**: Background installation (launchd/systemd).
- **Gateway Token**: Generated and stored in `gateway.auth.token`.

See [Onboarding Wizard](/start/wizard) for details.

## 3) Check the Gateway

If you installed the service, it should already be running:

```bash
opensoul gateway status
```

Manual run (foreground):
```bash
opensoul gateway --port 18789 --verbose
```
