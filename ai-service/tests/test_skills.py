import pytest
from app.services.skill_extractor import extract_skills

def test_extract_skills_token_boundary():
    text = "Proficient in JavaScript, React.js, Node, and Postgres."
    res = extract_skills(text)
    skills = res["skills"]
    assert "JavaScript" in skills
    assert "React" in skills
    assert "Node.js" in skills
    assert "PostgreSQL" in skills
    # Check that Java is NOT matched when only JavaScript is written
    assert "Java" not in skills

def test_extract_java_distinct_from_javascript():
    text = "Core Java developer experienced with Spring Boot and SQL."
    res = extract_skills(text)
    skills = res["skills"]
    assert "Java" in skills
    assert "JavaScript" not in skills

def test_extract_special_tokens():
    text = "Built high performance services in C++ and C# with .NET Core."
    res = extract_skills(text)
    skills = res["skills"]
    assert "C++" in skills
    assert "C#" in skills
    assert ".NET" in skills
