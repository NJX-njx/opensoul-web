import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/NJX-njx/opensoul.git';
const TEMP_DIR = path.join(__dirname, '..', 'temp_docs_repo');
const TARGET_DIR = path.join(__dirname, '..', 'docs');

async function syncDocs() {
  console.log('🔄 Starting documentation sync...');

  // 1. Clean temp dir
  if (fs.existsSync(TEMP_DIR)) {
    console.log('cleaning temp dir...');
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // 2. Clone repo (sparse checkout for speed if possible, but full clone is safer for simple scripts)
  console.log(`📥 Cloning ${REPO_URL}...`);
  try {
    execSync(`git clone --depth 1 ${REPO_URL} ${TEMP_DIR}`, { stdio: 'inherit' });
  } catch (e) {
    console.error('❌ Clone failed:', e);
    process.exit(1);
  }

  // 3. Copy docs folder
  const sourceDocs = path.join(TEMP_DIR, 'docs');
  
  if (!fs.existsSync(sourceDocs)) {
    console.error('❌ Source docs folder not found!');
    process.exit(1);
  }

  console.log('📂 Copying files...');
  
  // Ensure target dir exists
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  // Recursive copy function
  function copyRecursive(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = stats && stats.isDirectory();

    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  copyRecursive(sourceDocs, TARGET_DIR);

  // 4. Generate README.md if not exists or needs update
  // We'll let VitePress handle the index via its own config, 
  // but we might want to ensure there's an index.md
  const indexFile = path.join(TARGET_DIR, 'index.md');
  if (!fs.existsSync(indexFile)) {
    console.log('📝 Generating index.md...');
    const content = `---
layout: home

hero:
  name: "OpenSoul Docs"
  text: "Your AI Soul Companion"
  tagline: "Comprehensive guides and documentation"
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/NJX-njx/opensoul

features:
  - title: Platform Guides
    details: Native apps for macOS, iOS, Android, and Windows.
  - title: Channel Setup
    details: Connect WhatsApp, Telegram, Discord, and more.
  - title: Skills & Tools
    details: Extend capabilities with 50+ built-in skills.
---
`;
    fs.writeFileSync(indexFile, content);
  }

  // 5. Cleanup
  console.log('🧹 Cleaning up...');
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  console.log('✅ Documentation synced successfully!');
}

syncDocs();
