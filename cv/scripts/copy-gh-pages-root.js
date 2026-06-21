const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../../docs/browser');
const targetDir = path.join(__dirname, '../../docs');

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of entries) {
    const sourcePath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

copyRecursive(sourceDir, targetDir);
console.log(`Copied build output from ${sourceDir} to ${targetDir}`);
