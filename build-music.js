// 部署前執行：掃描 music/menu、music/day、music/night 生成分類 manifest.json
const fs = require('fs');
const path = require('path');

const categories = {
  menu: 'music/menu',
  day: 'music/day',
  night: 'music/night'
};

const manifest = { menu: [], day: [], night: [] };

for (const [cat, dirPath] of Object.entries(categories)) {
  const full = path.join(__dirname, dirPath);
  if (!fs.existsSync(full)) { fs.mkdirSync(full, { recursive: true }); }
  const files = fs.readdirSync(full)
    .filter(f => /\.(mp3|ogg|wav|m4a|flac)$/i.test(f))
    .map(f => dirPath + '/' + encodeURIComponent(f));
  manifest[cat] = files;
  console.log(`${cat}: ${files.length} 首`);
}

fs.writeFileSync(path.join(__dirname, 'music', 'manifest.json'),
  JSON.stringify(manifest, null, 2));
console.log('manifest.json 完成');