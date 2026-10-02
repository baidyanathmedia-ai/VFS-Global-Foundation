import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const manifest = JSON.parse(fs.readFileSync('new_drive_manifest.json', 'utf8'));
  console.log(`Checking ${manifest.length} images...`);

  for (const item of manifest) {
    try {
      const meta = await sharp(item.path).metadata();
      console.log(`${item.filename.padEnd(45)} | ${meta.width}x${meta.height} (${meta.format}) | ${(item.size/1024).toFixed(1)} KB | ${item.id}`);
    } catch (e) {
      console.log(`Error on ${item.filename}:`, e.message);
    }
  }
}

main();
