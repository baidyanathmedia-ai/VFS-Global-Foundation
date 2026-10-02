import { jsPDF } from 'jspdf';
import { CONTACT_CONFIG } from '../data/academyData';

export interface ProfilePdfData {
  name: string;
  role: string;
  organization: string;
  location: string;
  bio: string;
  items: string[];
  itemsTitle: string;
  quote: string;
  image?: string;
  badge?: string;
}

// Convert image URL to Base64 to safely embed in jsPDF
async function getBase64ImageFromUrl(imageUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataURL);
        } else {
          resolve(null);
        }
      };
      img.onerror = () => {
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

export async function generateFacultyProfilePdf(profile: ProfilePdfData): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 15;
  const contentWidth = pageWidth - margin * 2; // 180mm

  // 1. Top Decorative Brand Banner (Dark Navy)
  doc.setFillColor(15, 23, 42); // #0f172a slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Top Accent Stripe (Emerald Green)
  doc.setFillColor(16, 185, 129); // #10b981 emerald-500
  doc.rect(0, 26.5, pageWidth, 1.5, 'F');

  // Brand Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('VFS GLOBAL ACADEMY', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('Operated under VFS Global Foundation • STPI Deoghar (Jasidih)', margin, 18);
  doc.text('Learn  |  Grow  |  Achieve', pageWidth - margin, 12, { align: 'right' });
  doc.text('Official Faculty & Leadership Dossier', pageWidth - margin, 18, { align: 'right' });

  // 2. Load and embed portrait image if available
  let imgData: string | null = null;
  if (profile.image) {
    try {
      imgData = await getBase64ImageFromUrl(profile.image);
    } catch (e) {
      console.warn('Could not load image for PDF:', e);
    }
  }

  let startY = 38;

  // Header Title for Profile
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(margin, startY, contentWidth, 38, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, startY, contentWidth, 38, 3, 3, 'S');

  // Photo box inside header or text
  const photoSize = 30;
  const photoX = margin + 4;
  const photoY = startY + 4;

  if (imgData) {
    try {
      doc.addImage(imgData, 'JPEG', photoX, photoY, photoSize, photoSize);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.8);
      doc.rect(photoX, photoY, photoSize, photoSize, 'S');
    } catch {
      // Fallback if addImage fails
      doc.setFillColor(30, 41, 59);
      doc.rect(photoX, photoY, photoSize, photoSize, 'F');
    }
  } else {
    doc.setFillColor(30, 41, 59);
    doc.rect(photoX, photoY, photoSize, photoSize, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('VFS', photoX + 15, photoY + 16, { align: 'center' });
  }

  // Name & Role beside photo
  const textX = photoX + photoSize + 6;
  doc.setTextColor(16, 185, 129); // Emerald
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(profile.role.toUpperCase(), textX, startY + 9);

  doc.setTextColor(15, 23, 42); // Navy
  doc.setFontSize(15);
  doc.text(profile.name.toUpperCase(), textX, startY + 16);

  doc.setTextColor(71, 85, 105); // slate-600
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`${profile.organization} • ${profile.location}`, textX, startY + 22);

  // Badge pill if available
  if (profile.badge) {
    doc.setFillColor(219, 234, 254); // blue-100
    doc.roundedRect(textX, startY + 26, 60, 6, 2, 2, 'F');
    doc.setTextColor(29, 78, 216); // blue-700
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(profile.badge, textX + 3, startY + 30.5);
  }

  startY += 45;

  // 3. Professional Quote Section (Highlighted Card)
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, startY, contentWidth, 20, 2, 2, 'F');
  doc.setDrawColor(59, 130, 246); // blue-500
  doc.setLineWidth(1);
  doc.line(margin, startY, margin, startY + 20); // Left accent border

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  const quoteLines = doc.splitTextToSize(`"${profile.quote}"`, contentWidth - 10);
  doc.text(quoteLines, margin + 5, startY + 8);

  startY += 26;

  // 4. Biography Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('PROFESSIONAL BIOGRAPHY', margin, startY);

  // Small green underline under section heading
  doc.setFillColor(16, 185, 129);
  doc.rect(margin, startY + 1.5, 25, 0.8, 'F');

  startY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const bioLines = doc.splitTextToSize(profile.bio, contentWidth);
  doc.text(bioLines, margin, startY);
  startY += bioLines.length * 4.2 + 6;

  // 5. Areas of Guidance / Expertise
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(profile.itemsTitle.toUpperCase(), margin, startY);

  // Small blue underline under section heading
  doc.setFillColor(37, 99, 235);
  doc.rect(margin, startY + 1.5, 25, 0.8, 'F');

  startY += 7;

  // 2-column grid for expertise items
  const colWidth = (contentWidth - 6) / 2;
  const halfLength = Math.ceil(profile.items.length / 2);
  const leftItems = profile.items.slice(0, halfLength);
  const rightItems = profile.items.slice(halfLength);

  const initialItemsY = startY;
  
  // Left column
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  let leftY = initialItemsY;
  leftItems.forEach((item) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(margin + 2, leftY - 1, 1, 'F');
    doc.text(item, margin + 6, leftY);
    leftY += 5.2;
  });

  // Right column
  let rightY = initialItemsY;
  rightItems.forEach((item) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(margin + colWidth + 6 + 2, rightY - 1, 1, 'F');
    doc.text(item, margin + colWidth + 6 + 6, rightY);
    rightY += 5.2;
  });

  startY = Math.max(leftY, rightY) + 6;

  // 6. Academy Pedagogy & Certification info box
  doc.setFillColor(240, 253, 244); // emerald-50
  doc.roundedRect(margin, startY, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(187, 247, 208); // emerald-200
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, startY, contentWidth, 24, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 95, 70); // emerald-800
  doc.text('ABOUT VFS GLOBAL ACADEMY • STPI DEOGHAR (JASIDIH)', margin + 4, startY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(20, 83, 45); // emerald-900
  const infoText = 'Offering 3-month government-aligned certificate courses in "Travel & Hospitality Assistant" and "Customer Care & Communication Skills" with 100% placement support, modern AC smart labs, and interactive mentorship.';
  const infoLines = doc.splitTextToSize(infoText, contentWidth - 8);
  doc.text(infoLines, margin + 4, startY + 11);

  // 7. Footer Bar (Dark Slate)
  doc.setFillColor(15, 23, 42);
  doc.rect(0, pageHeight - 22, pageWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('STPI Deoghar Campus:', margin, pageHeight - 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(203, 213, 225);
  doc.text(
    `Manikpur Road, After Railway Over Bridge, Jasidih, Deoghar, Jharkhand | Contact: ${CONTACT_CONFIG.PHONE_DISPLAY} | Email: ${CONTACT_CONFIG.EMAIL_ADDRESS}`,
    margin,
    pageHeight - 9
  );

  doc.text(
    'Copyright © 2026 VFS Global Academy. All Rights Reserved.',
    margin,
    pageHeight - 5
  );

  // Save the PDF
  const sanitizedName = profile.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
  doc.save(`VFS_Academy_Profile_${sanitizedName}.pdf`);
}
