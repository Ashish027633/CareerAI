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

export const AdminStudentsPage = () => {
  const toast = useToast();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toggleStudent, setToggleStudent] = useState(null);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await adminService.getStudents(search);
      if (res.success) setStudents(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [search]);

  const handleStatusChange = async () => {
    if (!toggleStudent) return;
    const res = await adminService.toggleStudentStatus(toggleStudent.id);
    if (res.success) {
      toast.success(`Student status updated to ${res.data.status}`);
      setStudents((prev) =>
        prev.map((s) => (s.id === toggleStudent.id ? res.data : s))
      );
      setToggleStudent(null);
    }
  };

  const columns = [
    {
      header: 'Student Name & Email',
      render: (s) => (
        <div>
          <p className="font-bold text-[#1E1B1C]">{s.name}</p>
          <p className="text-xs text-[#5F5A5C] font-mono">{s.email}</p>
        </div>
      ),
    },
    {
      header: 'College & Branch',
      render: (s) => (
        <span className="text-xs text-[#5F5A5C]">
          {s.branch} • Batch {s.year}
        </span>
      ),
    },
    {
      header: 'CGPA',
      render: (s) => <span className="font-bold text-[#1E1B1C] text-xs font-mono">{s.cgpa}</span>,
    },
    {
      header: 'Resume Score',
      render: (s) => <span className="font-bold text-[#8B0026] text-xs font-mono">{s.resumeScore}/100</span>,
    },
    {
      header: 'Applications',
      render: (s) => <span className="text-xs text-[#5F5A5C] font-mono">{s.applicationsCount} sent</span>,
    },
    {
      header: 'Status',
      render: (s) => <StatusBadge status={s.status} />,
    },
    {
      header: 'Moderation',
      align: 'right',
      render: (s) => (
        <Button
          variant={s.status === 'Active' ? 'outline' : 'primary'}
          size="sm"
          onClick={() => setToggleStudent(s)}
        >
          {s.status === 'Active' ? 'Flag Account' : 'Restore Active'}
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Student Directory & Academic Eligibility"
        subtitle="Review student registration records, verify minimum CGPA eligibility, and manage account statuses."
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E8DED4] p-4 rounded-2xl shadow-sm">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by student name, email, or branch..."
          className="w-full sm:w-96"
        />
        <span className="text-xs text-[#5F5A5C]">
          Showing <strong className="text-[#1E1B1C] font-bold">{students.length}</strong> registered students
        </span>
      </div>

      {loading ? (
        <LoadingSpinner message="Querying student records..." />
      ) : (
        <Table columns={columns} data={students} />
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!toggleStudent}
        onClose={() => setToggleStudent(null)}
        onConfirm={handleStatusChange}
        title="Change Student Status"
        message={`Are you sure you want to change the status of ${toggleStudent?.name}?`}
        confirmText="Confirm Change"
        danger={toggleStudent?.status === 'Active'}
      />
    </div>
  );
};
