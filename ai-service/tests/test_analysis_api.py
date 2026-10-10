import pytest
import fitz
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def create_synthetic_pdf(text: str) -> bytes:
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((50, 50), text)
    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes

def test_analyze_resume_endpoint_success():
    sample_resume = """
    John Doe
    john@example.com | +1 234 567 8900

    SUMMARY
    Software developer passionate about backend engineering.

    TECHNICAL SKILLS
    Java, Spring Boot, MySQL, React, Python, Git

    EDUCATION
    B.Tech in Computer Science from ABC University, 2024. CGPA: 8.5

    PROJECTS
    Placement Portal - Built with React, Spring Boot, and MySQL.

    CERTIFICATIONS
    AWS Certified Cloud Practitioner
    """
    pdf_bytes = create_synthetic_pdf(sample_resume)

    response = client.post(
        "/api/v1/analyze-resume",
        headers={"x-api-key": "test-api-key"}, files={"file": ("resume.pdf", pdf_bytes, "application/pdf")}
    )

    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    res_data = data["data"]
    assert res_data["overallScore"] > 0
    assert "Java" in res_data["skills"]
    assert "Spring Boot" in res_data["skills"]
    assert res_data["pageCount"] == 1
    assert len(res_data["recommendations"]) > 0

def test_analyze_resume_invalid_extension():
    response = client.post(
        "/api/v1/analyze-resume",
        headers={"x-api-key": "test-api-key"}, files={"file": ("resume.txt", b"Plain text content", "text/plain")}
    )
    assert response.status_code == 400
    assert response.json()["error"] == "UNSUPPORTED_FORMAT"
