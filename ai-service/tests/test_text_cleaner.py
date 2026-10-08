import pytest
from app.services.text_cleaner import clean_text

def test_preserve_tech_tokens():
    raw = """
    Skills & Experience:
    - Programming in C++ and C#
    - Backend using .NET, Node.js, React.js, and Spring Boot
    - Machine learning with scikit-learn and SQL databases with Java
    """
    cleaned = clean_text(raw)
    assert "C++" in cleaned
    assert "C#" in cleaned
    assert ".NET" in cleaned
    assert "Node.js" in cleaned
    assert "React.js" in cleaned
    assert "Spring Boot" in cleaned
    assert "scikit-learn" in cleaned
    assert "SQL" in cleaned
    assert "Java" in cleaned

def test_normalize_excessive_whitespace_and_newlines():
    raw = "John   Doe\n\n\n\n- Skill 1\t\tSkill 2\n\n- Skill 3"
    cleaned = clean_text(raw)
    assert "John Doe" in cleaned
    assert "\n\n" in cleaned
    assert "\n\n\n" not in cleaned
