from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class EducationEntry(BaseModel):
    degree: Optional[str] = None
    field: Optional[str] = None
    institution: Optional[str] = None
    graduationYear: Optional[str] = None
    cgpa: Optional[str] = None
    percentage: Optional[str] = None

class ProjectEntry(BaseModel):
    name: str
    description: Optional[str] = None
    technologies: List[str] = []

class ExperienceEntry(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    duration: Optional[str] = None
    description: Optional[str] = None

class CategoryScoreDetail(BaseModel):
    score: int
    maxScore: int
    reason: str

class ResumeAnalysisData(BaseModel):
    overallScore: int = Field(..., ge=0, le=100)
    categoryScores: Dict[str, int]
    scoreReasons: Dict[str, str]
    skills: List[str] = []
    skillCategories: Dict[str, List[str]] = {}
    skillCount: int = 0
    education: List[EducationEntry] = []
    projects: List[ProjectEntry] = []
    experience: List[ExperienceEntry] = []
    experienceLevel: str = "FRESHER"
    certifications: List[str] = []
    sections: List[str] = []
    missingSections: List[str] = []
    completenessPercentage: int = 0
    recommendations: List[str] = []
    pageCount: int = 0

class ResumeAnalysisResponse(BaseModel):
    success: bool = True
    message: str = "Resume analysis completed successfully"
    data: ResumeAnalysisData
