from fastapi import APIRouter, UploadFile, File, HTTPException, status
from fastapi.responses import JSONResponse
from app.schemas.analysis import (
    ResumeAnalysisResponse,
    ResumeAnalysisData,
    EducationEntry,
    ProjectEntry,
    ExperienceEntry
)
from app.schemas.errors import ErrorResponse
from app.services.pdf_parser import extract_text_from_pdf
from app.services.text_cleaner import clean_text
from app.services.section_detector import detect_sections
from app.services.skill_extractor import extract_skills
from app.services.education_extractor import extract_education
from app.services.project_extractor import extract_projects
from app.services.experience_extractor import extract_experience
from app.services.certification_extractor import extract_certifications
from app.services.resume_scorer import calculate_resume_score
from app.services.recommendation_engine import generate_recommendations

router = APIRouter(prefix="/api/v1", tags=["Resume Intelligence Analysis"])

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

@router.post("/analyze-resume", response_model=ResumeAnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    """
    Analyzes uploaded PDF resume and returns structured Resume Intelligence breakdown.
    """
    if not file or not file.filename:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=ErrorResponse(
                error="INVALID_FILE",
                message="No resume file was uploaded."
            ).model_dump()
        )

    filename_lower = file.filename.lower()
    if not filename_lower.endswith(".pdf"):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=ErrorResponse(
                error="UNSUPPORTED_FORMAT",
                message="Only PDF documents are supported for resume analysis."
            ).model_dump()
        )

    pdf_bytes = await file.read()

    if len(pdf_bytes) == 0:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=ErrorResponse(
                error="EMPTY_FILE",
                message="Uploaded PDF file is empty."
            ).model_dump()
        )

    if len(pdf_bytes) > MAX_FILE_SIZE:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=ErrorResponse(
                error="FILE_TOO_LARGE",
                message="Resume file size exceeds the 10MB limit."
            ).model_dump()
        )

    # 1. Extract PDF Text
    pdf_result = extract_text_from_pdf(pdf_bytes)
    if not pdf_result.get("success"):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=ErrorResponse(
                error="UNREADABLE_PDF",
                message=pdf_result.get("error", "Unable to extract readable text from this resume.")
            ).model_dump()
        )

    raw_text = pdf_result.get("text", "")
    page_count = pdf_result.get("page_count", 1)

    # 2. Clean Text
    cleaned_text = clean_text(raw_text)

    # 3. Detect Sections
    sections_result = detect_sections(cleaned_text)
    section_texts = sections_result.get("section_texts", {})

    # 4. Extract Skills
    skills_result = extract_skills(cleaned_text)

    # 5. Extract Education
    education_raw = extract_education(cleaned_text, section_texts)
    education_models = [EducationEntry(**e) for e in education_raw]

    # 6. Extract Projects
    projects_raw = extract_projects(cleaned_text, section_texts)
    projects_models = [ProjectEntry(**p) for p in projects_raw]

    # 7. Extract Experience
    experience_raw, exp_level = extract_experience(cleaned_text, section_texts)
    experience_models = [ExperienceEntry(**e) for e in experience_raw]

    # 8. Extract Certifications
    certifications_list = extract_certifications(cleaned_text, section_texts)

    # 9. Calculate Resume Score
    overall_score, category_scores, score_reasons = calculate_resume_score(
        skills_data=skills_result,
        education_list=education_raw,
        projects_list=projects_raw,
        experience_list=experience_raw,
        certifications_list=certifications_list,
        sections_data=sections_result
    )

    # 10. Generate Recommendations
    recommendations = generate_recommendations(
        skills_data=skills_result,
        education_list=education_raw,
        projects_list=projects_raw,
        experience_list=experience_raw,
        certifications_list=certifications_list,
        sections_data=sections_result
    )

    analysis_data = ResumeAnalysisData(
        overallScore=overall_score,
        categoryScores=category_scores,
        scoreReasons=score_reasons,
        skills=skills_result.get("skills", []),
        skillCategories=skills_result.get("skillCategories", {}),
        skillCount=skills_result.get("skillCount", 0),
        education=education_models,
        projects=projects_models,
        experience=experience_models,
        experienceLevel=exp_level,
        certifications=certifications_list,
        sections=sections_result.get("present_sections", []),
        missingSections=sections_result.get("missing_sections", []),
        completenessPercentage=sections_result.get("completeness_percentage", 0),
        recommendations=recommendations,
        pageCount=page_count
    )

    return ResumeAnalysisResponse(
        success=True,
        message="Resume analysis completed successfully",
        data=analysis_data
    )
