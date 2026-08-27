// 部署前執行：掃描 music/ 資料夾生成 manifest.json（讓線上版也能播放開發者音樂）
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'music');
if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }
const files = fs.readdirSync(dir)
  .filter(f => /\.(mp3|ogg|wav|m4a|flac)$/i.test(f))
  .map(f => 'music/' + encodeURIComponent(f));
fs.writeFileSync(path.join(__dirname, 'music', 'manifest.json'),
  JSON.stringify({ files }, null, 2));
console.log('manifest.json:', files.length, '首音樂');
