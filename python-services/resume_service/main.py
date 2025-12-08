from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from jinja2 import Environment, FileSystemLoader
import pdfkit
import os
from tempfile import NamedTemporaryFile

app = FastAPI(title="Resume Service")


class ResumeRequest(BaseModel):
    name: str
    email: str
    phone: str
    skills: list
    education: list
    experience: list
    template: str = "basic"


@app.post('/resume/generate')
def generate_resume(req: ResumeRequest):
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template(f"{req.template}.html")
    html = template.render(data=req.dict())

    pdf_path = f"/tmp/{req.name.replace(' ', '_')}_resume.pdf"
    try:
        pdfkit.from_string(html, pdf_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {'pdf_path': pdf_path}
