import os
import openai
from typing import List, Optional

openai.api_key = os.getenv("OPENAI_API_KEY")

DEFAULT_MODEL = "gpt-4o-mini"  # replace with available model or gpt-4o when accessible

async def extract_skills_from_jd(jd_text: str) -> List[str]:
    """Call OpenAI to extract a normalized list of skills from a job description.
    Returns a list of lowercase skill strings.
    """
    prompt = (
        "Extract a concise list of required skills and technologies from the following job description."
        "Return a JSON array of strings only. JOB DESCRIPTION: \n\n" + jd_text
    )

    # Using synchronous openai.Completion for simplicity — replace with async when using async client
    resp = openai.ChatCompletion.create(
        model=DEFAULT_MODEL,
        messages=[{"role":"user","content":prompt}],
        temperature=0.0,
        max_tokens=300,
    )
    text = resp["choices"][0]["message"]["content"].strip()
    # basic parsing: expect JSON array, but handle fallback
    import json
    try:
        parsed = json.loads(text)
        if isinstance(parsed, list):
            return [s.lower().strip() for s in parsed]
    except Exception:
        # fallback: split lines or commas
        parts = [p.strip().lower() for p in text.replace("\n", ",").split(",") if p.strip()]
        return parts

    return []