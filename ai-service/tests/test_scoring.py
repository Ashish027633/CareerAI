import pytest
from app.services.resume_scorer import calculate_resume_score

def test_scoring_weights_and_reasons():
    skills_data = {
        "skillCount": 5,
        "skillCategories": {"Programming": ["Java", "Python"], "Backend": ["Spring Boot"], "Database": ["MySQL"]}
    }
    education_list = [{
        "degree": "B.Tech",
        "institution": "ABC College",
        "cgpa": "8.5"
    }]
    projects_list = [{
        "name": "CareerAI",
        "description": "Resume analyzer",
        "technologies": ["React", "Spring Boot"]
    }]
    experience_list = [{
        "company": "Tech Corp",
        "role": "Intern",
        "duration": "2023"
    }]
    certifications_list = ["AWS Certified Developer"]
    sections_data = {
        "present_sections": ["CONTACT", "SKILLS", "EDUCATION", "PROJECTS"],
        "completeness_percentage": 75
    }

    overall, category_scores, score_reasons = calculate_resume_score(
        skills_data, education_list, projects_list, experience_list, certifications_list, sections_data
    )

    assert 0 <= overall <= 100
    assert category_scores["skills"] == 18
    assert category_scores["projects"] == 12
    assert category_scores["education"] == 15
    assert category_scores["experience"] == 10
    assert category_scores["certifications"] == 6
    assert category_scores["structure"] == 10
    assert category_scores["completeness"] == 4
    assert overall == 75
    assert "skills" in score_reasons
