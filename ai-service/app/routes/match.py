from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from app.schemas.match import JobMatchRequest, JobMatchResponse, JobMatchData
from app.services.job_matcher import match_job

router = APIRouter(prefix="/api/v1", tags=["Job Matching"])

@router.post("/match-job", response_model=JobMatchResponse)
async def analyze_job_match(request: JobMatchRequest):
    """
    Analyzes resume against job requirements to calculate AI Relevance score.
    """
    try:
        match_result = match_job(
            resume_text=request.resumeText,
            resume_skills=request.resumeSkills,
            job_title=request.jobTitle,
            job_description=request.jobDescription,
            raw_required_skills=request.requiredSkills,
            raw_optional_skills=request.optionalSkills
        )
        
        data = JobMatchData(**match_result)
        
        return JobMatchResponse(
            success=True,
            data=data
        )
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "message": f"An error occurred during job matching: {str(e)}"
            }
        )
