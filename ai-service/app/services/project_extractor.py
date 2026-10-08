import re
from typing import List, Dict, Any
from app.services.skill_extractor import extract_skills

def extract_projects(text: str, section_texts: Dict[str, str]) -> List[Dict[str, Any]]:
    """
    Extracts projects from the PROJECTS section or full resume text.
    Identifies project title, description, and technologies used.
    """
    projects_text = section_texts.get("PROJECTS", "")
    if not projects_text:
        return []

    lines = [l.strip() for l in projects_text.split('\n') if l.strip()]
    if not lines:
        return []

    projects: List[Dict[str, Any]] = []
    current_project: Dict[str, Any] = None
    desc_lines: List[str] = []

    for line in lines:
        # Check if line looks like a project title/header (bullet point, bold name, or project line)
        is_title = False
        clean_line = re.sub(r'^[-\u2022\*\d+\.\s]+', '', line).strip()

        # If line contains " - " or ":" or is short and doesn't start with action verb, it might be a title
        if re.search(r'^(?:Project|Title|Name)\s*:', clean_line, re.IGNORECASE):
            is_title = True
            clean_line = re.sub(r'^(?:Project|Title|Name)\s*:\s*', '', clean_line, flags=re.IGNORECASE)
        elif 3 <= len(clean_line) <= 60 and not re.search(r'^(?:Developed|Built|Created|Implemented|Designed|Used|Utilized|Worked|Managed|Integrated)\b', clean_line, re.IGNORECASE):
            if current_project is None or len(desc_lines) >= 1:
                is_title = True

        if is_title:
            if current_project and current_project.get("name"):
                full_desc = " ".join(desc_lines).strip()
                current_project["description"] = full_desc if full_desc else None
                techs = extract_skills(full_desc + " " + current_project["name"])["skills"]
                current_project["technologies"] = techs
                projects.append(current_project)

            current_project = {
                "name": clean_line,
                "description": None,
                "technologies": []
            }
            desc_lines = []
        else:
            if current_project:
                desc_lines.append(clean_line)
            else:
                # If first lines are text before explicit title
                current_project = {
                    "name": clean_line,
                    "description": None,
                    "technologies": []
                }

    if current_project and current_project.get("name"):
        full_desc = " ".join(desc_lines).strip()
        current_project["description"] = full_desc if full_desc else None
        techs = extract_skills((full_desc or "") + " " + current_project["name"])["skills"]
        current_project["technologies"] = techs
        projects.append(current_project)

    return projects
