import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const docsDir = path.resolve('docs');
const htmlPath = path.join(distDir, 'index.html');
const outPath = path.join(distDir, 'google-sites-embed.html');

if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Inline CSS
const cssRegex = /<link rel="stylesheet"[^>]*href="\.\/assets\/([^"]+)"[^>]*>/;
const cssMatch = html.match(cssRegex);
if (cssMatch) {
  const cssFile = path.join(distDir, 'assets', cssMatch[1]);
  if (fs.existsSync(cssFile)) {
    const cssContent = fs.readFileSync(cssFile, 'utf8');
    html = html.replace(cssMatch[0], () => `<style>\n${cssContent}\n</style>`);
  }
}

// 2. Inline JS (using regular script tag with a replacer function to prevent $& / $' regex substitution corruption)
const jsRegex = /<script type="module"[^>]*src="\.\/assets\/([^"]+)"[^>]*><\/script>/;
const jsMatch = html.match(jsRegex);
if (jsMatch) {
  const jsFile = path.join(distDir, 'assets', jsMatch[1]);
  if (fs.existsSync(jsFile)) {
    const jsContent = fs.readFileSync(jsFile, 'utf8');
    html = html.replace(jsMatch[0], () => `<script>\n${jsContent}\n</script>`);
  }
}

// 3. Clean up external references not present in Google Sites iframes
html = html.replace(/<link rel="icon"[^>]*>/gi, '');
html = html.replace(/<link rel="apple-touch-icon"[^>]*>/gi, '');
html = html.replace(/<link rel="manifest"[^>]*>/gi, '');
html = html.replace(/<script>\s*if\s*\('serviceWorker'[\s\S]*?<\/script>/gi, '');
html = html.replace(/<script>\s*\/\/\s*If served statically[\s\S]*?<\/script>/gi, '');

fs.writeFileSync(outPath, html, 'utf8');
console.log(`Generated single-file embed: ${outPath} (${Math.round(fs.statSync(outPath).size / 1024)} KB)`);

// 4. Mirror dist to docs/ so GitHub Pages works automatically with "Deploy from branch -> main -> /docs"
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
fs.cpSync(distDir, docsDir, { recursive: true });
console.log(`Mirrored dist/ to docs/ for GitHub Pages compatibility`);
