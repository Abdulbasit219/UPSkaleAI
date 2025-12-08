from typing import List, Dict


class PromptOptimizer:
def __init__(self):
# store prompts and their cumulative scores
self.scores = {} # prompt_id -> {'prompt': str, 'score': float, 'count': int}


def add_trial(self, prompt_id: str, prompt: str, feedback_value: float):
rec = self.scores.get(prompt_id)
if not rec:
self.scores[prompt_id] = {'prompt': prompt, 'score': feedback_value, 'count': 1}
else:
rec['score'] += feedback_value
rec['count'] += 1


def best_prompts(self, top_k=3):
items = sorted(self.scores.items(), key=lambda kv: (kv[1]['score']/max(1, kv[1]['count'])), reverse=True)
return [v['prompt'] for k,v in items[:top_k]]