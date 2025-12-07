import { jsPDF } from "jspdf";

export const generateResume = (profile, email) => {
  const doc = new jsPDF();

  let y = 20;

  // ====== HEADER ======
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(profile.name || "No Name", 20, y);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  if (profile.role) doc.text(profile.role, 20, y + 8);
  if (profile.location) doc.text(`Location: ${profile.location}`, 20, y + 14);
  if (email) doc.text(`Email: ${email}`, 20, y + 20);

  y += 30;

  if (profile.bio) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Summary", 20, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const splitBio = doc.splitTextToSize(profile.bio, 170);
    doc.text(splitBio, 20, y);
    y += splitBio.length * 6 + 5;
  }

  // ====== PROJECTS ======
  if (profile.projects && profile.projects.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Projects", 20, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    profile.projects.forEach((proj, index) => {
      doc.text(`${index + 1}. ${proj.title}`, 22, y);
      y += 6;
      if (proj.description) {
        const splitDesc = doc.splitTextToSize(proj.description, 165);
        doc.text(splitDesc, 25, y);
        y += splitDesc.length * 6;
      }
      if (proj.techStack && proj.techStack.length > 0) {
        doc.text(`Tech Stack: ${proj.techStack.join(", ")}`, 25, y);
        y += 6;
      }
      if (proj.projectLink) {
        doc.text(`Project Link: ${proj.projectLink}`, 25, y);
        y += 6;
      }
      if (proj.githubLink) {
        doc.text(`GitHub: ${proj.githubLink}`, 25, y);
        y += 6;
      }

      y += 4;

      if (y > 270) {
        // New page if overflow
        doc.addPage();
        y = 20;
      }
    });
  }

  // ====== SKILLS ======
  if (profile.skills && profile.skills.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Skills", 20, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(profile.skills.join(", "), 22, y);
    y += 10;
  }

  doc.save(`${`${profile.name}_resume` || "resume"}.pdf`);
};
