from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.services.skill_extractor import load_skills_taxonomy

def normalize_skills(raw_skills: List[str], taxonomy: List[Dict[str, Any]]) -> List[str]:
    normalized = set()
    for raw in raw_skills:
        raw_lower = raw.strip().lower()
        if not raw_lower:
            continue
        found = False
        for item in taxonomy:
            canonical = item["canonical"]
            aliases = [a.lower() for a in item.get("aliases", [])]
            if raw_lower == canonical.lower() or raw_lower in aliases:
                normalized.add(canonical)
                found = True
                break
        if not found:
            normalized.add(raw.strip())
    return sorted(list(normalized))

def match_job(
    resume_text: str,
    resume_skills: List[str],
    job_title: str,
    job_description: str,
    raw_required_skills: List[str],
    raw_optional_skills: List[str]
) -> Dict[str, Any]:
    taxonomy = load_skills_taxonomy()
    
    req_skills = normalize_skills(raw_required_skills, taxonomy)
    opt_skills = normalize_skills(raw_optional_skills, taxonomy)
    
    res_skills = set([s.lower() for s in resume_skills])
    
    matched_req = []
    missing_req = []
    
    for req in req_skills:
        if req.lower() in res_skills:
            matched_req.append(req)
        else:
            missing_req.append(req)
            
    matched_opt = []
    for opt in opt_skills:
        if opt.lower() in res_skills:
            matched_opt.append(opt)
            
    # Required Skill Score (max 60)
    if not req_skills:
        required_skill_score = 60
    else:
        req_ratio = len(matched_req) / len(req_skills)
        required_skill_score = round(req_ratio * 60)
        
    # Optional Skill Score (max 15)
    if not opt_skills:
        optional_skill_score = 15
    else:
        opt_ratio = len(matched_opt) / len(opt_skills)
        optional_skill_score = round(opt_ratio * 15)
        
    # Semantic Similarity (max 15)
    job_text = f"{job_title}\n{job_description}".strip()
    semantic_similarity_score = 0
    similarity_percentage = 0
    
    if len(resume_text.split()) > 20 and len(job_text.split()) > 20:
        try:
            vectorizer = TfidfVectorizer(stop_words='english')
            tfidf_matrix = vectorizer.fit_transform([resume_text, job_text])
            cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            similarity_percentage = round(cosine_sim * 100)
            semantic_similarity_score = round(cosine_sim * 15)
        except Exception:
            semantic_similarity_score = 0
    else:
        semantic_similarity_score = 0
            
    ai_relevance_score = required_skill_score + optional_skill_score + semantic_similarity_score
    
    reasons = []
    if required_skill_score == 60:
        reasons.append("Strong coverage of required skills.")
    elif required_skill_score >= 40:
        reasons.append("Most required skills are present.")
    else:
        reasons.append(f"{len(missing_req)} required skill(s) are missing.")
        
    if semantic_similarity_score > 10:
        reasons.append("Resume content is strongly related to the job description.")
    elif semantic_similarity_score == 0:
        reasons.append("Semantic similarity could not be calculated from the available text.")
        
    return {
        "aiRelevanceScore": ai_relevance_score,
        "requiredSkillScore": required_skill_score,
        "optionalSkillScore": optional_skill_score,
        "semanticSimilarityScore": semantic_similarity_score,
        "matchedSkills": matched_req,
        "missingSkills": missing_req,
        "matchedOptionalSkills": matched_opt,
        "matchingReasons": reasons
    }
