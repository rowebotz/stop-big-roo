const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { createServer } = require('../server');
const { assessRisk, encounter, QUESTIONS } = require('../app');

test('all 81 complete quiz paths produce bounded results; incomplete input is rejected', () => {
  assert.equal(assessRisk([]), null);
  assert.equal(assessRisk([40, 25, 30]), null);
  assert.equal(assessRisk([40, 25, 30, 999]), null);
  const outcomes = new Set();
  for (const a of QUESTIONS[0].options) for (const b of QUESTIONS[1].options) for (const c of QUESTIONS[2].options) for (const d of QUESTIONS[3].options) {
    const result = assessRisk([a[1], b[1], c[1], d[1]]);
    assert.ok(result.score >= 6 && result.score <= 99);
    assert.ok(result.note.length > 20);
    outcomes.add(result.title);
  }
  assert.equal(outcomes.size, 4);
  assert.equal(assessRisk([40, 25, 30, 20]).score, 99);
  assert.equal(assessRisk([4, 0, 2, 0]).score, 6);
});

test('encounter outcomes change across the supported slider range', () => {
  assert.equal(new Set([90, 180, 220, 330].map(w => encounter(w)[0])).size, 4);
  for (let w = 90; w <= 330; w += 5) assert.ok(encounter(w)[1].includes(String(w)));
});

test('public server delivers assets, rejects private paths and survives malformed URLs', async t => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const request = (route, method = 'GET') => new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port: server.address().port, path: route, method }, res => {
      const parts = []; res.on('data', chunk => parts.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(parts) }));
    }); req.on('error', reject); req.end();
  });
  const home = await request('/'); assert.equal(home.status, 200); assert.match(home.body.toString(), /BIG LEGS/);
  for (const [route, type] of [['/styles.css', 'text/css'], ['/app.js', 'text/javascript'], ['/assets/roo-portrait.webp', 'image/webp'], ['/assets/anton.ttf', 'font/ttf'], ['/assets/campaign-poster.jpg', 'image/jpeg']]) {
    const r = await request(route); assert.equal(r.status, 200, route); assert.ok(r.headers['content-type'].startsWith(type)); assert.ok(r.body.length > 0);
  }
  for (const route of ['/.git/config', '/.replit', '/server.js', '/package.json', '/../README.md', '/assets/../server.js', '/assets/%2e%2e%2fserver.js', '/assets/..%5cserver.js', '/missing']) assert.equal((await request(route)).status, 404, route);
  assert.equal((await request('/%E0%A4%A')).status, 400);
  assert.equal((await request('/', 'POST')).status, 405);
  const head = await request('/assets/roo-portrait.webp', 'HEAD'); assert.equal(head.status, 200); assert.equal(head.body.length, 0); assert.ok(Number(head.headers['content-length']) > 1000);
  assert.equal((await request('/')).status, 200);
});
