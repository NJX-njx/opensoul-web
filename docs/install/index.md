---
summary: "Install OpenSoul — installer script, npm/pnpm, from source, Docker, and more"
read_when:
  - You need an install method other than the Getting Started quickstart
  - You want to deploy to a cloud platform
  - You need to update, migrate, or uninstall
title: "Install"
---

# Install

Already followed [Getting Started](/start/getting-started)? You're all set — this page is for alternative install methods, platform-specific instructions, and maintenance.

## System requirements

- **[Node 22+](/install/node)** (the [installer script](#install-methods) will install it if missing)
- macOS, Linux, or Windows
- `pnpm` only if you build from source

> **Note:**
> On Windows, we strongly recommend running OpenSoul under [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install).

## Install methods

> **Tip:**
> The **installer script** is the recommended way to install OpenSoul. It handles Node detection, installation, and onboarding in one step.

### Installer script
Downloads the CLI, installs it globally via npm, and launches the onboarding wizard.

#### macOS / Linux / WSL2
```bash
curl -fsSL https://opensoul.ai/install.sh | bash
```

#### Windows (PowerShell)
```powershell
iwr -useb https://opensoul.ai/install.ps1 | iex
```

That's it — the script handles Node detection, installation, and onboarding.

To skip onboarding and just install the binary:

#### macOS / Linux / WSL2
```bash
curl -fsSL https://opensoul.ai/install.sh | bash -s -- --no-onboard
```

#### Windows (PowerShell)
```powershell
& ([scriptblock]::Create((iwr -useb https://opensoul.ai/install.ps1))) -NoOnboard
```

For all flags, env vars, and CI/automation options, see [Installer internals](/install/installer).

### npm / pnpm
If you already have Node 22+ and prefer to manage the install yourself:

#### npm
```bash
npm install -g opensoul@latest
opensoul onboard --install-daemon
```

### sharp build errors?
If you have libvips installed globally (common on macOS via Homebrew) and `sharp` fails, force prebuilt binaries:

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g opensoul@latest
```

If you see `sharp: Please add node-gyp to your dependencies`, either install build tooling (macOS: Xcode CLT + `npm install -g node-gyp`) or use the env var above.

#### pnpm
```bash
pnpm add -g opensoul@latest
pnpm approve-builds -g        # approve opensoul, node-llama-cpp, sharp, etc.
opensoul onboard --install-daemon
```

> **Note:**
> pnpm requires explicit approval for packages with build scripts. After the first install shows the "Ignored build scripts" warning, run `pnpm approve-builds -g` and select the listed packages.
