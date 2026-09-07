// Dependency-free public-asset server for local development and Replit.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
function createServer() {
  return http.createServer((req, res) => {
    const reply = (status, body) => { res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' }); res.end(req.method === 'HEAD' ? undefined : body); };
    if (!['GET', 'HEAD'].includes(req.method)) { res.setHeader('Allow', 'GET, HEAD'); return reply(405, 'Method not allowed'); }
    let route;
    try { route = decodeURIComponent(req.url.split('?')[0]); } catch { return reply(400, 'Invalid request'); }
    if (route === '/') route = '/index.html';
    // Only these public files can be read. Source control and configuration stay private.
    const publicRoot = ['/index.html', '/styles.css', '/app.js'];
    if (!publicRoot.includes(route) && !/^\/assets\/[a-zA-Z0-9_-]+\.(svg|webp|png|jpg|ttf|woff2|txt)$/.test(route)) return reply(404, 'Nothing here. Big Roo has declined to comment.');
    fs.readFile(path.join(__dirname, route), (error, bytes) => {
      if (error) return reply(error.code === 'ENOENT' ? 404 : 500, 'File unavailable');
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(route)], 'Content-Length': bytes.length, 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Cache-Control': route.startsWith('/assets/') ? 'public, max-age=3600' : 'no-cache' });
      res.end(req.method === 'HEAD' ? undefined : bytes);
    });
  });
}
if (require.main === module) {
  const port = process.env.PORT || 3000;
  createServer().listen(port, '0.0.0.0', () => console.log('Stop Big Roo running on port ' + port));
}
module.exports = { createServer };
