import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api/adminService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Table } from '../../components/common/Table';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AdminCompaniesPage = () => {
  const toast = useToast();
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const res = await adminService.getCompanies(search);
      if (res.success) setCompanies(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, [search]);

  const handleToggleStatus = async () => {
    if (!selectedCompany) return;
    const res = await adminService.toggleCompanyStatus(selectedCompany.id);
    if (res.success) {
      toast.success(`Company status updated to ${res.data.status}`);
      setCompanies((prev) =>
        prev.map((c) => (c.id === selectedCompany.id ? res.data : c))
      );
      setSelectedCompany(null);
    }
  };

  const columns = [
    {
      header: 'Company Name & Industry',
      render: (c) => (
        <div>
          <p className="font-bold text-[#1E1B1C]">{c.name}</p>
          <p className="text-xs text-[#5F5A5C]">{c.industry}</p>
        </div>
      ),
    },
    {
      header: 'Work Email',
      accessor: 'email',
    },
    {
      header: 'Active Jobs',
      render: (c) => <span className="font-bold text-[#8B0026] text-xs font-mono">{c.activeJobs} jobs</span>,
    },
    {
      header: 'Campus Hires',
      render: (c) => <span className="font-bold text-[#238B68] text-xs font-mono">{c.totalHires} students</span>,
    },
    {
      header: 'Status',
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      header: 'Moderation',
      align: 'right',
      render: (c) => (
        <Button
          variant={c.status === 'Verified' ? 'outline' : 'primary'}
          size="sm"
          onClick={() => setSelectedCompany(c)}
        >
          {c.status === 'Verified' ? 'Suspend' : 'Verify'}
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Employer Partnerships & Verification"
        subtitle="Approve verified corporate recruiting accounts, monitor active campus drives, and enforce hiring standards."
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E8DED4] p-4 rounded-2xl shadow-sm">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by company name, domain, or email..."
          className="w-full sm:w-96"
        />
        <span className="text-xs text-[#5F5A5C]">
          Showing <strong className="text-[#1E1B1C] font-bold">{companies.length}</strong> partners
        </span>
      </div>

      {loading ? (
        <LoadingSpinner message="Querying corporate partner accounts..." />
      ) : (
        <Table columns={columns} data={companies} />
      )}

      <ConfirmDialog
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onConfirm={handleToggleStatus}
        title="Modify Employer Account Status"
        message={`Are you sure you want to change verification status for ${selectedCompany?.name}?`}
        confirmText="Confirm Change"
        danger={selectedCompany?.status === 'Verified'}
      />
    </div>
  );
};
