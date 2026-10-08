import re
#from typing import List, Dict, Any, Tuple
from typing import Dict, List, Optional, Tuple

ROLE_PATTERNS = [
    r'\b(?:software\s+developer|software\s+engineer|sde|web\s+developer|full\s+stack\s+developer|frontend\s+developer|backend\s+developer|data\s+scientist|data\s+analyst|qa\s+engineer|devops\s+engineer|intern|trainee|associate)\b'
]

def extract_experience(text: str, section_texts: Dict[str, str]) -> Tuple[List[Dict[str, Optional[str]]], str]:
    """
    Extracts work experience / internship records.
    Returns (experience_list, experience_level).
    If no experience is found, returns ([], "FRESHER").
    """
    exp_text = section_texts.get("EXPERIENCE", "")
    if not exp_text:
        return [], "FRESHER"

    lines = [l.strip() for l in exp_text.split('\n') if l.strip()]
    if not lines:
        return [], "FRESHER"

    experiences: List[Dict[str, Optional[str]]] = []
    current_exp: Dict[str, Optional[str]] = None
    desc_lines: List[str] = []

    for line in lines:
        clean_line = re.sub(r'^[-\u2022\*\d+\.\s]+', '', line).strip()

        # Look for role or company indicators
        has_role = re.search(ROLE_PATTERNS[0], clean_line, re.IGNORECASE)
        has_duration = re.search(r'\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|[0-9]{4})\b.*\b(?:Present|[0-9]{4})\b', clean_line, re.IGNORECASE)

        if (has_role or has_duration) and len(clean_line) <= 80:
            if current_exp:
                current_exp["description"] = " ".join(desc_lines).strip() if desc_lines else None
                experiences.append(current_exp)

            role = clean_line if has_role else None
            duration = has_duration.group(0) if has_duration else None

            current_exp = {
                "company": clean_line if not has_role else None,
                "role": role,
                "duration": duration,
                "description": None
            }
            desc_lines = []
        else:
            if current_exp:
                desc_lines.append(clean_line)
            else:
                current_exp = {
                    "company": None,
                    "role": clean_line if len(clean_line) <= 60 else None,
                    "duration": None,
                    "description": None
                }
                desc_lines = []

    if current_exp:
        current_exp["description"] = " ".join(desc_lines).strip() if desc_lines else None
        experiences.append(current_exp)

    exp_level = "EXPERIENCED" if len(experiences) > 0 else "FRESHER"
    return experiences, exp_level
