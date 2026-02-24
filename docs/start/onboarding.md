---
summary: "First-run onboarding flow for OpenSoul (macOS app)"
read_when:
  - Designing the macOS onboarding assistant
  - Implementing auth or identity setup
title: "Onboarding (macOS App)"
sidebarTitle: "Onboarding: macOS App"
---

# Onboarding (macOS App)

This doc describes the **current** first‑run onboarding flow. The goal is a
smooth “day 0” experience: pick where the Gateway runs, connect auth, run the
wizard, and let the agent bootstrap itself.

### Approve macOS warning

<img src="/assets/macos-onboarding/01-macos-warning.jpeg" alt="" />

### Approve find local networks

<img src="/assets/macos-onboarding/02-local-networks.jpeg" alt="" />

### Welcome and security notice

<img src="/assets/macos-onboarding/03-security-notice.png" alt="Read the security notice displayed and decide accordingly" />

> *Read the security notice displayed and decide accordingly*

### Local vs Remote

<img src="/assets/macos-onboarding/04-choose-gateway.png" alt="" />

Where does the **Gateway** run?

- **This Mac (Local only):** onboarding can run OAuth flows and write credentials
  locally.
- **Remote (over SSH/Tailnet):** onboarding does **not** run OAuth locally;
  credentials must exist on the gateway host.
- **Configure later:** skip setup and leave the app unconfigured.

> **Tip:**
> **Gateway auth tip:**
> - The wizard now generates a **token** even for loopback, so local WS clients must authenticate.
> - If you disable auth, any local process can connect; use that only on fully trusted machines.
> - Use a **token** for multi‑machine access or non‑loopback binds.

### Permissions

<img src="/assets/macos-onboarding/05-permissions.png" alt="Choose what permissions do you want to give OpenSoul" />

> *Choose what permissions do you want to give OpenSoul*

Onboarding requests TCC permissions needed for:

- Automation (AppleScript)
- Notifications
- Accessibility
- Screen Recording
- Microphone
- Speech Recognition
- Camera
- Location

### CLI

> **Info:**
> This step is optional

The app can install the global `opensoul` CLI via npm/pnpm so terminal
workflows and launchd tasks work out of the box.

### Onboarding Chat (dedicated session)

After setup, the app opens a dedicated onboarding chat session so the agent can
introduce itself and guide next steps. This keeps first‑run guidance separate
from your normal conversation. See [Bootstrapping](/start/bootstrapping) for
what happens on the gateway host during the first agent run.
