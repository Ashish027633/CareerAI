import re
from typing import List, Dict

KNOWN_CERT_PROVIDERS = [
    r'\baws\s+certified\b',
    r'\bmicrosoft\s+certified\b',
    r'\bgoogle\s+cloud\b',
    r'\boracle\s+certified\b',
    r'\bnptel\b',
    r'\bcisco\b',
    r'\bred\s+hat\b',
    r'\bcomptia\b',
    r'\bpmp\b',
    r'\bcertified\s+kubernetes\b',
    r'\bprofessional\s+certificate\b',
    r'\bcertified\s+developer\b',
    r'\bcertified\s+solutions\s+architect\b'
]

def extract_certifications(text: str, section_texts: Dict[str, str]) -> List[str]:
    """
    Extracts recognized certifications from CERTIFICATIONS section or full text.
    Filters out casual online tutorials or unverified courses.
    """
    cert_text = section_texts.get("CERTIFICATIONS", "")
    target_text = cert_text if cert_text else text

    if not target_text:
        return []

    lines = [l.strip() for l in target_text.split('\n') if l.strip()]
    certifications: List[str] = []

    for line in lines:
        clean_line = re.sub(r'^[-\u2022\*\d+\.\s]+', '', line).strip()
        if len(clean_line) < 5 or len(clean_line) > 100:
            continue

        # Check if line contains known cert provider or keywords
        is_cert = False
        for pat in KNOWN_CERT_PROVIDERS:
            if re.search(pat, clean_line, re.IGNORECASE):
                is_cert = True
                break

        # Also if inside CERTIFICATIONS section and line looks like a certificate title
        if not is_cert and cert_text and len(clean_line) <= 70:
            if re.search(r'\b(?:certificate|certification|certified|coursework|diploma)\b', clean_line, re.IGNORECASE):
                is_cert = True

        if is_cert and clean_line not in certifications:
            certifications.append(clean_line)

    return certifications
