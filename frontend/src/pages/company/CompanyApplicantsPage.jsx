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
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [resJob, resApps] = await Promise.all([
        jobService.getJobById(id).catch(() => ({ success: false, data: null })),
        applicationService.getApplicantsByJobId(id).catch(() => ({ success: false, data: [] })),
      ]);

      if (resJob?.success) setJob(resJob.data);
      if (resApps?.success && Array.isArray(resApps.data)) {
        setApplicants(resApps.data);
      } else {
        setApplicants([]);
      }
    } catch (err) {
      console.error('Error loading applicants:', err);
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
    return <LoadingSpinner fullPage message="Loading candidate dossier..." />;
  }

  const jobTitle = job?.title || 'Job Requisition';

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
        title={`Applicants: ${jobTitle}`}
        subtitle={`Total Candidates: ${applicants.length} • Verified candidate applications`}
        badge={
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#8B0026]/10 text-[#8B0026] border border-[#8B0026]/20">
            {applicants.length} Candidates
          </span>
        }
      />

      {/* APPLICANTS TABLE / CARDS */}
      {applicants.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No candidates have applied yet"
          description="Applications from students who match your technical criteria will appear here automatically with verified details."
        />
      ) : (
        <div className="space-y-3.5">
          {applicants.map((cand) => {
            const name = cand.studentName || cand.candidateName || 'Candidate';
            const email = cand.studentEmail || cand.candidateEmail || 'No email provided';
            const appliedDateStr = cand.appliedAt ? new Date(cand.appliedAt).toLocaleDateString() : (cand.appliedDate || 'Recent');
            const skillsList = Array.isArray(cand.skills) ? cand.skills : [];

            return (
              <Card
                key={cand.id}
                className="border-[#E8DED4] hover:border-[#8B0026]/40 transition-all shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Candidate Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF5EF] border border-[#E8DED4] flex items-center justify-center font-bold text-[#8B0026] text-lg flex-shrink-0 shadow-2xs">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-base font-bold text-[#1E1B1C]">
                          {name}
                        </h4>
                        <StatusBadge status={cand.status} />
                        <span className="text-[11px] text-[#817B7E] font-mono">
                          Applied: {appliedDateStr}
                        </span>
                      </div>

                      <p className="text-xs text-[#5F5A5C] mt-0.5">
                        {email} {cand.college ? `• ${cand.college}` : ''}
                      </p>

                      <div className="flex items-center gap-4 text-xs mt-2 text-[#5F5A5C] flex-wrap">
                        {cand.cgpa && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5 text-[#817B7E]" />
                            CGPA: <strong className="text-[#1E1B1C]">{cand.cgpa}</strong>
                          </span>
                        )}
                        {cand.resumeScore != null && (
                          <span className="flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-[#8B0026]" />
                            ATS Score: <strong className="text-[#8B0026] font-mono">{cand.resumeScore}/100</strong>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#238B68]" />
                          Match: <strong className="text-[#238B68] font-mono">{cand.matchPercentage != null ? `${cand.matchPercentage}%` : 'Pending'}</strong>
                        </span>
                      </div>

                      {/* Skills badges */}
                      {skillsList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {skillsList.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded-md bg-[#FAF5EF] text-[11px] text-[#5F5A5C] border border-[#E8DED4] font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
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
            );
          })}
        </div>
      )}

      {/* CANDIDATE DETAIL MODAL */}
      {selectedCandidate && !resumeModalOpen && (
        <Modal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          title={`Candidate Dossier: ${selectedCandidate.studentName || selectedCandidate.candidateName || 'Candidate'}`}
          subtitle={`Applied: ${selectedCandidate.appliedAt ? new Date(selectedCandidate.appliedAt).toLocaleDateString() : (selectedCandidate.appliedDate || 'Recent')}`}
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
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                <p className="text-[#5F5A5C] text-[11px]">Match Rating</p>
                <p className="text-base font-bold text-[#238B68] font-mono mt-0.5">
                  {selectedCandidate.matchPercentage != null ? `${selectedCandidate.matchPercentage}%` : 'Pending'}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                <p className="text-[#5F5A5C] text-[11px]">Pipeline Status</p>
                <p className="text-base font-bold text-[#8B0026] font-mono mt-0.5">{selectedCandidate.status || 'APPLIED'}</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-[#1E1B1C] mb-1">Contact Email:</p>
              <p className="text-[#5F5A5C] font-mono">{selectedCandidate.studentEmail || selectedCandidate.candidateEmail || 'Not specified'}</p>
            </div>

            {Array.isArray(selectedCandidate.skills) && selectedCandidate.skills.length > 0 && (
              <div>
                <p className="font-bold text-[#1E1B1C] mb-2">Technical Skills:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((s) => (
                    <SkillBadge key={s} skill={s} type="matched" size="sm" />
                  ))}
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] text-[#5F5A5C]">
              <strong className="text-[#8B0026]">Recruiter Note: </strong>
              Candidate submission verified through CareerAI platform. Review dossier and advance through pipeline as appropriate.
            </div>
          </div>
        </Modal>
      )}

      {/* VIEW RESUME MODAL */}
      {resumeModalOpen && selectedCandidate && (
        <Modal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
          title={`Candidate Dossier: ${selectedCandidate.studentName || selectedCandidate.candidateName || 'Candidate'}`}
          subtitle="Application Transcript"
          footer={
            <Button variant="outline" size="sm" onClick={() => setResumeModalOpen(false)}>
              Close
            </Button>
          }
        >
          <div className="bg-[#FAF5EF] text-[#1E1B1C] p-6 rounded-xl border border-[#E8DED4] text-xs space-y-3 font-sans shadow-inner">
            <div className="border-b border-[#E8DED4] pb-2.5 text-center">
              <h2 className="text-base font-black uppercase text-[#1E1B1C]">{selectedCandidate.studentName || selectedCandidate.candidateName || 'Candidate'}</h2>
              <p className="text-[#5F5A5C] text-[11px] font-mono mt-0.5">{selectedCandidate.studentEmail || selectedCandidate.candidateEmail || 'No email'} {selectedCandidate.college ? `• ${selectedCandidate.college}` : ''}</p>
            </div>
            {(selectedCandidate.branch || selectedCandidate.cgpa) && (
              <div>
                <h3 className="font-bold border-b border-[#E8DED4] pb-0.5 uppercase text-[#8B0026] text-[11px]">Academic Background</h3>
                <p className="text-[#5F5A5C] mt-1">{selectedCandidate.branch || ''} {selectedCandidate.graduationYear ? `(Batch ${selectedCandidate.graduationYear})` : ''} {selectedCandidate.cgpa ? `• CGPA: ${selectedCandidate.cgpa}` : ''}</p>
              </div>
            )}
            <div>
              <h3 className="font-bold border-b border-[#E8DED4] pb-0.5 uppercase text-[#8B0026] text-[11px]">Candidate Match Details</h3>
              <p className="text-[#5F5A5C] mt-1 leading-relaxed">
                {Array.isArray(selectedCandidate.skills) && selectedCandidate.skills.length > 0
                  ? selectedCandidate.skills.join(', ')
                  : 'Skills evaluated during ATS resume matching.'}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
