import { jsPDF } from "jspdf";

const drawSeparator = (doc, y, margin, pageWidth) => {
  doc.setDrawColor(180);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  return y + 6;
};

export const generateResume = (profile, email) => {
  const doc = new jsPDF();
  let y = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  /* ================= HEADER - NAME (CENTERED & BOLD) ================= */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const nameWidth = doc.getTextWidth(profile.name || "YOUR NAME");
  doc.text(profile.name || "YOUR NAME", (pageWidth - nameWidth) / 2, y);
  y += 8;

  /* ================= CONTACT INFO LINE (CENTERED) ================= */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  let contactLine = "";
  const contactParts = [];

  // Build contact line with separators
  if (profile.location) contactParts.push(profile.location);
  if (email) contactParts.push(`Email: ${email}`);
  if (profile.socialLinks?.linkedin) contactParts.push("LinkedIn");
  if (profile.socialLinks?.github) contactParts.push("GitHub");

  contactLine = contactParts.join(" | ");
  const contactWidth = doc.getTextWidth(contactLine);
  const contactStartX = (pageWidth - contactWidth) / 2;

  // Calculate positions for clickable links
  let currentX = contactStartX;

  if (profile.location) {
    doc.text(profile.location, currentX, y);
    currentX += doc.getTextWidth(profile.location);
    if (contactParts.length > 1) {
      doc.text(" | ", currentX, y);
      currentX += doc.getTextWidth(" | ");
    }
  }

  if (email) {
    const emailText = `Email: ${email}`;
    doc.textWithLink(emailText, currentX, y, { url: `mailto:${email}` });
    doc.setTextColor(0, 0, 255);
    doc.text(emailText, currentX, y);
    doc.setTextColor(0, 0, 0);
    currentX += doc.getTextWidth(emailText);
    if (profile.socialLinks?.linkedin || profile.socialLinks?.github) {
      doc.text(" | ", currentX, y);
      currentX += doc.getTextWidth(" | ");
    }
  }

  if (profile.socialLinks?.linkedin) {
    doc.setTextColor(0, 0, 255);
    doc.textWithLink("LinkedIn", currentX, y, {
      url: profile.socialLinks.linkedin,
    });
    doc.text("LinkedIn", currentX, y);
    doc.setTextColor(0, 0, 0);
    currentX += doc.getTextWidth("LinkedIn");
    if (profile.socialLinks?.github) {
      doc.text(" | ", currentX, y);
      currentX += doc.getTextWidth(" | ");
    }
  }

  if (profile.socialLinks?.github) {
    doc.setTextColor(0, 0, 255);
    doc.textWithLink("GitHub", currentX, y, {
      url: profile.socialLinks.github,
    });
    doc.text("GitHub", currentX, y);
    doc.setTextColor(0, 0, 0);
  }

  y += 10;

  /* ================= SUMMARY ================= */
  if (profile.bio) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("SUMMARY", margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const bioLines = doc.splitTextToSize(profile.bio, contentWidth);
    doc.text(bioLines, margin, y);
    y += bioLines.length * 2 + 6;
    y = drawSeparator(doc, y, margin, pageWidth);
  }

  /* ================= EDUCATION ================= */
  if (profile.education && profile.education.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("EDUCATION", margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    profile.education.forEach((edu) => {
      // Degree title (left) and dates (right aligned)
      const degreeText = `${edu.degree || ""} in ${edu.fieldOfStudy || ""} (${edu.institution || ""})`;
      doc.setFont("helvetica", "bold");
      doc.text(degreeText, margin, y);

      // Date on the right
      if (edu.startDate || edu.endDate) {
        const dateText = `${edu.startDate || ""} - ${edu.current ? "Present" : edu.endDate || ""}`;
        const dateWidth = doc.getTextWidth(dateText);
        doc.text(dateText, pageWidth - margin - dateWidth, y);
      }
      y += 5;

      doc.setFont("helvetica", "normal");

      // Description if available
      if (edu.description) {
        const descLines = doc.splitTextToSize(
          edu.description,
          contentWidth - 5
        );
        doc.text(descLines, margin, y);
        y += descLines.length * 5;
      }

      // Additional details
      if (edu.grade) {
        doc.text(`GPA: ${edu.grade}`, margin, y);
        y += 5;
      }

      y += 3;
    });

    y += 1;
    y = drawSeparator(doc, y, margin, pageWidth);
  }

  /* ================= TECHNICAL SKILLS ================= */
  if (profile.skills && profile.skills.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("TECHNICAL SKILLS", margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Group skills if they have categories, otherwise list them
    const skillsByCategory = {};

    profile.skills.forEach((skill) => {
      const skillName = skill.skillName || skill;
      const category = skill.category || "General";

      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      skillsByCategory[category].push(skillName);
    });

    Object.keys(skillsByCategory).forEach((category) => {
      if (Object.keys(skillsByCategory).length > 1) {
        doc.setFont("helvetica", "bold");
        doc.text(`${category}:`, margin, y);
        doc.setFont("helvetica", "normal");
        y += 5;
      }

      const skillsText = skillsByCategory[category].join(", ");
      const skillLines = doc.splitTextToSize(skillsText, contentWidth - 5);
      doc.text(skillLines, margin + 5, y);
      y += skillLines.length * 5 + 2;
    });

    y += 4;
    y = drawSeparator(doc, y, margin, pageWidth);
    }

  /* ================= PROFESSIONAL EXPERIENCES ================= */
  if (profile.experience && profile.experience.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("PROFESSIONAL EXPERIENCES", margin, y);
    y += 6;

    doc.setFontSize(10);

    profile.experience.forEach((exp) => {
      // Job title and company (left) with dates (right)
      doc.setFont("helvetica", "bold");
      const titleText = `${exp.title || ""}, ${exp.company || ""}`;
      doc.text(titleText, margin, y);

      // Date on the right
      if (exp.startDate) {
        const dateText = `${exp.startDate} - ${exp.current ? "Present" : exp.endDate || ""}`;
        const dateWidth = doc.getTextWidth(dateText);
        doc.text(dateText, pageWidth - margin - dateWidth, y);
      }
      y += 5;

      doc.setFont("helvetica", "normal");

      // Location if available
      if (exp.location) {
        doc.setFontSize(9);
        doc.text(exp.location, margin, y);
        y += 5;
        doc.setFontSize(10);
      }

      // Description as bullet points
      if (exp.description) {
        const bulletPoints = exp.description
          .split(/[.!]\s+/)
          .filter((s) => s.trim());

        bulletPoints.forEach((point) => {
          if (point.trim()) {
            const pointLines = doc.splitTextToSize(
              `• ${point.trim()}`,
              contentWidth - 5
            );
            doc.text(pointLines, margin + 2, y);
            y += pointLines.length * 5;
          }
        });
      }

      y += 4;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    y += 2;
    y = drawSeparator(doc, y, margin, pageWidth);

  }

  /* ================= RESEARCH & PROJECTS ================= */
  if (profile.projects && profile.projects.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("RESEARCH & PROJECTS", margin, y);
    y += 6;

    doc.setFontSize(10);

    profile.projects.forEach((proj) => {
      // Project Title
      doc.setFont("helvetica", "bold");
      doc.text(`- ${proj.title}`, margin, y);
      y += 5;

      // Tech Stack
      if (proj.techStack?.length) {
        doc.setFontSize(9);
        doc.text(`Tech Stack: ${proj.techStack.join(", ")}`, margin + 5, y);
        y += 5;
        doc.setFontSize(10);
      }

      doc.setFont("helvetica", "normal");

      // Description
      if (proj.description) {
        proj.description
          .split(/[.!]\s+/)
          .filter(Boolean)
          .forEach((point) => {
            const lines = doc.splitTextToSize(`- ${point}`, contentWidth - 10);
            doc.text(lines, margin + 7, y);
            y += lines.length * 5;
          });
      }

      // Links
      if (proj.projectLink || proj.githubLink) {
        y += 2;
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 255);

        let x = margin + 7;

        if (proj.projectLink) {
          doc.textWithLink("Live Demo", x, y, {
            url: proj.projectLink,
          });
          x += doc.getTextWidth("Live Demo") + 10;
        }

        if (proj.githubLink) {
          doc.textWithLink("GitHub", x, y, {
            url: proj.githubLink,
          });
        }

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        y += 6;
      }

      y += 4;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    
  }

  // Save the PDF

  doc.save(`${profile.name || "Resume"}_CV.pdf`);
};
