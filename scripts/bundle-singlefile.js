import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const htmlPath = path.join(distDir, 'index.html');
const outPath = path.join(distDir, 'google-sites-embed.html');

if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// Inline CSS
const cssRegex = /<link rel="stylesheet"[^>]*href="\.\/assets\/([^"]+)"[^>]*>/;
const cssMatch = html.match(cssRegex);
if (cssMatch) {
  const cssFile = path.join(distDir, 'assets', cssMatch[1]);
  if (fs.existsSync(cssFile)) {
    const cssContent = fs.readFileSync(cssFile, 'utf8');
    html = html.replace(cssMatch[0], `<style>\n${cssContent}\n</style>`);
  }
}

// Inline JS (using regular script tag so it works seamlessly on file://, local server, and in Google Sites sandboxed iframes)
const jsRegex = /<script type="module"[^>]*src="\.\/assets\/([^"]+)"[^>]*><\/script>/;
const jsMatch = html.match(jsRegex);
if (jsMatch) {
  const jsFile = path.join(distDir, 'assets', jsMatch[1]);
  if (fs.existsSync(jsFile)) {
    const jsContent = fs.readFileSync(jsFile, 'utf8');
    html = html.replace(jsMatch[0], `<script>\n${jsContent}\n</script>`);
  }
}

fs.writeFileSync(outPath, html, 'utf8');
console.log(`Generated single-file embed: ${outPath} (${Math.round(fs.statSync(outPath).size / 1024)} KB)`);
