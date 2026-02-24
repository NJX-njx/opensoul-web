import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to auto-generate sidebar
function getSidebar(rootDir) {
  // However, dynamically generating sidebar at config time in VitePress is tricky if files change.
  // We'll do a one-pass scan of the `docs` directory (excluding .vitepress).
  
  const docsPath = path.resolve(__dirname, '..');
  
  function buildSidebar(dir, relativePath = '/') {
    // If directory doesn't exist (e.g. during initial build before content), return empty
    if (!fs.existsSync(dir)) return [];

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    // Filter and sort: directories first, then files
    const sortedEntries = entries
      .filter(e => !e.name.startsWith('.') && e.name !== '.vitepress' && (e.isDirectory() || e.name.endsWith('.md')))
      .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      });

    const items = [];

    for (const entry of sortedEntries) {
      const entryPath = path.join(dir, entry.name);
      const entryRelativePath = path.posix.join(relativePath, entry.name); // Use posix for URLs

      if (entry.isDirectory()) {
        const children = buildSidebar(entryPath, entryRelativePath);
        if (children.length) {
          items.push({
            text: entry.name.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            items: children,
            collapsed: true
          });
        }
      } else {
        if (entry.name === 'index.md') continue;
        const link = entryRelativePath.replace('.md', '');
        items.push({
          text: entry.name.replace('.md', '').replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
          link: link
        });
      }
    }
    return items;
  }

  return buildSidebar(docsPath);
}

const sidebar = getSidebar(path.resolve(__dirname, '..'));

export default defineConfig({
  base: '/docs/',
  outDir: '../public/docs',
  title: "OpenSoul",
  description: "Your AI Soul Companion Documentation",
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // Preconnect to Google Fonts if needed, but using local fonts is better or system fonts
  ],

  themeConfig: {
    // logo: '/logo.svg',
    siteTitle: 'OpenSoul Docs',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started' }, // Assuming this file exists or will exist
      { text: 'GitHub', link: 'https://github.com/NJX-njx/opensoul' }
    ],

    sidebar: sidebar, // Use the auto-generated sidebar

    socialLinks: [
      { icon: 'github', link: 'https://github.com/NJX-njx/opensoul' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present OpenSoul Contributors'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/NJX-njx/opensoul/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    
    outline: {
        level: [2, 3],
        label: 'On this page'
    }
  },

  markdown: {
    lineNumbers: true,
    // Add anchor links to headings
    anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }
  }
});
