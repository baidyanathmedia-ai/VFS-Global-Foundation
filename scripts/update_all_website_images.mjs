import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const NEW_DIR = 'downloaded_new_drive_images';
const OLD_DIR = 'downloaded_drive_images';
const TARGET_DIR = 'src/assets/images';

async function updateAllWebsiteImages() {
  console.log("=== COMPREHENSIVE IMAGE PIPELINE UPDATE ===");
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  // ----------------------------------------------------
  // 1. LEADERSHIP & FACULTY MENTORS
  // ----------------------------------------------------
  // The user requested:
  // "Exchange the profile photos of Gunjan Sir and Roshan Sir — use Roshan Sir’s photo in Gunjan Sir’s profile and Gunjan Sir’s photo in Roshan Sir’s profile."
  // "For Gunjan Sir, use both of the two photos we provided, placing them appropriately in his profile/sections."
  // "Add a different second photo for Pramod Sir."
  // "Keep the correct photos for the correct people."

  // Gunjan Sir Primary Photo (The energetic mentor/stage photo: 1vv1X6yWi-vSs_CNqV0NPsaBMRYNj7-Tn.jpg or new portrait)
  await sharp(path.join(OLD_DIR, '1vv1X6yWi-vSs_CNqV0NPsaBMRYNj7-Tn.jpg'))
    .resize(800, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'ramsewak_gunjan_head_1788171851297.jpg'));
  console.log("Saved: Gunjan Sir Primary Profile");

  // Gunjan Sir Secondary Action / Address Photo (The second provided portrait: 1j4iPElW7VXDFYvM5jt0ppc8GwWkMtgDr.jpg or 16QswAw8GGNdS_DuNL0IPtvfWR1vVlUMh)
  const gunjanAltSrc = fs.existsSync(path.join(NEW_DIR, '16QswAw8GGNdS_DuNL0IPtvfWR1vVlUMh_file_000000005cbc8207b5744ae4097654e1.png'))
    ? path.join(NEW_DIR, '16QswAw8GGNdS_DuNL0IPtvfWR1vVlUMh_file_000000005cbc8207b5744ae4097654e1.png')
    : path.join(OLD_DIR, '1j4iPElW7VXDFYvM5jt0ppc8GwWkMtgDr.jpg');

  await sharp(gunjanAltSrc)
    .resize(900, 900, { fit: 'cover', position: 'north' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'gunjan_sir_secondary_action.jpg'));
  console.log("Saved: Gunjan Sir Secondary Profile/Action Photo");

  // Roshan Sir (Raushan Mishra - Travel & Hospitality Mentor: 1j4iPElW7VXDFYvM5jt0ppc8GwWkMtgDr.jpg / 1nJTUZR4liVU1dBQ4aB5zKS5xQ0f84w5J)
  const roshanSrc = fs.existsSync(path.join(NEW_DIR, '1nJTUZR4liVU1dBQ4aB5zKS5xQ0f84w5J_file_000000003b2482119fc3a47fa25c815c.png'))
    ? path.join(NEW_DIR, '1nJTUZR4liVU1dBQ4aB5zKS5xQ0f84w5J_file_000000003b2482119fc3a47fa25c815c.png')
    : path.join(OLD_DIR, '1j4iPElW7VXDFYvM5jt0ppc8GwWkMtgDr.jpg');

  await sharp(roshanSrc)
    .resize(800, 800, { fit: 'cover', position: 'north' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'raushan_mishra_mentor_1788171880485.jpg'));
  console.log("Saved: Roshan Sir Profile");

  // Pramod Sir Primary Profile (English Communication Mentor: 1s6__Ru3fDD-ZxrgzXbTvlo6hmLPzA2Io.jpg)
  await sharp(path.join(OLD_DIR, '1s6__Ru3fDD-ZxrgzXbTvlo6hmLPzA2Io.jpg'))
    .resize(800, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'pramod_sir_mentor_1788171866404.jpg'));
  console.log("Saved: Pramod Sir Primary Profile");

  // Pramod Sir Second Photo (Classroom / Training Action: 1mHQi19uQy3NWVMyXTBEs0a735USAAXkn_1781867491568.jpg or 1RyGD7gG8SmPxXv6QL_vIOWjUGJudiM-y_IMG-20260831-WA0004.jpg or 1Jk8R4_ymMzxxsqtpOKnImQMm3vuFD8Sk_IMG-20260116-WA0041.jpg)
  const pramodSecondSrc = fs.existsSync(path.join(NEW_DIR, '1RyGD7gG8SmPxXv6QL_vIOWjUGJudiM-y_IMG-20260831-WA0004.jpg'))
    ? path.join(NEW_DIR, '1RyGD7gG8SmPxXv6QL_vIOWjUGJudiM-y_IMG-20260831-WA0004.jpg')
    : path.join(NEW_DIR, '1mHQi19uQy3NWVMyXTBEs0a735USAAXkn_1781867491568.jpg');

  await sharp(pramodSecondSrc)
    .resize(800, 800, { fit: 'cover', position: 'north' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'pramod_sir_secondary_action.jpg'));
  console.log("Saved: Pramod Sir Second Action Photo");

  // ----------------------------------------------------
  // 2. HERO & CAMPUS SHOWCASE
  // ----------------------------------------------------
  // STPI Deoghar Outdoor Convocation (1Fdz4fQXypdrOYUpU_Oriu56E5KJVUYGx.jpg)
  await sharp(path.join(OLD_DIR, '1Fdz4fQXypdrOYUpU_Oriu56E5KJVUYGx.jpg'))
    .resize(1600, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'stpi_convocation_campus_1788153690739.jpg'));

  // Hero Alternative / Secondary Banner: High-res outdoor convocation (1GGhVumvBYuGiHuvyUqqKCeqwi_HHgBJX_IMG-20260831-WA0025.jpg)
  if (fs.existsSync(path.join(NEW_DIR, '1GGhVumvBYuGiHuvyUqqKCeqwi_HHgBJX_IMG-20260831-WA0025.jpg'))) {
    await sharp(path.join(NEW_DIR, '1GGhVumvBYuGiHuvyUqqKCeqwi_HHgBJX_IMG-20260831-WA0025.jpg'))
      .resize(1600, 900, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, progressive: true, mozjpeg: true })
      .toFile(path.join(TARGET_DIR, 'hero_banner_academy_1788152499393.jpg'));
  }

  // ----------------------------------------------------
  // 3. ABOUT SECTION: VFS Reception Desk & Cohort
  // ----------------------------------------------------
  await sharp(path.join(OLD_DIR, '1xR8CKzJKeZ__BdIkYr4jrHb2h8K5EsnZ.jpg'))
    .resize(1400, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'vfs_reception_batch_1788153734515.jpg'));

  await sharp(path.join(OLD_DIR, '125nk5M0iEuBgbiG5NpDFeS9OYxa-fgt_.jpg'))
    .resize(1400, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'vfs_reception_desk_students_1788172247496.jpg'));

  // ----------------------------------------------------
  // 4. CONVOCATION & CERTIFICATE DISTRIBUTION
  // ----------------------------------------------------
  await sharp(path.join(OLD_DIR, '1M7Qli0NtKeCGjug3jvJySOHPj07bYEVD.jpg'))
    .resize(1400, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'vfs_certificate_award_1788153716243.jpg'));

  await sharp(path.join(OLD_DIR, '1bZ8TlFj4soagYQrrPi6iQLxkTvWBt3aa.jpg'))
    .resize(1400, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'cert_ceremony_event_1788152561582.jpg'));

  // ----------------------------------------------------
  // 5. CLASSROOMS & PRACTICAL LEARNING
  // ----------------------------------------------------
  // Smart Lecture Room (1bZ8TlFj4soagYQrrPi6iQLxkTvWBt3aa.jpg)
  await sharp(path.join(OLD_DIR, '1bZ8TlFj4soagYQrrPi6iQLxkTvWBt3aa.jpg'))
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'classroom_smart_lecture_1788153752542.jpg'));

  // Student Group Discussion (150Lc7YKk1sQo9jxd17vv-KyuW1AYIrTn.jpg)
  await sharp(path.join(OLD_DIR, '150Lc7YKk1sQo9jxd17vv-KyuW1AYIrTn.jpg'))
    .resize(1200, 750, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'communication_skills_training_1788152527352.jpg'));

  // Interactive Mentor Discussion (14Wmejt5T2ATvJzqE-ousZT8hUzghQyCr.jpg)
  await sharp(path.join(OLD_DIR, '14Wmejt5T2ATvJzqE-ousZT8hUzghQyCr.jpg'))
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'practical_mock_presentation_1788153769787.jpg'));

  // Travel Hospitality Course Card
  await sharp(path.join(OLD_DIR, '14Wmejt5T2ATvJzqE-ousZT8hUzghQyCr.jpg'))
    .resize(1000, 650, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(TARGET_DIR, 'travel_hospitality_course_1788152513964.jpg'));

  // ----------------------------------------------------
  // 6. NEW HIGH-RES EVENT & GALLERY ALBUMS FROM DRIVE
  // ----------------------------------------------------
  // Auditorium / Stage Ceremony (1zlppLOI_roVYbn9ZclA1ra2PIg_CZ5q7_IMG-20260619-WA0036.jpg)
  if (fs.existsSync(path.join(NEW_DIR, '1zlppLOI_roVYbn9ZclA1ra2PIg_CZ5q7_IMG-20260619-WA0036.jpg'))) {
    await sharp(path.join(NEW_DIR, '1zlppLOI_roVYbn9ZclA1ra2PIg_CZ5q7_IMG-20260619-WA0036.jpg'))
      .resize(1400, 900, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, progressive: true, mozjpeg: true })
      .toFile(path.join(TARGET_DIR, 'auditorium_ceremony_event.jpg'));
    console.log("Saved: auditorium_ceremony_event.jpg");
  }

  // Cultural Event & Student Gathering (1HM5Ym4cnqBXTjaJx-Hj1T35r9tAtE0NR_IMG-20260111-WA0208.jpg)
  if (fs.existsSync(path.join(NEW_DIR, '1HM5Ym4cnqBXTjaJx-Hj1T35r9tAtE0NR_IMG-20260111-WA0208.jpg'))) {
    await sharp(path.join(NEW_DIR, '1HM5Ym4cnqBXTjaJx-Hj1T35r9tAtE0NR_IMG-20260111-WA0208.jpg'))
      .resize(1400, 900, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, progressive: true, mozjpeg: true })
      .toFile(path.join(TARGET_DIR, 'cultural_event_gathering.jpg'));
    console.log("Saved: cultural_event_gathering.jpg");
  }

  // Academic Workshop / Seminar Session (1qmhAmKloZkVbt_k8waiJG96-srSfYsas_IMG-20260111-WA0145.jpg)
  if (fs.existsSync(path.join(NEW_DIR, '1qmhAmKloZkVbt_k8waiJG96-srSfYsas_IMG-20260111-WA0145.jpg'))) {
    await sharp(path.join(NEW_DIR, '1qmhAmKloZkVbt_k8waiJG96-srSfYsas_IMG-20260111-WA0145.jpg'))
      .resize(1400, 900, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, progressive: true, mozjpeg: true })
      .toFile(path.join(TARGET_DIR, 'academic_workshop_seminar.jpg'));
    console.log("Saved: academic_workshop_seminar.jpg");
  }

  // Student Interaction Session (1OS0bvEzbwVs5iyqWx3wWv_w_f5nArbwp_IMG-20260111-WA0136.jpg)
  if (fs.existsSync(path.join(NEW_DIR, '1OS0bvEzbwVs5iyqWx3wWv_w_f5nArbwp_IMG-20260111-WA0136.jpg'))) {
    await sharp(path.join(NEW_DIR, '1OS0bvEzbwVs5iyqWx3wWv_w_f5nArbwp_IMG-20260111-WA0136.jpg'))
      .resize(1400, 900, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, progressive: true, mozjpeg: true })
      .toFile(path.join(TARGET_DIR, 'student_interaction_cohort.jpg'));
    console.log("Saved: student_interaction_cohort.jpg");
  }

  // Outdoor Study Visit / Excursion (1uipOpWYQx4oT8FLPSo9b6x6jNGOyLuC6_IMG-20260111-WA0088.jpg)
  if (fs.existsSync(path.join(NEW_DIR, '1uipOpWYQx4oT8FLPSo9b6x6jNGOyLuC6_IMG-20260111-WA0088.jpg'))) {
    await sharp(path.join(NEW_DIR, '1uipOpWYQx4oT8FLPSo9b6x6jNGOyLuC6_IMG-20260111-WA0088.jpg'))
      .resize(1400, 900, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, progressive: true, mozjpeg: true })
      .toFile(path.join(TARGET_DIR, 'outdoor_study_visit_1788152575776.jpg'));
    console.log("Saved: outdoor_study_visit_1788152575776.jpg");
  }

  console.log("=== ALL IMAGES PROCESSED AND GENERATED SUCCESSFULLY ===");
}

updateAllWebsiteImages();
