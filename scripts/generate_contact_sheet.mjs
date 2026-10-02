import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateContactSheet() {
  const newDir = 'downloaded_new_drive_images';
  const oldDir = 'downloaded_drive_images';
  const thumbDir = 'public/thumbs';
  fs.mkdirSync(thumbDir, { recursive: true });

  const allImages = [];

  const oldFiles = fs.readdirSync(oldDir);
  for (const f of oldFiles) {
    const src = path.join(oldDir, f);
    const thumbName = `old_${f}.jpg`;
    const thumbPath = path.join(thumbDir, thumbName);
    try {
      await sharp(src).resize(400, 300, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(thumbPath);
      allImages.push({
        folder: 'Original Drive (Batch 1)',
        filename: f,
        thumb: `/thumbs/${thumbName}`,
        full: `/downloaded_old/${f}`,
        size: (fs.statSync(src).size / 1024).toFixed(1) + ' KB'
      });
    } catch (e) {
      console.log('Error thumb old:', f, e.message);
    }
  }

  const newFiles = fs.readdirSync(newDir);
  for (const f of newFiles) {
    const src = path.join(newDir, f);
    const thumbName = `new_${f}.jpg`;
    const thumbPath = path.join(thumbDir, thumbName);
    try {
      await sharp(src).resize(400, 300, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(thumbPath);
      allImages.push({
        folder: 'New Google Drive Folder (Batch 2)',
        filename: f,
        thumb: `/thumbs/${thumbName}`,
        full: `/downloaded_new/${f}`,
        size: (fs.statSync(src).size / 1024).toFixed(1) + ' KB'
      });
    } catch (e) {
      console.log('Error thumb new:', f, e.message);
    }
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>VFS Drive Photos Inspection</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
    h1 { color: #38bdf8; margin-bottom: 8px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 20px; }
    .card { background: #1e293b; border-radius: 10px; overflow: hidden; border: 1px solid #334155; }
    .card img { width: 100%; height: 200px; object-fit: cover; display: block; }
    .info { padding: 12px; font-size: 12px; }
    .tag { display: inline-block; background: #0284c7; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-bottom: 6px; }
    .tag.old { background: #64748b; }
    a { color: #38bdf8; text-decoration: none; word-break: break-all; }
  </style>
</head>
<body>
  <h1>Google Drive Image Assets (${allImages.length} images)</h1>
  <p>Live overview of all photos provided in Google Drive folders</p>
  <div class="grid">
    ${allImages.map(img => `
      <div class="card">
        <a href="${img.full}" target="_blank">
          <img src="${img.thumb}" alt="${img.filename}" loading="lazy" />
        </a>
        <div class="info">
          <span class="tag ${img.folder.includes('Original') ? 'old' : ''}">${img.folder}</span>
          <div style="font-weight: 600; color: #e2e8f0; margin-top: 4px;">${img.filename}</div>
          <div style="color: #94a3b8;">${img.size}</div>
          <a href="${img.full}" target="_blank" style="margin-top: 4px; display: inline-block;">Open Full Resolution &rarr;</a>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync('public/drive_gallery.html', html);
  console.log(`Generated contact sheet with ${allImages.length} images at public/drive_gallery.html`);
}

generateContactSheet();
