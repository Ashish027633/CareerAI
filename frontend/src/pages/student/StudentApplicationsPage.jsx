import React, { useState, useEffect } from 'react';
import { applicationService } from '../../services/api/applicationService';
import { PageHeader } from '../../components/layout/PageHeader';
import { Table } from '../../components/common/Table';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Select } from '../../components/common/Select';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { formatDate } from '../../utils/formatters';
import { Send, Eye, FileCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const StudentApplicationsPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const res = await applicationService.getMyApplications();
      if (res.success) setApplications(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApps = applications.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const columns = [
    {
      header: 'Job Title & Company',
      render: (app) => (
        <div className="flex items-center gap-3.5">
          <img
            src={app.companyLogo}
            alt={app.company}
            className="w-10 h-10 rounded-xl object-cover border border-[#E8DED4] flex-shrink-0 shadow-2xs"
          />
          <div>
            <p className="font-bold text-[#1E1B1C]">{app.jobTitle}</p>
            <p className="text-xs text-[#5F5A5C]">{app.company} • {app.location}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Applied Date',
      render: (app) => (
        <span className="text-[#5F5A5C] text-xs font-mono">{formatDate(app.appliedDate)}</span>
      ),
    },
    {
      header: 'ATS Match',
      render: (app) => (
        <span className="font-bold text-[#238B68] text-xs font-mono">{app.matchPercentage}%</span>
      ),
    },
    {
      header: 'Status',
      render: (app) => <StatusBadge status={app.status} />,
    },
    {
      header: 'Action',
      align: 'right',
      render: (app) => (
        <Button
          variant="outline"
          size="sm"
          icon={Eye}
          onClick={() => setSelectedApp(app)}
        >
          Timeline
        </Button>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner fullPage message="Fetching submitted applications..." />;
  }

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Application Tracker"
        subtitle="Real-time status updates across your campus placement applications, interview rounds, and offers."
        actions={
          <Link to="/student/jobs">
            <Button variant="primary" size="sm" icon={Send}>
              Explore More Roles
            </Button>
          </Link>
        }
      />

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E8DED4] p-4 rounded-2xl shadow-sm">
        <div className="w-full sm:w-64">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Applied', value: 'applied' },
              { label: 'Under Review', value: 'under review' },
              { label: 'Shortlisted', value: 'shortlisted' },
              { label: 'Interview', value: 'interview' },
              { label: 'Selected', value: 'selected' },
              { label: 'Rejected', value: 'rejected' },
            ]}
            placeholder=""
          />
        </div>

        <span className="text-xs text-[#5F5A5C]">
          Showing <strong className="text-[#1E1B1C] font-bold">{filteredApps.length}</strong> active applications
        </span>
      </div>

      {/* TABLE */}
      {filteredApps.length === 0 ? (
        <EmptyState
          title="No applications matching criteria"
          description="Explore available openings and apply with your verified master resume profile."
          actionText="Browse Openings"
          onAction={() => navigate('/student/jobs')}
        />
      ) : (
        <Table columns={columns} data={filteredApps} />
      )}

      {/* TIMELINE MODAL */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application Dossier: ${selectedApp.jobTitle}`}
          subtitle={`${selectedApp.company} • Match Score: ${selectedApp.matchPercentage}%`}
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
              <div>
                <p className="text-[11px] text-[#5F5A5C] uppercase tracking-wider font-semibold">Current State</p>
                <div className="mt-1">
                  <StatusBadge status={selectedApp.status} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-[#5F5A5C] uppercase tracking-wider font-semibold">Resume Score</p>
                <p className="text-sm font-bold text-[#8B0026] mt-0.5 font-mono">{selectedApp.resumeScore} / 100</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5F5A5C] mb-4">
                Application Progress Stepper
              </h4>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DED4]">
                {selectedApp.timeline?.map((step, idx) => {
                  const isDone = step.completed;
                  const isCurrent = step.current;

                  return (
                    <div key={idx} className="relative flex items-start gap-3.5 text-xs">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                          isDone
                            ? 'bg-[#238B68] text-white border-[#238B68] font-bold'
                            : isCurrent
                            ? 'bg-[#8B0026] text-white border-[#8B0026] font-bold animate-pulse'
                            : 'bg-[#FAF5EF] text-[#817B7E] border-[#E8DED4]'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`font-bold ${
                              isDone || isCurrent ? 'text-[#1E1B1C]' : 'text-[#817B7E]'
                            }`}
                          >
                            {step.step}
                          </p>
                          {step.date && (
                            <span className="text-[10px] text-[#5F5A5C] font-mono">{step.date}</span>
                          )}
                        </div>
                        {isCurrent && (
                          <p className="text-[11px] text-[#8B0026] font-medium mt-0.5">Active stage in progress</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedApp.notes && (
              <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] text-xs text-[#5F5A5C]">
                <p className="font-bold text-[#1E1B1C] mb-1">Recruitment Committee Remarks:</p>
                <p>{selectedApp.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
