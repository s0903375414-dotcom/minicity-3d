// MiniCity 3D 本地伺服器 — 零依賴，讓 Google OAuth 雲端存檔可用
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8477; // Render/雲端平台會注入 PORT
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const cat = urlObj.searchParams.get('cat');
  // 音樂清單 API：列出 music/ 資料夾裡的音檔（支援 ?cat=menu|day|night）
  if (urlPath === '/api/music') {
    let dirs = ['music/menu', 'music/day', 'music/night'];
    if (cat && ['menu','day','night'].includes(cat)) {
      dirs = ['music/' + cat];
    }
    let allFiles = [];
    let done = 0;
    for (const d of dirs) {
      const musicDir = path.join(ROOT, d);
      fs.readdir(musicDir, (err, files) => {
        if (!err) {
          const audio = files.filter(f => /\.(mp3|ogg|wav|m4a|flac)$/i.test(f))
            .map(f => d + '/' + encodeURIComponent(f));
          allFiles.push(...audio);
        }
        done++;
        if (done === dirs.length) {
          res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
          res.end(JSON.stringify(allFiles));
        }
      });
    }
    return;
  }
  if (urlPath === '/') urlPath = '/minicity.html';
  const filePath = path.join(ROOT, urlPath);
  // 防目錄跳脫
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('找不到檔案: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream'});
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('====================================');
  console.log('  MiniCity 3D 伺服器已啟動！');
  console.log('  網址: http://localhost:' + PORT);
  console.log('  （這個視窗保持開著，關閉即停止伺服器）');
  console.log('====================================');
});
