import React, { useState, useEffect } from 'react';
import { applicationService } from '../../services/api/applicationService';
import { PageHeader } from '../../components/layout/PageHeader';
import { Table } from '../../components/common/Table';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';

export const AdminApplicationsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplicants = async () => {
    setLoading(true);
    try {
      const res = await applicationService.getApplicantsByJobId(null);
      if (res.success) setApplicants(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplicants();
  }, []);

  const columns = [
    {
      header: 'Applicant Name',
      render: (a) => (
        <div>
          <p className="font-bold text-[#1E1B1C]">{a.candidateName}</p>
          <p className="text-xs text-[#5F5A5C]">{a.college}</p>
        </div>
      ),
    },
    {
      header: 'Applied Position',
      render: (a) => <span className="text-xs text-[#1E1B1C] font-semibold">{a.jobTitle || 'Java Backend Developer'}</span>,
    },
    {
      header: 'ATS Score',
      render: (a) => <span className="font-bold text-[#8B0026] text-xs font-mono">{a.resumeScore}/100</span>,
    },
    {
      header: 'Match %',
      render: (a) => <span className="font-bold text-[#238B68] text-xs font-mono">{a.matchPercentage}%</span>,
    },
    {
      header: 'CGPA',
      accessor: 'cgpa',
    },
    {
      header: 'Status',
      render: (a) => <StatusBadge status={a.status} />,
    },
    {
      header: 'Submission Date',
      render: (a) => <span className="text-xs text-[#5F5A5C] font-mono">{formatDate(a.appliedDate)}</span>,
    },
  ];

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Institutional Application Ledger"
        subtitle="Live audit trail of all student submissions, employer shortlists, and placement offers across campus."
      />

      {loading ? (
        <LoadingSpinner message="Aggregating platform application ledger..." />
      ) : (
        <Table columns={columns} data={applicants} />
      )}
    </div>
  );
};
