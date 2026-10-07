import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../../services/api/interviewService';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  User,
  Sparkles,
} from 'lucide-react';

export const StudentInterviewsPage = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    setLoading(true);
    try {
      const res = await interviewService.getMyInterviews();
      if (res.success) setInterviews(res.data);
    } finally {
      setLoading(false);
    }
  };

  const upcoming = interviews.filter((i) => i.status === 'Upcoming');
  const past = interviews.filter((i) => i.status !== 'Upcoming');

  if (loading) {
    return <LoadingSpinner fullPage message="Fetching scheduled interview rounds..." />;
  }

  return (
    <div className="w-full space-y-8 animate-fade-up">
      <PageHeader
        title="Campus Interview Schedule"
        subtitle="Technical coding rounds, system architecture assessments, and HR discussions arranged by university recruiting partners."
      />

      {interviews.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No scheduled interviews"
          description="When campus recruiters review your applications and schedule interview rounds, they will show up here."
          actionText="Find Opportunities"
          onAction={() => navigate('/student/jobs')}
        />
      ) : (
        <>
          {/* UPCOMING INTERVIEWS */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B0026] mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Upcoming Rounds ({upcoming.length})
            </h3>

            <div className="space-y-4">
              {upcoming.map((item) => (
                <Card key={item.id} className="border-[#E8DED4] shadow-sm hover:border-[#8B0026]/40 transition-all">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#E8DED4]">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.companyLogo}
                        alt={item.company}
                        className="w-12 h-12 rounded-xl object-cover border border-[#E8DED4] flex-shrink-0 shadow-2xs"
                      />
                      <div>
                        <h4 className="text-base font-bold text-[#1E1B1C]">{item.jobTitle}</h4>
                        <p className="text-xs text-[#8B0026] font-semibold">{item.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <StatusBadge status={item.status} />
                      <a href={item.meetingLink} target="_blank" rel="noreferrer">
                        <Button variant="primary" size="sm" icon={Video} className="shadow-2xs">
                          Join Meeting
                        </Button>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                      <span className="text-[10px] text-[#5F5A5C] uppercase tracking-wider font-semibold">Date & Slot</span>
                      <p className="text-[#1E1B1C] font-bold mt-1 flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#8B0026]" />
                        <span>{item.date} • {item.time}</span>
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                      <span className="text-[10px] text-[#5F5A5C] uppercase tracking-wider font-semibold">Round Focus</span>
                      <p className="text-[#1E1B1C] font-bold mt-1 truncate">{item.type}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                      <span className="text-[10px] text-[#5F5A5C] uppercase tracking-wider font-semibold">Interviewer</span>
                      <p className="text-[#1E1B1C] font-bold mt-1 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#5F5A5C]" />
                        <span>{item.interviewer}</span>
                      </p>
                    </div>
                  </div>

                  {item.notes && (
                    <div className="p-3.5 rounded-xl bg-[#FAF5EF]/70 border border-[#E8DED4] text-xs text-[#5F5A5C]">
                      <strong className="text-[#1E1B1C]">Preparation Guidelines: </strong>
                      {item.notes}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* PAST INTERVIEWS */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#5F5A5C] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#238B68]" /> Concluded Rounds ({past.length})
            </h3>

            <div className="space-y-4">
              {past.map((item) => (
                <Card key={item.id} className="border-[#E8DED4] shadow-2xs opacity-95">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.companyLogo}
                        alt={item.company}
                        className="w-10 h-10 rounded-xl object-cover border border-[#E8DED4] shadow-2xs"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#1E1B1C]">{item.jobTitle}</h4>
                        <p className="text-xs text-[#5F5A5C]">{item.company} • {item.date}</p>
                      </div>
                    </div>

                    <StatusBadge status={item.status} />
                  </div>

                  <div className="mt-3.5 pt-3.5 border-t border-[#E8DED4] text-xs text-[#5F5A5C]">
                    <p>
                      <strong className="text-[#1E1B1C]">Evaluation Summary: </strong>
                      {item.notes}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
