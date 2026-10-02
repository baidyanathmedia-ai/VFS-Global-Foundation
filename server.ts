import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON middleware
  app.use(express.json());

  // API route for health
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Serve downloaded images for visual inspection
  app.use('/downloaded_new', express.static(path.join(process.cwd(), 'downloaded_new_drive_images')));
  app.use('/downloaded_old', express.static(path.join(process.cwd(), 'downloaded_drive_images')));

  // List all drive images endpoint
  app.get('/api/drive-images-list', (req, res) => {
    const newFiles = fs.readdirSync('downloaded_new_drive_images').map(f => ({
      folder: 'new',
      name: f,
      url: `/downloaded_new/${f}`,
      size: (fs.statSync(`downloaded_new_drive_images/${f}`).size / 1024).toFixed(1) + ' KB'
    }));
    const oldFiles = fs.readdirSync('downloaded_drive_images').map(f => ({
      folder: 'old',
      name: f,
      url: `/downloaded_old/${f}`,
      size: (fs.statSync(`downloaded_drive_images/${f}`).size / 1024).toFixed(1) + ' KB'
    }));
    res.json({ newFiles, oldFiles });
  });

  // Serve public static folder directly
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
