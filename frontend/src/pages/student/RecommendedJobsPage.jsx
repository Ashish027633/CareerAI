import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/api/jobService';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SkillBadge } from '../../components/common/SkillBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorState } from '../../components/common/ErrorState';
import { getMatchBadgeClass } from '../../utils/colorUtils';
import {
  Briefcase,
  IndianRupee,
  MapPin,
  Sparkles,
  ChevronRight,
  Target
} from 'lucide-react';

export const RecommendedJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecommendedJobs();
  }, []);

  const loadRecommendedJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobService.getRecommendedJobs();
      if (res.success) {
        setJobs(res.data);
      } else {
        setError(res.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Finding roles that match your profile..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Recommendations Unavailable"
        message={error.includes('Analyze your resume first') 
          ? "Analyze your resume first to get personalized job matches." 
          : "CareerAI matching service is temporarily unavailable."}
        onRetry={loadRecommendedJobs}
      />
    );
  }

  if (jobs.length === 0) {
    return (
      <ErrorState
        title="No Recommended Jobs"
        message="We couldn't find any eligible jobs matching your profile right now."
        onRetry={loadRecommendedJobs}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1E1B1C] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" /> Recommended Jobs
          </h1>
          <p className="text-[#5F5A5C] text-sm mt-1">
            Roles prioritized by CareerAI based on your active resume and eligibility.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobs.map((match) => {
          const { job, matchPercentage, matchedSkills, missingSkills, aiRelevanceScore } = match;
          const matchClass = getMatchBadgeClass(matchPercentage);

          return (
            <Card
              key={job.id}
              className="hover:border-[#8B0026]/30 transition-all cursor-pointer group"
              onClick={() => navigate(`/student/jobs/${job.id}`)}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center border font-mono font-bold shadow-sm flex-shrink-0 ${matchClass}`}>
                    <span className="text-xl font-black">{matchPercentage}%</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E1B1C] group-hover:text-[#8B0026] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm font-medium text-[#5F5A5C] mt-0.5">{job.companyName}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#817B7E] mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#1E1B1C]">
                        <IndianRupee className="w-3.5 h-3.5 text-[#8B0026]" /> {job.salaryRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {job.experienceLevel}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-blue-600" /> AI Score: {aiRelevanceScore}/90
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-end gap-2 text-xs">
                  <div className="flex gap-2">
                    <span className="text-[#238B68] font-bold bg-[#238B68]/10 px-2 py-1 rounded-lg">
                      {matchedSkills?.length || 0} Matched
                    </span>
                    <span className="text-[#D64F63] font-bold bg-[#D64F63]/10 px-2 py-1 rounded-lg">
                      {missingSkills?.length || 0} Missing
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2 text-[#8B0026]">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
