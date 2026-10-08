import pytest
from app.services.section_detector import detect_sections

def test_detect_sections_standard_headings():
    text = """
    John Doe
    john@example.com

    SUMMARY
    Enthusiastic Software Engineer with a passion for web development.

    EDUCATION
    B.Tech Computer Science from ABC University, 2024. CGPA: 8.5

    TECHNICAL SKILLS
    Java, Spring Boot, MySQL, React, Python

    PROJECTS
    CareerAI - AI Resume Analyzer built with React and Spring Boot.

    WORK EXPERIENCE
    Software Engineering Intern at Tech Corp.

    CERTIFICATIONS
    AWS Certified Cloud Practitioner
    """
    res = detect_sections(text)
    assert "SUMMARY" in res["present_sections"]
    assert "EDUCATION" in res["present_sections"]
    assert "SKILLS" in res["present_sections"]
    assert "PROJECTS" in res["present_sections"]
    assert "EXPERIENCE" in res["present_sections"]
    assert "CERTIFICATIONS" in res["present_sections"]
    assert res["completeness_percentage"] >= 70
