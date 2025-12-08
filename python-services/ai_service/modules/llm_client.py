import os
import openai
import json

openai.api_key = os.getenv('OPENAI_API_KEY')


async def extract_skills_from_jd(jd_text: str):
    """
    Extract skills from a job description using OpenAI GPT model.
    Returns a list of skill strings.
    """
    prompt = (
        "Extract a concise list of required skills and technologies from the following job description. "
        "Return a JSON array of strings only. JOB DESCRIPTION:\n\n" + jd_text
    )

    resp = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0,
        max_tokens=300,
    )

    text = resp['choices'][0]['message']['content'].strip()

    try:
        parsed = json.loads(text)
        if isinstance(parsed, list):
            return [s.lower().strip() for s in parsed]
    except Exception:
        # fallback: split text by commas or newlines
        parts = [p.strip().lower() for p in text.replace('\n', ',').split(',') if p.strip()]
        return parts

    return []
