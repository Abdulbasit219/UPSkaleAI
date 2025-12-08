import re
from typing import List

SKILL_KEYWORDS = [
    'python', 'java', 'c++', 'c#', 'javascript', 'node', 'django', 'flask', 'fastapi',
    'sql', 'postgres', 'mysql', 'mongodb', 'redis', 'docker', 'kubernetes', 'aws', 'azure', 'gcp',
    'rest', 'graphql', 'html', 'css', 'react', 'angular', 'vue', 'nlp', 'pytorch', 'tensorflow'
]

SKILL_SET = set(SKILL_KEYWORDS)


def naive_extract_skills(text: str) -> List[str]:
    t = text.lower()
    found = set()
    for kw in SKILL_SET:
        if re.search(r"\b" + re.escape(kw) + r"\b", t):
            found.add(kw)
    return sorted(found)


def compute_gaps(required: List[str], user: List[str]) -> List[str]:
    req = set([r.lower() for r in required])
    usr = set([u.lower() for u in user])
    return sorted(list(req - usr))
