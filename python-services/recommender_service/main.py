from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI(title="Job Recommender")

class Job(BaseModel):
    title: str
    skills: List[str]
    description: str = ""

class RecommendRequest(BaseModel):
    user_skills: List[str]
    jobs: List[Job]


def jaccard(a: List[str], b: List[str]) -> float:
    sa = set([x.lower() for x in a])
    sb = set([x.lower() for x in b])
    if not sa and not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)

@app.post("/jobs/recommend")
def recommend(req: RecommendRequest):
    recs = []
    for job in req.jobs:
        score = jaccard(req.user_skills, job.skills)
        recs.append({
            "title": job.title,
            "score": round(score, 3),
            "matched_skills": list(set([s.lower() for s in req.user_skills]) & set([s.lower() for s in job.skills]))
        })
    recs.sort(key=lambda x: x["score"], reverse=True)
    return {"recommendations": recs}