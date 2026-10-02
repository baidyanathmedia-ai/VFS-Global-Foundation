import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function checkPortraits() {
  const newDir = 'downloaded_new_drive_images';
  const oldDir = 'downloaded_drive_images';

  const files = [
    '16QswAw8GGNdS_DuNL0IPtvfWR1vVlUMh_file_000000005cbc8207b5744ae4097654e1.png',
    '1nJTUZR4liVU1dBQ4aB5zKS5xQ0f84w5J_file_000000003b2482119fc3a47fa25c815c.png',
    '1mHQi19uQy3NWVMyXTBEs0a735USAAXkn_1781867491568.jpg',
    '1RyGD7gG8SmPxXv6QL_vIOWjUGJudiM-y_IMG-20260831-WA0004.jpg',
    '1Jk8R4_ymMzxxsqtpOKnImQMm3vuFD8Sk_IMG-20260116-WA0041.jpg',
    '1O1wmDjrRp6DjJKgjGRCftqvpjQ8FNyCH_IMG-20260111-WA0039.jpg',
    '1g_NMvfaZx6SNCidqEYbZ4b4uzaodBrpF_IMG-20260111-WA0036.jpg',
    '13JRTfLuY3aWdFUa-_-LdEINQ5ryOcwVp_IMG-20260111-WA0012.jpg',
    '1m53Jwy8Xk3nhKic9Pc8Qi515TIFc1RMz_IMG-20260111-WA0011.jpg',
    '1lMyQVDwonC1xaOJ8DORKAhCt-wEXUTXf_IMG-20260116-WA0035.jpg',
    '1lukk35NvzaHKkPFtk_MrhN4HvcjBxTS5_IMG-20260116-WA0061.jpg',
    '1QRiyeaaSxZntASdYlFS0XmIzdJdoKJrC_IMG-20260116-WA0057.jpg',
    '1OS0bvEzbwVs5iyqWx3wWv_w_f5nArbwp_IMG-20260111-WA0136.jpg',
    '1qmhAmKloZkVbt_k8waiJG96-srSfYsas_IMG-20260111-WA0145.jpg',
    '1HM5Ym4cnqBXTjaJx-Hj1T35r9tAtE0NR_IMG-20260111-WA0208.jpg',
    '1uipOpWYQx4oT8FLPSo9b6x6jNGOyLuC6_IMG-20260111-WA0088.jpg',
    '1zlppLOI_roVYbn9ZclA1ra2PIg_CZ5q7_IMG-20260619-WA0036.jpg',
    '1GGhVumvBYuGiHuvyUqqKCeqwi_HHgBJX_IMG-20260831-WA0025.jpg'
  ];

  for (const f of files) {
    const p = path.join(newDir, f);
    if (!fs.existsSync(p)) continue;
    const meta = await sharp(p).metadata();
    const stats = await sharp(p).stats();
    console.log(`FILE: ${f}\n  dims: ${meta.width}x${meta.height} | channels: ${meta.channels} | isOpaque: ${stats.isOpaque}`);
  }
}

checkPortraits();
