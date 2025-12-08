from pydantic import BaseModel
from typing import List, Optional


class JobDoc(BaseModel):
job_id: str
title: str
description: str
skills: Optional[List[str]] = []


class FeedbackEvent(BaseModel):
user_id: str
event_type: str
job_id: Optional[str] = None
label: Optional[str] = None
rank: Optional[int] = None
session_id: Optional[str] = None
context: Optional[dict] = None


class RecommendRequest(BaseModel):
user_skills: List[str]
jobs: List[JobDoc]