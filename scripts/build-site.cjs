'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');

// Publish only runtime assets. Backups, development tools and test data stay out.
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const files = [
  'index.html', 'reading.html', 'words.html',
  'articles-data.js', 'editorial-data.js', 'dictionary-data.js',
  'curriculum-data.js', 'dialogues-data.js', 'learning-core.js',
  'learning-app.js', 'article-study.js', 'reader-ui.js', 'ui-assets.js',
  'design-system.css', 'learning.css', 'workspace-ui.css',
  'article-study.css', 'reader-ui.css', 'legacy-words-ui.css',
  'assets/favicon.svg', 'Shadow-Reading-English-Materials.md'
];

// Relative links must resolve under a project subdirectory on GitHub Pages.
const available = new Set(files);
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
    const value = match[1];
    if (/^(?:https?:|data:|blob:|mailto:|#)/.test(value)) continue;
    if (value.startsWith('/')) throw new Error(`Root-relative URL in ${file}: ${value}`);
    const target = value.split(/[?#]/)[0];
    if (target && !available.has(target)) throw new Error(`Missing runtime file in ${file}: ${target}`);
  }
}

fs.rmSync(output, {recursive: true, force: true});
for (const file of files) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.copyFileSync(path.join(root, file), destination);
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
const version = require('../package.json').version;
const revision = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim();
fs.writeFileSync(path.join(output, 'release.json'), JSON.stringify({version, revision}, null, 2) + '\n');
console.log(`Built Shadow Reading ${version}: ${files.length} runtime files, revision ${revision.slice(0, 7)}`);
