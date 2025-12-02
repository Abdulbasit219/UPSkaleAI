from fastapi import FastAPI, Depends, HTTPException, Header
from pydantic import BaseModel
from typing import List, Optional
import os

from modules.skill_extractor import naive_extract_skills, compute_gaps
from modules.llm_client import extract_skills_from_jd

app = FastAPI(title="SkillBridge AI Service")

# --- Models ---
class SkillGapRequest(BaseModel):
    user_skills: List[str]
    dream_job: str
    job_descriptions: Optional[List[str]] = None

class RoadmapRequest(BaseModel):
    gaps: List[str]
    duration_weeks: int = 12

class QuizRequest(BaseModel):
    skill: str
    num_questions: int = 5
    difficulty: str = "medium"

class QuizGradeRequest(BaseModel):
    user_answers: List[str]
    correct_answers: List[str]

# --- Simple auth dependency ---
async def verify_auth(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    # For MVP: accept the token as user id; in prod verify JWT with auth provider
    token = authorization.split(" ")[-1]
    return {"user_id": token}

# --- Endpoints ---
@app.post("/ai/skill-gap")
async def skill_gap(req: SkillGapRequest, auth=Depends(verify_auth)):
    # If job_descriptions provided, prefer LLM extraction; otherwise use a small canned set
    required_skills = set()

    if req.job_descriptions:
        for jd in req.job_descriptions:
            try:
                skills = await extract_skills_from_jd(jd)
                required_skills.update(skills)
            except Exception:
                required_skills.update(naive_extract_skills(jd))
    else:
        # Basic mapping of dream_job to required skills (extendable)
        mapping = {
            'backend developer': ['python','django','rest','sql','docker','git'],
            'data scientist': ['python','pandas','numpy','scikit-learn','ml','nlp'],
            'frontend developer': ['javascript','react','html','css','webpack']
        }
        required_skills.update(mapping.get(req.dream_job.lower(), ['python','git','sql']))

    user_skills = [s.lower() for s in req.user_skills]
    matched = sorted(list(set(user_skills) & set(required_skills)))
    missing = sorted(list(set(required_skills) - set(user_skills)))

    # simple importance ranking
    gaps = [
        {"skill": m, "importance": ("high" if i < 3 else "medium")}
        for i, m in enumerate(missing)
    ]

    return {
        "user_id": auth["user_id"],
        "dream_job": req.dream_job,
        "matched_skills": matched,
        "gaps": gaps
    }


@app.post("/ai/roadmap")
async def roadmap(req: RoadmapRequest, auth=Depends(verify_auth)):
    weeks = req.duration_weeks
    if not req.gaps:
        return {"plan": []}
    plan = []
    per_week = max(1, len(req.gaps) // min(weeks, len(req.gaps)))
    w = 1
    for i, skill in enumerate(req.gaps):
        plan.append({
            "week": w,
            "skill": skill,
            "tasks": [f"Read basics of {skill}", f"Complete 2 exercises on {skill}", f"Mini project: small task using {skill}"],
            "resources": [f"https://www.google.com/search?q={skill}+tutorial"]
        })
        if (i+1) % per_week == 0:
            w += 1
    return {"duration_weeks": weeks, "plan": plan}


@app.post("/ai/generate-quiz")
async def generate_quiz(req: QuizRequest, auth=Depends(verify_auth)):
    quiz = []
    for i in range(req.num_questions):
        quiz.append({
            "id": i+1,
            "question": f"Placeholder Q{i+1}: What is {req.skill} used for?",
            "options": ["A", "B", "C", "D"],
            "answer": "A"
        })
    return {"skill": req.skill, "quiz": quiz}


@app.post("/ai/grade-quiz")
async def grade_quiz(req: QuizGradeRequest, auth=Depends(verify_auth)):
    correct = sum(1 for u, c in zip(req.user_answers, req.correct_answers) if u == c)
    return {"score": correct, "total": len(req.correct_answers)}