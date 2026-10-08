import re
from typing import List, Dict, Optional, Any

DEGREE_PATTERNS = [
    (r'\bB\.?\s*Tech(?:\b|\.|\s)', "B.Tech"),
    (r'\bB\.?\s*E(?:\b|\.|\s)', "B.E."),
    (r'\bM\.?\s*Tech(?:\b|\.|\s)', "M.Tech"),
    (r'\bM\.?\s*E(?:\b|\.|\s)', "M.E."),
    (r'\bB\.?\s*S\.?\s*C(?:\b|\.|\s)', "B.Sc"),
    (r'\bM\.?\s*S\.?\s*C(?:\b|\.|\s)', "M.Sc"),
    (r'\bB\.?\s*C\.?\s*A(?:\b|\.|\s)', "BCA"),
    (r'\bM\.?\s*C\.?\s*A(?:\b|\.|\s)', "MCA"),
    (r'\bBachelor\s+of\s+Technology\b', "B.Tech"),
    (r'\bBachelor\s+of\s+Engineering\b', "B.E."),
    (r'\bMaster\s+of\s+Technology\b', "M.Tech"),
    (r'\bMaster\s+of\s+Computer\s+Applications\b', "MCA"),
    (r'\bBachelor\s+of\s+Science\b', "B.Sc"),
    (r'\bMaster\s+of\s+Science\b', "M.Sc"),
]

FIELD_PATTERNS = [
    (r'\bcomputer\s+science(?:\s+and\s+engineering)?\b', "Computer Science"),
    (r'\binformation\s+technology\b', "Information Technology"),
    (r'\bartificial\s+intelligence(?:\s+and\s+data\s+science)?\b', "AI & Data Science"),
    (r'\bdata\s+science\b', "Data Science"),
    (r'\belectronics\s+(?:and|&)\s+communication\b', "Electronics & Communication"),
    (r'\belectrical\s+engineering\b', "Electrical Engineering"),
    (r'\bmechanical\s+engineering\b', "Mechanical Engineering"),
    (r'\bcivil\s+engineering\b', "Civil Engineering"),
]

def extract_education(text: str, section_texts: Dict[str, str]) -> List[Dict[str, Optional[str]]]:
    """
    Extracts education entries from resume text.
    Unknown values are returned as None (null).
    """
    search_text = section_texts.get("EDUCATION", text)
    if not search_text:
        return []

    lines = [l.strip() for l in search_text.split('\n') if l.strip()]
    if not lines:
        return []

    degree_found = None
    field_found = None
    institution_found = None
    year_found = None
    cgpa_found = None
    percentage_found = None

    # Detect Degree & Field
    for pat, name in DEGREE_PATTERNS:
        if re.search(pat, search_text, re.IGNORECASE):
            degree_found = name
            break

    for pat, name in FIELD_PATTERNS:
        if re.search(pat, search_text, re.IGNORECASE):
            field_found = name
            break

    # Detect CGPA (e.g. CGPA 8.2/10, 8.2 CGPA, CGPA: 8.5)
    cgpa_match = re.search(r'\b(?:cgpa|gpa)\s*[:=]?\s*(\d(?:\.\d{1,2})?)\b', search_text, re.IGNORECASE)
    if not cgpa_match:
        cgpa_match = re.search(r'\b(\d\.\d{1,2})\s*(?:/10)?\s*cgpa\b', search_text, re.IGNORECASE)
    if cgpa_match:
        cgpa_found = cgpa_match.group(1)

    # Detect Percentage (e.g. 75%, 82.5%)
    perc_match = re.search(r'\b(\d{2}(?:\.\d{1,2})?)\s*%\b', search_text)
    if perc_match:
        percentage_found = f"{perc_match.group(1)}%"

    # Detect Graduation Year (e.g. 2020-2024, 2025, Expected 2026)
    year_match = re.search(r'\b(20[1-3][0-9])\b', search_text)
    if year_match:
        year_found = year_match.group(1)

    # Detect Institution (College/University Name)
    for line in lines:
        if re.search(r'\b(?:university|institute|college|school|academy)\b', line, re.IGNORECASE):
            # Clean college line
            cleaned_col = re.sub(r'^\s*#*\s*', '', line)
            if len(cleaned_col) <= 80:
                institution_found = cleaned_col
                break

    # Only return an entry if at least degree, institution, or cgpa/percentage is found
    if degree_found or institution_found or cgpa_found or percentage_found or year_found:
        return [{
            "degree": degree_found,
            "field": field_found,
            "institution": institution_found,
            "graduationYear": year_found,
            "cgpa": cgpa_found,
            "percentage": percentage_found
        }]

    return []
