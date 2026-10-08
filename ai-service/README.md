# CareerAI AI Service (Phase 3B - Resume Intelligence)

Lightweight local Python microservice powering CareerAI Resume Intelligence pipeline.

## Features
- **PDF Text Extraction**: Extracts text and page counts using PyMuPDF (`fitz`).
- **Text Cleaner**: Normalizes whitespace while preserving technology tokens (`C++`, `C#`, `.NET`, `Node.js`, `React.js`, `Spring Boot`, `scikit-learn`, `SQL`, `Java`).
- **Section Detector**: Identifies SUMMARY, EDUCATION, SKILLS, PROJECTS, EXPERIENCE, CERTIFICATIONS, ACHIEVEMENTS, CONTACT sections.
- **Skill Extractor**: Token-aware boundary matching with standard taxonomy (`app/data/skills.json`) and aliases (e.g. `js` -> `JavaScript`, `react.js` -> `React`).
- **Education, Project, Experience, Certification Extractors**: Extracts degrees, CGPA, projects, tech stacks, experience levels (`FRESHER`/`EXPERIENCED`), and verified certifications.
- **CareerAI Resume Readiness Score**: Transparent 100-point scoring algorithm (Skills 25, Projects 20, Education 15, Experience 15, Certifications 10, Structure 10, Completeness 5) with category scores and explainable score reasons.
- **Recommendation Engine**: Rule-based actionable suggestions based on structural/technical resume gaps.

## Running Locally

```bash
cd ai-service
.venv\Scripts\activate
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

## Running Tests

```bash
$env:PYTHONPATH="."
.venv\Scripts\pytest
```

## Endpoints
- `GET /health` - Health check endpoint.
- `POST /api/v1/analyze-resume` - Accepts `multipart/form-data` PDF file upload and returns structured `ResumeAnalysisResponse`.
