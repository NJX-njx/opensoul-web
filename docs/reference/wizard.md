---
summary: "Full reference for the CLI onboarding wizard: every step, flag, and config field"
read_when:
  - Looking up a specific wizard step or flag
  - Automating onboarding with non-interactive mode
  - Debugging wizard behavior
title: "Onboarding Wizard Reference"
sidebarTitle: "Wizard Reference"
---

# Onboarding Wizard Reference

This is the full reference for the `opensoul onboard` CLI wizard.
For a high-level overview, see [Onboarding Wizard](/start/wizard).

## Flow details (local mode)

### Existing config detection
- If `~/.opensoul/opensoul.json` exists, choose **Keep / Modify / Reset**.
- Re-running the wizard does **not** wipe anything unless you explicitly choose **Reset**
  (or pass `--reset`).
- If the config is invalid or contains legacy keys, the wizard stops and asks
  you to run `opensoul doctor` before continuing.
- Reset uses `trash` (never `rm`) and offers scopes:
  - Config only
  - Config + credentials + sessions
  - Full reset (also removes workspace)

### Model/Auth
- **Anthropic API key (recommended)**: uses `ANTHROPIC_API_KEY` if present or prompts for a key, then saves it for daemon use.
- **Anthropic OAuth (Claude Code CLI)**: on macOS the wizard checks Keychain item "Claude Code-credentials" (choose "Always Allow" so launchd starts don't block); on Linux/Windows it reuses `~/.claude/.credentials.json` if present.
- **Anthropic token (paste setup-token)**: run `claude setup-token` on any machine, then paste the token (you can name it; blank = default).
- **OpenAI Code (Codex) subscription (Codex CLI)**: if `~/.codex/auth.json` exists, the wizard can reuse it.
- **OpenAI Code (Codex) subscription (OAuth)**: browser flow; paste the `code#state`.
  - Sets `agents.defaults.model` to `openai-codex/gpt-5.2` when model is unset or `openai/*`.
- **OpenAI API key**: uses `OPENAI_API_KEY` if present or prompts for a key, then saves it to `~/.opensoul/.env` so launchd can read it.
- **xAI (Grok) API key**: prompts for `XAI_API_KEY` and configures xAI as a model provider.
- **OpenCode Zen (multi-model proxy)**: prompts for `OPENCODE_API_KEY` (or `OPENCODE_ZEN_API_KEY`, get it at https://opencode.ai/auth).
- **API key**: stores the key for you.
- **Vercel AI Gateway (multi-model proxy)**: prompts for `AI_GATEWAY_API_KEY`.
- More detail: [Vercel AI Gateway](/providers/vercel-ai-gateway)
- **Cloudflare AI Gateway**: prompts for Account ID, Gateway ID, and `CLOUDFLARE_AI_GATEWAY_API_KEY`.
- More detail: [Cloudflare AI Gateway](/providers/cloudflare-ai-gateway)
- **MiniMax M2.1**: config is auto-written.
- More detail: [MiniMax](/providers/minimax)
- **Synthetic (Anthropic-compatible)**: prompts for `SYNTHETIC_API_KEY`.
- More detail: [Synthetic](/providers/synthetic)
- **Moonshot (Kimi K2)**: config is auto-written.
- **Kimi Coding**: config is auto-written.
- More detail: [Moonshot AI (Kimi + Kimi Coding)](/providers/moonshot)
- **Skip**: no auth configured yet.
- Pick a default model from detected options (or enter provider/model manually).
- Wizard runs a model check and warns if the configured model is unknown or missing auth.
- OAuth credentials live in `~/.opensoul/credentials/oauth.json`; auth profiles live in `~/.opensoul/agents/<agentId>/agent/auth-profiles.json` (API keys + OAuth).
- More detail: [/concepts/oauth](/concepts/oauth)

> **Note:**
> Headless/server tip: complete OAuth on a machine with a browser, then copy
> `~/.opensoul/credentials/oauth.json` (or `$OPENSOUL_STATE_DIR/credentials/oauth.json`) to the
> gateway host.

### Workspace
- Default `~/.opensoul/workspace` (configurable).
- Seeds the workspace files needed for the agent bootstrap ritual.
- Full workspace layout + backup guide: [Agent workspace](/concepts/agent-workspace)

### Gateway
- Port, bind, auth mode, tailscale exposure.
- Auth recommendation: keep **Token** even for loopback so local WS clients must authenticate.
- Disable auth only if you fully trust every local process.
- Non‑loopback binds still require auth.

### Channels
- [WhatsApp](/channels/whatsapp): optional QR login.
- [Telegram](/channels/telegram): bot token.
- [Discord](/channels/discord): bot token.
- [Google Chat](/channels/googlechat): service account JSON + webhook audience.
- [Mattermost](/channels/mattermost) (plugin): bot token + base URL.
- [Signal](/channels/signal): optional `signal-cli` install + account config.
- [BlueBubbles](/channels/bluebubbles): **recommended for iMessage**; server URL + password + webhook.
- [iMessage](/channels/imessage): legacy `imsg` CLI path + DB access.
- DM security: default is pairing. First DM sends a code; approve via `opensoul pairing approve <channel> <code>` or use allowlists.

### Daemon install
- macOS: LaunchAgent
  - Requires a logged-in user session; for headless, use a custom LaunchDaemon (not shipped).
- Linux (and Windows via WSL2): systemd user unit
  - Wizard attempts to enable lingering via `loginctl enable-linger <user>` so the Gateway stays up after logout.
  - May prompt for sudo (writes `/var/lib/systemd/linger`); it tries without sudo first.
- **Runtime selection:** Node (recommended; required for WhatsApp/Telegram). Bun is **not recommended**.

### Health check
- Starts the Gateway (if needed) and runs `opensoul health`.
- Tip: `opensoul status --deep` adds gateway health probes to status output (requires a reachable gateway).

### Skills (recommended)
- Reads the available skills and checks requirements.
- Lets you choose a node manager: **npm / pnpm** (bun not recommended).
- Installs optional dependencies (some use Homebrew on macOS).
