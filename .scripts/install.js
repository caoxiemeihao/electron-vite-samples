const fs = require('fs');
const path = require('path');
const child = require('child_process');

const root = path.join(__dirname, '..');
const dirs = fs.readdirSync(root, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => path.join(root, dirent.name))
  .filter(dir => fs.existsSync(path.join(dir, 'package.json')));

for (const dir of dirs) {
  child.spawn('yarn', [], { cwd: dir, stdio: 'inherit' });
}
