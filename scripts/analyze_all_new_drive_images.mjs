import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const manifest = JSON.parse(fs.readFileSync('new_drive_manifest.json', 'utf8'));
  const cacheFile = 'new_images_descriptions.json';
  let descriptions = {};
  if (fs.existsSync(cacheFile)) {
    descriptions = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  }

  for (const item of manifest) {
    if (descriptions[item.filename]) {
      continue;
    }

    try {
      const fileBytes = fs.readFileSync(item.path);
      const mimeType = item.filename.endsWith('.png') ? 'image/png' : 'image/jpeg';
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { data: fileBytes.toString('base64'), mimeType } },
              { text: 'Detail: 1. Person/People shown (Gunjan Sir, Pramod Sir with glasses/beard/hat, Roshan Sir, students, STPI building, etc.). 2. Describe setting and action. 3. Recommended section on the VFS Academy website.' }
            ]
          }
        ]
      });

      const text = response.text || '';
      console.log(`\n=== ${item.filename} ===\n${text}`);
      descriptions[item.filename] = text;
      fs.writeFileSync(cacheFile, JSON.stringify(descriptions, null, 2));

      await new Promise(r => setTimeout(r, 6000));
    } catch (e) {
      console.error(`Error on ${item.filename}:`, e.message);
      if (e.message.includes('429')) {
        console.log('Waiting 30s for quota reset...');
        await new Promise(r => setTimeout(r, 30000));
      }
    }
  }

  console.log("Finished image analysis.");
}

main();
