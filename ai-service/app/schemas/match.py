from pydantic import BaseModel
from typing import List

class JobMatchRequest(BaseModel):
    resumeText: str
    resumeSkills: List[str]
    jobTitle: str
    jobDescription: str
    requiredSkills: List[str]
    optionalSkills: List[str]

class JobMatchData(BaseModel):
    aiRelevanceScore: int
    requiredSkillScore: int
    optionalSkillScore: int
    semanticSimilarityScore: int
    matchedSkills: List[str]
    missingSkills: List[str]
    matchedOptionalSkills: List[str]
    matchingReasons: List[str]

class JobMatchResponse(BaseModel):
    success: bool
    message: str = "Job match analysis completed successfully"
    data: JobMatchData
