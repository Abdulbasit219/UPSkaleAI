This repository contains the Python backend microservices for the UpSkaleAI project.

## Services

- **ai_service**: Skill gap analyzer, roadmap generator, quiz generator, project generator, resume optimization (LLM).
- **resume_service**: HTML templates and PDF generation for resumes.
- **recommender_service**: Simple job recommender based on skill similarity (and ready to evolve with embeddings).

## Requirements

- Docker + docker-compose (recommended)
- Python 3.10+

## Run locally (with Docker)

1. Copy `.env.example` to `.env` and fill keys.
2. From `python-services/` run:

```bash
docker-compose up --build
```

3. Endpoints:

- AI Service: [http://localhost:8001](http://localhost:8001)
- Resume Service: [http://localhost:8002](http://localhost:8002)
- Recommender Service: [http://localhost:8003](http://localhost:8003)

## Development

For local development without Docker, create a virtualenv inside each service and run `uvicorn main:app --reload --port <PORT>`.

```

```
