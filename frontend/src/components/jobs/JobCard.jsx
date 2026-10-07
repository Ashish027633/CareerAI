import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { SkillBadge } from '../common/SkillBadge';
import { getMatchBadgeClass } from '../../utils/colorUtils';
import { formatDate } from '../../utils/formatters';
import { MapPin, Briefcase, IndianRupee, Clock, ArrowRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JobCard = ({
  job,
  onApply,
  showApplyButton = false,
  applied = false,
  className = '',
}) => {
  const matchClass = getMatchBadgeClass(job.matchPercentage || 0);

  return (
    <Card
      className={`flex flex-col justify-between transition-all duration-200 bg-white border border-border shadow-card hover:border-coral/40 hover:shadow-card-hover ${className}`}
    >
      <div>
        {/* Top Header: Company Info + Match Percentage Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={job.companyLogo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80'}
              alt={job.company}
              className="w-11 h-11 rounded-xl object-cover border border-border flex-shrink-0"
              loading="lazy"
            />
            <div>
              <h4 className="text-base font-bold text-slate-text hover:text-burgundy transition-colors leading-snug">
                <Link to={`/student/jobs/${job.id}`}>{job.title}</Link>
              </h4>
              <p className="text-xs text-slate-muted">{job.company}</p>
            </div>
          </div>

          {/* AI Match Badge */}
          {job.matchPercentage !== undefined && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${matchClass} flex-shrink-0`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{job.matchPercentage}% Match</span>
            </div>
          )}
        </div>

        {/* Key Job Meta Pills */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-muted my-3 py-2.5 border-y border-border">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-dim" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-slate-dim" />
            <span className="font-semibold text-slate-text">{job.salary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-dim" />
            <span>{job.experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-dim" />
            <span>Posted {formatDate(job.postedDate)}</span>
          </div>
        </div>

        {/* Skills preview */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-muted mb-2 font-mono">
            Required Technical Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {job.requiredSkills?.slice(0, 5).map((skill) => {
              const isMatched = job.matchedSkills?.includes(skill);
              return (
                <SkillBadge
                  key={skill}
                  skill={skill}
                  type={isMatched ? 'matched' : 'default'}
                  size="sm"
                />
              );
            })}
            {job.requiredSkills?.length > 5 && (
              <span className="text-[11px] text-slate-dim px-2 py-0.5 rounded-md bg-cream-soft border border-border flex items-center font-mono">
                +{job.requiredSkills.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
        <span className="text-xs text-slate-dim font-medium">
          {job.jobType} • Min CGPA: {job.minCgpa || '6.0'}
        </span>

        <div className="flex items-center gap-2">
          {showApplyButton && (
            <Button
              variant="outline"
              size="sm"
              disabled={applied}
              onClick={() => onApply && onApply(job)}
            >
              {applied ? 'Applied' : 'Apply'}
            </Button>
          )}
          <Link to={`/student/jobs/${job.id}`}>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              className="font-bold shadow-wine"
            >
              View Job
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
