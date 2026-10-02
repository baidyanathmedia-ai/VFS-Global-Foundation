import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const NEW_DIR = 'downloaded_new_drive_images';
const OLD_DIR = 'downloaded_drive_images';
const TARGET_DIR = 'src/assets/images';

async function processProfiles() {
  console.log("=== PROCESSING EXACT PROFILE PHOTOS AS ASSIGNED BY USER ===");
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  // 1) RAMSEWAK GUNJAN SIR (Centre Head)
  // Uploaded Photo 1: file_000000005cbc8207b5744ae4097654e1.png (Brown hat, glasses, mustache, brown shirt)
  const gunjanPrimarySrc = path.join(NEW_DIR, '16QswAw8GGNdS_DuNL0IPtvfWR1vVlUMh_gunjan_sir_official_portrait.png');
  await sharp(gunjanPrimarySrc)
    .resize(900, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'ramsewak_gunjan_head_1788171851297.jpg'));
  console.log("-> Gunjan Sir Primary Profile Photo generated.");

  // Gunjan Sir Secondary / Leadership Photo: 1j4iPElW7VXDFYvM5jt0ppc8GwWkMtgDr.jpg
  const gunjanSecondarySrc = path.join(OLD_DIR, '1j4iPElW7VXDFYvM5jt0ppc8GwWkMtgDr.jpg');
  await sharp(gunjanSecondarySrc)
    .resize(900, 900, { fit: 'cover', position: 'north' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'gunjan_sir_secondary_action.jpg'));
  console.log("-> Gunjan Sir Secondary Profile Photo generated.");

  // 2) PRAMOD SIR (Spoken English & Communication Mentor)
  // Uploaded Photo 2: IMG_20260902_014322.png (White kurta/shirt, clean look)
  const pramodPrimarySrc = path.join(NEW_DIR, '1bNRiE7UatBnEYHmVp50D_rMcQ1leU2HF_pramod_sir_official_portrait.png');
  await sharp(pramodPrimarySrc)
    .resize(900, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'pramod_sir_mentor_1788171866404.jpg'));
  console.log("-> Pramod Sir Primary Profile Photo generated.");

  // Pramod Sir Secondary / Mentorship Classroom Photo: 1s6__Ru3fDD-ZxrgzXbTvlo6hmLPzA2Io.jpg
  const pramodSecondarySrc = path.join(OLD_DIR, '1s6__Ru3fDD-ZxrgzXbTvlo6hmLPzA2Io.jpg');
  await sharp(pramodSecondarySrc)
    .resize(900, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'pramod_sir_secondary_action.jpg'));
  console.log("-> Pramod Sir Secondary Profile Photo generated.");

  // 3) RAUSHAN MISHRA SIR (Travel & Hospitality Mentor)
  // Uploaded Photo 3: IMG-20260831-WA0033.jpg (Pink shirt, stage/auditorium)
  const raushanPrimarySrc = path.join(NEW_DIR, '1qreYFDwdWGwI0mcfpsIbM84SrW-Q_Jn7_raushan_mishra_official_portrait.jpg');
  await sharp(raushanPrimarySrc)
    .resize(900, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'raushan_mishra_mentor_1788171880485.jpg'));
  console.log("-> Raushan Mishra Sir Profile Photo generated.");

  console.log("=== ALL THREE PROFILES ACCURATELY APPLIED AND OPTIMIZED ===");
}

processProfiles();
