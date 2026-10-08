from typing import List, Dict, Any

def generate_recommendations(
    skills_data: Dict[str, Any],
    education_list: List[Dict[str, Any]],
    projects_list: List[Dict[str, Any]],
    experience_list: List[Dict[str, Any]],
    certifications_list: List[str],
    sections_data: Dict[str, Any]
) -> List[str]:
    """
    Generates rule-based, actionable resume improvement suggestions based on analysis gaps.
    """
    recommendations: List[str] = []

    missing_sections = sections_data.get("missing_sections", [])
    skills_count = skills_data.get("skillCount", 0)

    # 1. Projects Recommendation
    if len(projects_list) == 0 or "PROJECTS" in missing_sections:
        recommendations.append(
            "Add 1–2 relevant technical projects with clear descriptions and technologies used."
        )
    elif len(projects_list) == 1:
        recommendations.append(
            "Consider adding a second technical project to showcase breadth in technologies."
        )

    # 2. Skills Recommendation
    if skills_count < 5:
        recommendations.append(
            "Expand your technical skills section. List technologies, frameworks, and databases you have used."
        )

    if not skills_data.get("skillCategories", {}).get("Database"):
        recommendations.append(
            "Add relevant database technologies (e.g., MySQL, PostgreSQL, MongoDB, SQL) to strengthen your backend profile."
        )

    # 3. Certifications Recommendation
    if len(certifications_list) == 0:
        recommendations.append(
            "Consider adding relevant industry certifications (e.g. AWS, Oracle, NPTEL) or verified coursework to validate your skills."
        )

    # 4. Education Recommendation
    if not education_list:
        recommendations.append(
            "Ensure your education section clearly specifies your degree, field of study, college name, and graduation year."
        )
    elif education_list and not (education_list[0].get("cgpa") or education_list[0].get("percentage")):
        recommendations.append(
            "Consider adding your CGPA or academic percentage if it strengthens your academic profile."
        )

    # 5. Summary / Objective Recommendation
    if "SUMMARY" in missing_sections:
        recommendations.append(
            "Add a concise 2–3 sentence professional summary or career objective at the top of your resume."
        )

    # 6. Measurable outcomes suggestion if project descriptions are short
    has_short_desc = any(p.get("description") and len(p["description"]) < 50 for p in projects_list)
    if has_short_desc or len(projects_list) > 0:
        recommendations.append(
            "Where appropriate, incorporate measurable outcomes or metrics (e.g., optimized query speed by 25%, built REST APIs for 50+ endpoints)."
        )

    return recommendations
