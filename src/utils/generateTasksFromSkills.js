export function generateTasksFromSkills(skills = []) {
  if (!skills.length) return [];

  return skills.slice(0, 3).map((skill) => ({
    title: `Practice ${skill.skillName}`,
    skill: skill.skillName,
    time: skill.level === "Advanced" ? 45 : 30,
    priority: skill.level === "Beginner" ? "high" : "medium",
    completed: false,
    source: "system",
  }));
}
