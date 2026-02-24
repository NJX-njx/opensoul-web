---
summary: "Advanced setup and development workflows for OpenSoul"
read_when:
  - Setting up a new machine
  - You want “latest + greatest” without breaking your personal setup
title: "Setup"
---

# Setup

> **Note:**
> If you are setting up for the first time, start with [Getting Started](/start/getting-started).
> For wizard details, see [Onboarding Wizard](/start/wizard).

Last updated: 2026-01-01

## TL;DR

- **Tailoring lives outside the repo:** `~/.opensoul/workspace` (workspace) + `~/.opensoul/opensoul.json` (config).
- **Stable workflow:** install the macOS app; let it run the bundled Gateway.
- **Bleeding edge workflow:** run the Gateway yourself via `pnpm gateway:watch`, then let the macOS app attach in Local mode.

## Prereqs (from source)

- Node `>=22`
- `pnpm`
- Docker (optional; only for containerized setup/e2e — see [Docker](/install/docker))

## Tailoring strategy (so updates don’t hurt)

If you want “100% tailored to me” _and_ easy updates, keep your customization in:

- **Config:** `~/.opensoul/opensoul.json` (JSON/JSON5-ish)
- **Workspace:** `~/.opensoul/workspace` (skills, prompts, memories; make it a private git repo)

Bootstrap once:

```bash
opensoul setup
```

From inside this repo, use the local CLI entry:

```bash
opensoul setup
```

If you don’t have a global install yet, run it via `pnpm opensoul setup`.

## Run the Gateway from this repo

After `pnpm build`, you can run the packaged CLI directly:

```bash
node opensoul.mjs gateway --port 18789 --verbose
```

## Stable workflow (macOS app first)

1. Install + launch **OpenSoul.app** (menu bar).
2. Complete the onboarding/permissions checklist (TCC prompts).
3. Ensure Gateway is **Local** and running (the app manages it).
4. Link surfaces (example: WhatsApp):

```bash
opensoul channels login
```

5. Sanity check:

```bash
opensoul health
```

If onboarding is not available in your build:

- Run `opensoul setup`, then `opensoul channels login`, then start the Gateway manually (`opensoul gateway`).

## Bleeding edge workflow (Gateway in a terminal)

Goal: work on the TypeScript Gateway, get hot reload, keep the macOS app UI attached.

### 0) (Optional) Run the macOS app from source too

If you also want the macOS app on the bleeding edge:

```bash
./scripts/restart-mac.sh
```

### 1) Start the dev Gateway

```bash
pnpm install
pnpm gateway:watch
```

`gateway:watch` runs the gateway in watch mode and reloads on TypeScript changes.
