import re
from typing import Dict, List, Any

# Map of Section Heading Keywords -> Standardized Section Name
SECTION_HEADER_PATTERNS = {
    "CONTACT": [
        r'\bcontact(?:\s+information|\s+details)?\b',
        r'\bpersonal\s+details\b'
    ],
    "SUMMARY": [
        r'\b(?:executive\s+)?summary\b',
        r'\bobjective\b',
        r'\bcareer\s+objective\b',
        r'\bprofessional\s+summary\b',
        r'\bprofile\b',
        r'\babout\s+me\b'
    ],
    "EDUCATION": [
        r'\beducation\b',
        r'\bacacademic\s+qualifications?\b',
        r'\bacademics?\b',
        r'\beducation\s+(?:&|and)\s+qualifications\b',
        r'\beducational\s+background\b'
    ],
    "SKILLS": [
        r'\btechnical\s+skills?\b',
        r'\bskills?\b',
        r'\bskills\s+(?:&|and)\s+abilities\b',
        r'\bcore\s+competencies\b',
        r'\btechnologies\b',
        r'\btechnical\s+expertise\b'
    ],
    "PROJECTS": [
        r'\bprojects?\b',
        r'\bacacademic\s+projects?\b',
        r'\bpersonal\s+projects?\b',
        r'\bkey\s+projects?\b',
        r'\btechnical\s+projects?\b'
    ],
    "EXPERIENCE": [
        r'\bwork\s+experience\b',
        r'\bprofessional\s+experience\b',
        r'\bexperience\b',
        r'\binternships?\b',
        r'\bemployment\s+history\b',
        r'\bwork\s+history\b'
    ],
    "CERTIFICATIONS": [
        r'\bcertifications?\b',
        r'\bcertificates?\b',
        r'\bprofessional\s+certifications?\b',
        r'\bcourses\s+(?:&|and)\s+certifications?\b',
        r'\blicenses\s+(?:&|and)\s+certifications?\b'
    ],
    "ACHIEVEMENTS": [
        r'\bachievements?\b',
        r'\bawards?\b',
        r'\bhonors?\s+(?:&|and)\s+awards?\b',
        r'\baccomplishments?\b'
    ]
}

ALL_CANONICAL_SECTIONS = [
    "CONTACT",
    "SUMMARY",
    "EDUCATION",
    "SKILLS",
    "PROJECTS",
    "EXPERIENCE",
    "CERTIFICATIONS",
    "ACHIEVEMENTS"
]

def detect_sections(text: str) -> Dict[str, Any]:
    """
    Detects major resume sections and slices text into section content blocks.
    Returns present_sections, missing_sections, and section_texts dict.
    """
    lines = text.split('\n')
    section_indices = []

    for i, line in enumerate(lines):
        clean_line = line.strip()
        # Header candidate lines are usually short (under 50 chars)
        if 2 <= len(clean_line) <= 55:
            # Check against section patterns
            for canonical_name, patterns in SECTION_HEADER_PATTERNS.items():
                matched = False
                for pattern in patterns:
                    if re.search(r'^\s*#*\s*' + pattern + r'\s*:?\s*$', clean_line, re.IGNORECASE):
                        section_indices.append((i, canonical_name, clean_line))
                        matched = True
                        break
                if matched:
                    break

    # If no header candidates were found using exact line match, try loose line matching
    if not section_indices:
        for i, line in enumerate(lines):
            clean_line = line.strip()
            if 2 <= len(clean_line) <= 40:
                for canonical_name, patterns in SECTION_HEADER_PATTERNS.items():
                    matched = False
                    for pattern in patterns:
                        if re.search(pattern, clean_line, re.IGNORECASE):
                            section_indices.append((i, canonical_name, clean_line))
                            matched = True
                            break
                    if matched:
                        break

    # Deduplicate section occurrences (keep first occurrence per section)
    seen_sections = set()
    unique_indices = []
    for idx, name, original_text in section_indices:
        if name not in seen_sections:
            seen_sections.add(name)
            unique_indices.append((idx, name, original_text))

    # Slice text by section indices
    section_texts: Dict[str, str] = {}
    for k in range(len(unique_indices)):
        start_idx, sec_name, _ = unique_indices[k]
        end_idx = unique_indices[k + 1][0] if k + 1 < len(unique_indices) else len(lines)
        section_lines = lines[start_idx + 1:end_idx]
        section_texts[sec_name] = "\n".join(section_lines).strip()

    # Also detect Contact info anywhere in the text if not matched as a header
    if "CONTACT" not in section_texts:
        if re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text) or re.search(r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b', text):
            seen_sections.add("CONTACT")
            section_texts["CONTACT"] = text[:300]  # top header area usually has contact

    present_sections = [sec for sec in ALL_CANONICAL_SECTIONS if sec in seen_sections]
    missing_sections = [sec for sec in ALL_CANONICAL_SECTIONS if sec not in seen_sections]

    return {
        "present_sections": present_sections,
        "missing_sections": missing_sections,
        "section_texts": section_texts,
        "completeness_percentage": int((len(present_sections) / len(ALL_CANONICAL_SECTIONS)) * 100)
    }
