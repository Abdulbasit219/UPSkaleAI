from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI-Powered Semantic Job Recommender")

# Load model at startup (Small, fast, and effective)
MODEL_NAME = 'all-MiniLM-L6-v2'
logger.info(f"Loading transformer model: {MODEL_NAME}...")
model = SentenceTransformer(MODEL_NAME)

class Job(BaseModel):
    id: Optional[str] = None
    title: str
    skills: List[str]
    description: str = ""

class RecommendRequest(BaseModel):
    user_skills: List[str]
    user_bio: Optional[str] = ""
    jobs: List[Job]

def get_keywords(text_list: List[str]) -> set:
    """Extract individual unique words from a list of strings."""
    keywords = set()
    for text in text_list:
        # Split by spaces, commas, and slashes to get individual words
        words = text.replace(',', ' ').replace('/', ' ').lower().split()
        keywords.update([w.strip() for w in words if len(w.strip()) > 1])
    return keywords

def calculate_overlap_score(user_skills: List[str], job_skills: List[str]) -> float:
    """
    Calculate how well the user fits the job requirements (Recall-based).
    Does not penalize the user for having extra skills.
    """
    u_words = get_keywords(user_skills)
    j_words = get_keywords(job_skills)
    
    if not j_words:
        return 0.5  # Neutral if job has no listed skills
    
    intersection = u_words & j_words
    
    # Recall: percentage of job requirements met
    return len(intersection) / len(j_words)

@app.post("/jobs/recommend")
async def recommend(req: RecommendRequest):
    if not req.jobs:
        return {"recommendations": []}

    logger.info(f"User Skills: {req.user_skills}")
    logger.info(f"User Bio: {req.user_bio}")
    if req.jobs:
        logger.info(f"First Job Title: {req.jobs[0].title}, Skills: {req.jobs[0].skills}")

    try:
        # 1. Prepare User Text for Embedding
        # Combining skills and bio for a richer semantic profile
        user_text = f"Expertise in {', '.join(req.user_skills)}. {req.user_bio}"
        user_embedding = model.encode([user_text])

        # 2. Prepare Job Texts
        job_texts = []
        for job in req.jobs:
            # Combine title, skills, and description for context
            text = f"{job.title}. Requirements: {', '.join(job.skills)}. {job.description}"
            job_texts.append(text)
        
        job_embeddings = model.encode(job_texts)

        # 3. Calculate Semantic Similarities (Cosine)
        semantic_scores = cosine_similarity(user_embedding, job_embeddings)[0]

        # 4. Hybrid Scoring Logic
        recs = []
        for i, job in enumerate(req.jobs):
            # Calculate overlap for direct keyword matching
            # Include Title in job keywords for a massive boost
            keyword_score = calculate_overlap_score(req.user_skills, job.skills + [job.title])
            
            # Semantic score from transformer
            semantic_score = max(0, float(semantic_scores[i]))

            # Hybrid Score Logic:
            # We want direct skill matches to be VERY powerful.
            # Use 70% Overlap (Recall) + 30% Semantic
            final_score = (keyword_score * 0.7) + (semantic_score * 0.3)

            # EXTRA BOOSTS:
            # 1. Total Job Fit: if keywords cover 80%+ of job requirements
            if keyword_score >= 0.8:
                final_score = max(final_score, 0.92)
            
            # 2. Perfect Title Match: if "React" is in both user skills and job title
            if any(s.lower() in job.title.lower() for s in req.user_skills):
                final_score = min(0.99, final_score + 0.1)

            # Find matching keywords for UI feedback
            u_words = get_keywords(req.user_skills)
            j_words = get_keywords(job.skills + [job.title])
            matched_skills = list(u_words & j_words)

            recs.append({
                "job_id": job.id,
                "title": job.title,
                "score": round(final_score, 3),
                "semantic_depth": round(semantic_score, 3),
                "keyword_match": round(keyword_score, 3),
                "matched_skills": matched_skills
            })

        # Sort by best match
        recs.sort(key=lambda x: x["score"], reverse=True)

        return {
            "success": True,
            "engine": "Sentence-Transformers (HuggingFace)",
            "model": MODEL_NAME,
            "recommendations": recs
        }

    except Exception as e:
        logger.error(f"Recommendation Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "online", "model": MODEL_NAME}