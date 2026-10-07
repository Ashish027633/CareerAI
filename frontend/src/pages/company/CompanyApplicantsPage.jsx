import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { applicationService } from '../../services/api/applicationService';
import { jobService } from '../../services/api/jobService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SkillBadge } from '../../components/common/SkillBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import {
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Sparkles,
  ArrowLeft,
  GraduationCap,
  Award,
  Users,
} from 'lucide-react';

export const CompanyApplicantsPage = () => {
  const { id } = useParams();
  const toast = useToast();

  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resJob, resApps] = await Promise.all([
        jobService.getJobById(id || 'job_01'),
        applicationService.getApplicantsByJobId(id || 'job_01'),
      ]);

      if (resJob.success) setJob(resJob.data);
      if (resApps.success) setApplicants(resApps.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleStatusUpdate = async (applicantId, newStatus) => {
    const res = await applicationService.updateApplicantStatus(applicantId, newStatus);
    if (res.success) {
      toast.success(res.message);
      setApplicants((prev) =>
        prev.map((a) => (a.id === applicantId ? { ...a, status: newStatus } : a))
      );
      if (selectedCandidate && selectedCandidate.id === applicantId) {
        setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
      }
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Ranking candidate talent graph..." />;
  }

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <div>
        <Link
          to="/company/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F5A5C] hover:text-[#8B0026] mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Jobs
        </Link>
      </div>

      <PageHeader
        title={`Applicants: ${job?.title || 'Java Backend Developer'}`}
        subtitle={`Total Candidates: ${applicants.length} • Dynamically ranked by ATS competency match`}
        badge={
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#8B0026]/10 text-[#8B0026] border border-[#8B0026]/20">
            ATS Ranked
          </span>
        }
      />

      {/* APPLICANTS TABLE / CARDS */}
      {applicants.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No candidates have applied yet"
          description="Applications from students who match your technical criteria will appear here automatically with resume ranking scores."
        />
      ) : (
        <div className="space-y-3.5">
          {applicants.map((cand) => (
            <Card
              key={cand.id}
              className="border-[#E8DED4] hover:border-[#8B0026]/40 transition-all shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Candidate Info */}
                <div className="flex items-start gap-4">
                  <img
                    src={cand.avatar}
                    alt={cand.candidateName}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#E8DED4] flex-shrink-0 shadow-2xs"
                  />
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-base font-bold text-[#1E1B1C]">
                        {cand.candidateName}
                      </h4>
                      <StatusBadge status={cand.status} />
                      <span className="text-[11px] text-[#817B7E] font-mono">
                        Applied: {cand.appliedDate}
                      </span>
                    </div>

                    <p className="text-xs text-[#5F5A5C] mt-0.5">
                      {cand.college} • {cand.branch} ({cand.graduationYear})
                    </p>

                    <div className="flex items-center gap-4 text-xs mt-2 text-[#5F5A5C] flex-wrap">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-[#817B7E]" />
                        CGPA: <strong className="text-[#1E1B1C]">{cand.cgpa}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#8B0026]" />
                        ATS Score: <strong className="text-[#8B0026] font-mono">{cand.resumeScore}/100</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#238B68]" />
                        Job Match: <strong className="text-[#238B68] font-mono">{cand.matchPercentage}%</strong>
                      </span>
                    </div>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cand.skills?.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-md bg-[#FAF5EF] text-[11px] text-[#5F5A5C] border border-[#E8DED4] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E8DED4]">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => setSelectedCandidate(cand)}
                  >
                    Dossier
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileText}
                    onClick={() => {
                      setSelectedCandidate(cand);
                      setResumeModalOpen(true);
                    }}
                  >
                    Resume PDF
                  </Button>

                  {cand.status !== 'Shortlisted' && (
                    <Button
                      variant="primary"
                      size="sm"
                      icon={CheckCircle}
                      onClick={() => handleStatusUpdate(cand.id, 'Shortlisted')}
                    >
                      Shortlist
                    </Button>
                  )}

                  {cand.status !== 'Rejected' && (
                    <Button
                      variant="danger"
                      size="sm"
                      icon={XCircle}
                      onClick={() => handleStatusUpdate(cand.id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CANDIDATE DETAIL MODAL */}
      {selectedCandidate && !resumeModalOpen && (
        <Modal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          title={`Candidate Dossier: ${selectedCandidate.candidateName}`}
          subtitle={`${selectedCandidate.college} • Applied: ${selectedCandidate.appliedDate}`}
          footer={
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleStatusUpdate(selectedCandidate.id, 'Rejected')}
              >
                Reject Candidate
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleStatusUpdate(selectedCandidate.id, 'Shortlisted')}
              >
                Mark Shortlisted
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                <p className="text-[#5F5A5C] text-[11px]">Match Score</p>
                <p className="text-base font-bold text-[#238B68] font-mono mt-0.5">{selectedCandidate.matchPercentage}%</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                <p className="text-[#5F5A5C] text-[11px]">Resume Score</p>
                <p className="text-base font-bold text-[#8B0026] font-mono mt-0.5">{selectedCandidate.resumeScore}/100</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                <p className="text-[#5F5A5C] text-[11px]">College CGPA</p>
                <p className="text-base font-bold text-[#1E1B1C] font-mono mt-0.5">{selectedCandidate.cgpa}</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-[#1E1B1C] mb-1">Contact Email:</p>
              <p className="text-[#5F5A5C] font-mono">{selectedCandidate.candidateEmail}</p>
            </div>

            <div>
              <p className="font-bold text-[#1E1B1C] mb-2">Verified Skill Stack:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.skills?.map((s) => (
                  <SkillBadge key={s} skill={s} type="matched" size="sm" />
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#8B0026]/10 border border-[#8B0026]/20 text-[#5F5A5C]">
              <strong className="text-[#8B0026]">Recruiter Recommendation: </strong>
              Candidate exceeds the minimum CGPA cutoff (8.1 vs 7.5 required) and displays advanced competency in Java, Spring Boot, and MySQL microservices.
            </div>
          </div>
        </Modal>
      )}

      {/* VIEW RESUME MODAL */}
      {resumeModalOpen && selectedCandidate && (
        <Modal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
          title={`Verified Resume: ${selectedCandidate.candidateName}`}
          subtitle="Machine parsed PDF transcript"
          footer={
            <Button variant="outline" size="sm" onClick={() => setResumeModalOpen(false)}>
              Close
            </Button>
          }
        >
          <div className="bg-[#FAF5EF] text-[#1E1B1C] p-6 rounded-xl border border-[#E8DED4] text-xs space-y-3 font-sans shadow-inner">
            <div className="border-b border-[#E8DED4] pb-2.5 text-center">
              <h2 className="text-base font-black uppercase text-[#1E1B1C]">{selectedCandidate.candidateName}</h2>
              <p className="text-[#5F5A5C] text-[11px] font-mono mt-0.5">{selectedCandidate.candidateEmail} • {selectedCandidate.college}</p>
            </div>
            <div>
              <h3 className="font-bold border-b border-[#E8DED4] pb-0.5 uppercase text-[#8B0026] text-[11px]">Academic Background</h3>
              <p className="text-[#5F5A5C] mt-1">{selectedCandidate.branch} (Batch {selectedCandidate.graduationYear}) • CGPA: <strong className="text-[#1E1B1C]">{selectedCandidate.cgpa}/10.0</strong></p>
            </div>
            <div>
              <h3 className="font-bold border-b border-[#E8DED4] pb-0.5 uppercase text-[#8B0026] text-[11px]">Extracted Core Competencies</h3>
              <p className="text-[#5F5A5C] mt-1 leading-relaxed">{selectedCandidate.skills.join(', ')}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
