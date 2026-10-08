import json
import os
import re
from typing import Dict, List, Any, Set

SKILLS_FILE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "skills.json")

def load_skills_taxonomy() -> List[Dict[str, Any]]:
    """Loads skill taxonomy from json file."""
    if os.path.exists(SKILLS_FILE_PATH):
        with open(SKILLS_FILE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def extract_skills(text: str) -> Dict[str, Any]:
    """
    Extracts skills using token-aware word boundary matching.
    Prevents false positive substring matches (e.g. 'java' matching 'javascript').
    """
    taxonomy = load_skills_taxonomy()
    detected_skills_set: Set[str] = set()
    category_map: Dict[str, List[str]] = {}

    if not text:
        return {
            "skills": [],
            "skillCategories": {},
            "skillCount": 0
        }

    lower_text = text.lower()

    for item in taxonomy:
        canonical = item["canonical"]
        category = item.get("category", "General")
        aliases = item.get("aliases", [])

        # Add canonical to search targets
        targets = set([canonical.lower()] + [a.lower() for a in aliases])

        found = False
        for target in targets:
            # Build regex pattern supporting special characters like C++, C#, .NET
            escaped = re.escape(target)
            
            # Special boundary handling for terms with +, #, ., /
            if target == "c++":
                pattern = r'(?:^|[^\w+])c\+\+(?:$|[^\w+])'
            elif target == "c#":
                pattern = r'(?:^|[^\w#])c#(?:$|[^\w#])'
            elif target in [".net", "asp.net", "dotnet"]:
                pattern = r'(?:\.net\b|asp\.net\b|\bdotnet\b)'
            elif "/" in target:
                pattern = r'(?:^|\s)' + escaped + r'(?:$|\s)'
            else:
                pattern = r'\b' + escaped + r'\b'

            if re.search(pattern, lower_text):
                found = True
                break

        if found:
            detected_skills_set.add(canonical)
            if category not in category_map:
                category_map[category] = []
            if canonical not in category_map[category]:
                category_map[category].append(canonical)

    sorted_skills = sorted(list(detected_skills_set))

    return {
        "skills": sorted_skills,
        "skillCategories": category_map,
        "skillCount": len(sorted_skills)
    }
