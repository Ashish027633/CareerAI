from typing import Dict, List, Any, Tuple

def calculate_resume_score(
    skills_data: Dict[str, Any],
    education_list: List[Dict[str, Any]],
    projects_list: List[Dict[str, Any]],
    experience_list: List[Dict[str, Any]],
    certifications_list: List[str],
    sections_data: Dict[str, Any]
) -> Tuple[int, Dict[str, int], Dict[str, str]]:
    """
    Calculates the transparent CareerAI Resume Readiness Score (0-100).
    Max Category Breakdown:
    - Skills = 25
    - Projects = 20
    - Education = 15
    - Experience = 15
    - Certifications = 10
    - Structure = 10
    - Completeness = 5
    """
    category_scores: Dict[str, int] = {}
    score_reasons: Dict[str, str] = {}

    # 1. Skills Score (Max 25)
    skills_count = skills_data.get("skillCount", 0)
    categories_count = len(skills_data.get("skillCategories", {}))

    if skills_count == 0:
        skills_score = 0
        skills_reason = "No recognized technical skills detected in the resume."
    elif skills_count <= 3:
        skills_score = 10
        skills_reason = f"Basic skill set detected ({skills_count} skills). Add more core technologies."
    elif skills_count <= 7:
        skills_score = 18
        skills_reason = f"Good technical skills detected ({skills_count} skills across {categories_count} categories)."
    else:
        skills_score = 25
        skills_reason = f"Strong, diverse technical skill set detected ({skills_count} skills across {categories_count} categories)."

    category_scores["skills"] = skills_score
    score_reasons["skills"] = skills_reason

    # 2. Projects Score (Max 20)
    proj_count = len(projects_list)
    has_tech_details = any(len(p.get("technologies", [])) > 0 for p in projects_list)

    if proj_count == 0:
        projects_score = 0
        projects_reason = "No projects section or detailed projects detected."
    elif proj_count == 1:
        projects_score = 12 if has_tech_details else 8
        projects_reason = "Single project detected. Adding 1-2 additional technical projects is recommended."
    else:
        projects_score = 20 if has_tech_details else 15
        projects_reason = f"Multiple projects ({proj_count}) detected with technology details."

    category_scores["projects"] = projects_score
    score_reasons["projects"] = projects_reason

    # 3. Education Score (Max 15)
    if not education_list:
        edu_score = 0
        edu_reason = "No clear education entry detected."
    else:
        edu = education_list[0]
        has_degree = bool(edu.get("degree"))
        has_institution = bool(edu.get("institution"))
        has_score = bool(edu.get("cgpa") or edu.get("percentage"))

        if has_degree and has_institution and has_score:
            edu_score = 15
            edu_reason = f"Complete education info present ({edu.get('degree')} with academic marks)."
        elif has_degree and has_institution:
            edu_score = 12
            edu_reason = f"Degree ({edu.get('degree')}) and institution identified."
        elif has_degree:
            edu_score = 8
            edu_reason = f"Degree level identified ({edu.get('degree')})."
        else:
            edu_score = 5
            edu_reason = "Partial education information found."

    category_scores["education"] = edu_score
    score_reasons["education"] = edu_reason

    # 4. Experience Score (Max 15)
    exp_count = len(experience_list)
    if exp_count == 0:
        exp_score = 5  # Baseline score for freshers
        exp_reason = "No prior professional experience or internships detected (Fresher baseline)."
    elif exp_count == 1:
        exp_score = 10
        exp_reason = "1 internship or work experience entry identified."
    else:
        exp_score = 15
        exp_reason = f"Multiple work experience / internship entries ({exp_count}) identified."

    category_scores["experience"] = exp_score
    score_reasons["experience"] = exp_reason

    # 5. Certifications Score (Max 10)
    cert_count = len(certifications_list)
    if cert_count == 0:
        cert_score = 0
        cert_reason = "No recognized industry certifications detected."
    elif cert_count == 1:
        cert_score = 6
        cert_reason = f"1 verified certification detected: {certifications_list[0]}."
    else:
        cert_score = 10
        cert_reason = f"Multiple verified certifications detected ({cert_count})."

    category_scores["certifications"] = cert_score
    score_reasons["certifications"] = cert_reason

    # 6. Structure Score (Max 10)
    present_sections = sections_data.get("present_sections", [])
    core_sections = ["CONTACT", "SKILLS", "EDUCATION", "PROJECTS"]
    matched_core = [s for s in core_sections if s in present_sections]

    struct_score = int(len(matched_core) * 2.5)
    struct_reason = f"Resume contains {len(matched_core)} out of 4 core structural sections."

    category_scores["structure"] = struct_score
    score_reasons["structure"] = struct_reason

    # 7. Completeness Score (Max 5)
    comp_pct = sections_data.get("completeness_percentage", 0)
    comp_score = int(round((comp_pct / 100.0) * 5))
    comp_reason = f"Overall section completeness evaluated at {comp_pct}%."

    category_scores["completeness"] = comp_score
    score_reasons["completeness"] = comp_reason

    # Total Overall Score
    overall_score = sum(category_scores.values())
    overall_score = max(0, min(100, overall_score))

    return overall_score, category_scores, score_reasons
