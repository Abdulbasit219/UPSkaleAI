from fastapi import FastAPI, Depends, HTTPException, Header
from pydantic import BaseModel
from typing import List, Optional
import os
from pymongo import MongoClient

# --- Import your modules ---
from modules.skill_extractor import naive_extract_skills
from modules.llm_client import extract_skills_from_jd
from modules.embeddings import embed_text, get_model
from modules.vectorstore_faiss import init_index, upsert, query

app = FastAPI(title="UpSkaleAI AI Service")

# --- MongoDB Client ---
client = MongoClient(os.getenv('MONGODB_URL', 'mongodb://mongo:27017'))
db = client.upskaleai

# --- Initialize embeddings model and vector index ---
model = get_model()
D = model.get_sentence_embedding_dimension()
init_index(D)

# --- Models ---
class Job(BaseModel):
    job_id: str
    title: str
    description: str
    skills: Optional[List[str]] = None


class Feedback(BaseModel):
    user_id: str
    event_type: str
    job_id: Optional[str] = None
    label: Optional[str] = None
    rank: Optional[int] = None
    session_id: Optional[str] = None


# --- Simple Auth Dependency ---
async def verify_auth(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    token = authorization.split(' ')[-1]
    return {"user_id": token}


# --- Endpoints ---
@app.post('/jobs/upsert')
async def job_upsert(job: Job, auth=Depends(verify_auth)):
    emb = embed_text(job.description)
    upsert(job.job_id, emb, metadata={'title': job.title, 'skills': job.skills})
    db.jobs.replace_one({'job_id': job.job_id}, job.dict(), upsert=True)
    return {'ok': True}


@app.post('/jobs/query')
async def job_query(description: str, auth=Depends(verify_auth)):
    emb = embed_text(description)
    results = query(emb)
    return {'results': results}


@app.post('/events/feedback')
async def submit_feedback(feedback: Feedback, auth=Depends(verify_auth)):
    db.feedback.insert_one(feedback.dict())
    results = {"message": "Feedback received"}
    return {'results': results}


@app.get('/jobs/{job_id}')
async def get_job(job_id: str, auth=Depends(verify_auth)):
    job = db.jobs.find_one({'job_id': job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
