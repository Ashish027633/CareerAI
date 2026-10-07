import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { resumeService } from '../../services/api/resumeService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import {
  UploadCloud,
  FileText,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Download,
  AlertCircle,
} from 'lucide-react';

export const StudentResumePage = () => {
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploadStage, setUploadStage] = useState('');

  const loadResume = async () => {
    setLoading(true);
    try {
      const res = await resumeService.getResume();
      if (res.success) setResume(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const validateAndUpload = async (file) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast.error('Invalid file format. Please upload a PDF resume document.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds the 5MB maximum limit.');
      return;
    }

    setUploading(true);
    try {
      setUploadStage('Scanning PDF document stream...');
      await new Promise((r) => setTimeout(r, 600));

      setUploadStage('Extracting technical competencies...');
      await new Promise((r) => setTimeout(r, 700));

      setUploadStage('Benchmarking against recruiter requirements...');
      await new Promise((r) => setTimeout(r, 600));

      const res = await resumeService.uploadResume(file);
      if (res.success) {
        setUploadStage('Analysis ready.');
        await new Promise((r) => setTimeout(r, 400));
        setResume(res.data);
        toast.success('Resume uploaded and benchmarked successfully!');
      }
    } catch {
      toast.error('Failed to upload resume file.');
    } finally {
      setUploading(false);
      setUploadStage('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateAndUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDeleteResume = async () => {
    setDeleting(true);
    try {
      const res = await resumeService.deleteResume();
      if (res.success) {
        setResume(null);
        toast.success('Resume deleted successfully.');
        setDeleteModalOpen(false);
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Accessing student resume vault..." />;
  }

  return (
    <div className="w-full space-y-7 animate-fade-up">
      <PageHeader
        title="Resume Vault & ATS Verification"
        subtitle="Upload and manage your master PDF resume. CareerAI parses skill entities, formatting structure, and ATS readiness for campus placement drives."
        actions={
          <Link to="/student/resume-analysis">
            <Button variant="accent" size="sm" icon={Sparkles}>
              View ATS Analysis (82/100)
            </Button>
          </Link>
        }
      />

      {/* 1. ACTIVE MASTER RESUME CARD */}
      {resume ? (
        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E8DED4]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#8B0026]/10 border border-[#8B0026]/20 flex items-center justify-center text-[#8B0026] flex-shrink-0 shadow-sm">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-base font-bold text-[#1E1B1C]">{resume.fileName}</h3>
                  <StatusBadge status={resume.status} />
                </div>
                <p className="text-xs text-[#5F5A5C] mt-1">
                  File Size: <strong className="text-[#1E1B1C]">{resume.fileSize}</strong> • Uploaded: {formatDate(resume.uploadedAt)} • Document Version: {resume.version}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => setPreviewOpen(true)}
              >
                Inspect
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={RefreshCw}
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                Replace
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#238B68]/10 text-[#238B68] flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#1E1B1C]">PDF Format Validated</span>
                <p className="text-[11px] text-[#5F5A5C]">Single-column, machine readable</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8B0026]/10 text-[#8B0026] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#1E1B1C]">ATS Parser Certified</span>
                <p className="text-[11px] text-[#5F5A5C]">Standard section headers detected</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D64F63]/10 text-[#D64F63] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#1E1B1C]">Overall Score: 82/100</span>
                <p className="text-[11px] text-[#5F5A5C]">Top 15th percentile in cohort</p>
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {/* 2. DRAG AND DROP UPLOAD ZONE */}
      <Card className="border-[#E8DED4] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#1E1B1C]">
            {resume ? 'Upload Revised Document (Replaces Current Master)' : 'Upload Master Resume PDF'}
          </h3>
          <span className="text-xs font-mono text-[#5F5A5C] bg-[#FAF5EF] px-2.5 py-1 rounded-md border border-[#E8DED4]">
            PDF Only • Max 5MB
          </span>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? 'border-[#8B0026] bg-[#8B0026]/5 scale-[0.99]'
              : 'border-[#E8DED4] hover:border-[#8B0026]/50 bg-[#FAF5EF]/60 hover:bg-[#FAF5EF]'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#E8DED4] flex items-center justify-center text-[#8B0026] mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h4 className="text-base font-bold text-[#1E1B1C] mb-1">
            {uploading ? (
              <span className="text-[#8B0026] font-mono animate-pulse">{uploadStage}</span>
            ) : (
              'Drag and drop your PDF resume here'
            )}
          </h4>
          <p className="text-xs text-[#5F5A5C] max-w-md mx-auto mb-5 leading-relaxed">
            {uploading
              ? 'Evaluating structure, extracting keywords, and scoring against placement requisitions...'
              : 'Or select a file from your device. Clean single-column PDF formats yield higher ATS scores.'}
          </p>

          <Button
            variant="primary"
            size="md"
            loading={uploading}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            {uploading ? uploadStage || 'Analyzing PDF...' : 'Choose PDF Document'}
          </Button>
        </div>

        {/* Phase 1 Contract Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] text-xs text-[#5F5A5C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-4 h-4 text-[#8B0026]" />
            Backend REST Endpoint Contract: <code className="text-[#8B0026] font-semibold">POST /api/resumes/upload</code>
          </span>
          <span className="font-mono text-[11px] text-[#5F5A5C] bg-white px-2 py-0.5 rounded border border-[#E8DED4]">
            Content-Type: multipart/form-data
          </span>
        </div>
      </Card>

      {/* 3. RESUME INSPECTION MODAL */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#1E1B1C]/50 backdrop-blur-sm"
            onClick={() => setPreviewOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl bg-white border border-[#E8DED4] rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DED4] mb-5">
              <div>
                <h3 className="text-base font-bold text-[#1E1B1C]">
                  Document Preview: {resume?.fileName}
                </h3>
                <p className="text-xs text-[#5F5A5C]">Synthesized text stream extracted from PDF parser</p>
              </div>
              <button
                onClick={() => setPreviewOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5F5A5C] hover:text-[#1E1B1C] hover:bg-[#FAF5EF] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Document Sheet Simulation */}
            <div className="bg-[#FAF5EF]/60 text-[#1E1B1C] p-7 rounded-xl border border-[#E8DED4] font-sans text-xs leading-relaxed space-y-4 shadow-inner">
              <div className="border-b border-[#E8DED4] pb-3 text-center">
                <h1 className="text-lg font-black uppercase tracking-wider text-[#1E1B1C]">
                  Ashish Sharma
                </h1>
                <p className="text-[11px] text-[#5F5A5C] mt-1 font-mono">
                  Bengaluru, India • ashish.sharma@college.edu • +91 98765 43210 • linkedin.com/in/ashishsharma-dev
                </p>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#8B0026] border-b border-[#E8DED4] pb-1 mb-1.5">
                  Education
                </h2>
                <div className="flex justify-between font-semibold text-[#1E1B1C]">
                  <span>National Institute of Engineering & Technology</span>
                  <span className="font-mono text-[#5F5A5C]">2022 - 2026</span>
                </div>
                <p className="text-[#5F5A5C]">B.Tech in Computer Science & Engineering | CGPA: <strong className="text-[#1E1B1C]">8.1 / 10.0</strong></p>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#8B0026] border-b border-[#E8DED4] pb-1 mb-1.5">
                  Technical Core Competencies
                </h2>
                <p className="text-[#5F5A5C] leading-relaxed">
                  <strong className="text-[#1E1B1C]">Languages:</strong> Java (SE 17), Python, JavaScript (ES6+), SQL<br />
                  <strong className="text-[#1E1B1C]">Frameworks & Tools:</strong> Spring Boot, React 18, MySQL, Docker, Git, RESTful Microservices, Tailwind CSS
                </p>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#8B0026] border-b border-[#E8DED4] pb-1 mb-1.5">
                  Key Engineering Projects
                </h2>
                <div className="space-y-2">
                  <div>
                    <p className="font-bold text-[#1E1B1C]">Distributed Placement Portal (Java, Spring Boot, React, MySQL)</p>
                    <p className="text-[#5F5A5C]">
                      • Architected resilient REST services with sub-150ms latency for 1,500 active campus applicants.<br />
                      • Engineered automated eligibility ranking algorithms and role-based credential safeguards.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1B1C]">Smart Resume ATS Parser (Python, Scikit-Learn)</p>
                    <p className="text-[#5F5A5C]">
                      • Built semantic entity extraction pipeline delivering 94% precision on technical credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E8DED4] flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewOpen(false)}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteResume}
        title="Delete Master Resume"
        message="Are you sure you want to delete your active resume? You will need to upload a replacement document to preserve job match rankings."
        confirmText="Confirm Delete"
        danger={true}
        loading={deleting}
      />
    </div>
  );
};
