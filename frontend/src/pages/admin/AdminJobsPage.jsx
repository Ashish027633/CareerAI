import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/api/jobService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Table } from '../../components/common/Table';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Trash2 } from 'lucide-react';

export const AdminJobsPage = () => {
  const toast = useToast();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await jobService.getJobs({ search });
      if (res.success) setJobs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [search]);

  const handleToggle = async (id) => {
    const res = await jobService.toggleJobStatus(id);
    if (res.success) {
      toast.success(res.message);
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, active: !j.active } : j))
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await jobService.deleteJob(deleteId);
    if (res.success) {
      toast.success('Job listing purged by administrator.');
      setJobs((prev) => prev.filter((j) => j.id !== deleteId));
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: 'Job Title & Employer',
      render: (j) => (
        <div>
          <p className="font-bold text-[#1E1B1C]">{j.title}</p>
          <p className="text-xs text-[#5F5A5C]">{j.company} • {j.location}</p>
        </div>
      ),
    },
    {
      header: 'CTC Range',
      render: (j) => <span className="font-semibold text-[#1E1B1C] text-xs font-mono">{j.salary}</span>,
    },
    {
      header: 'Job Type',
      accessor: 'jobType',
    },
    {
      header: 'Applicants',
      render: (j) => <span className="text-[#8B0026] font-bold text-xs font-mono">{j.applicantCount || 42} applied</span>,
    },
    {
      header: 'Status',
      render: (j) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
            j.active
              ? 'bg-[#238B68]/15 text-[#238B68] border-[#238B68]/30'
              : 'bg-[#FAF5EF] text-[#817B7E] border-[#E8DED4]'
          }`}
        >
          {j.active ? 'Active' : 'Paused'}
        </span>
      ),
    },
    {
      header: 'Moderation Actions',
      align: 'right',
      render: (j) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToggle(j.id)}
          >
            {j.active ? 'Pause' : 'Activate'}
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => setDeleteId(j.id)}
            aria-label="Delete job"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Central Placement Requisitions"
        subtitle="Review, audit, pause, or remove job listings posted by campus recruiting partners."
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E8DED4] p-4 rounded-2xl shadow-sm">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by job title or employer..."
          className="w-full sm:w-96"
        />
        <span className="text-xs text-[#5F5A5C]">
          Showing <strong className="text-[#1E1B1C] font-bold">{jobs.length}</strong> campus listings
        </span>
      </div>

      {loading ? (
        <LoadingSpinner message="Querying active job postings..." />
      ) : (
        <Table columns={columns} data={jobs} />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Job Requisition"
        message="Are you sure you want to purge this job listing? It will no longer be visible to students."
        confirmText="Purge Listing"
        danger={true}
      />
    </div>
  );
};
