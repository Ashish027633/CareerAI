import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../context/ToastContext';
import { Shield, Settings, Save } from 'lucide-react';

export const AdminSettingsPage = () => {
  const toast = useToast();
  const [academicYear, setAcademicYear] = useState('2025 - 2026');
  const [minPlacementCgpa, setMinPlacementCgpa] = useState('6.0');
  const [autoApproveCompanies, setAutoApproveCompanies] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Placement policy settings updated successfully.');
  };

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Placement Cell Policy Configuration"
        subtitle="Manage academic drive cycles, global student eligibility criteria, and administrative security guardrails."
      />

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8DED4]">
            <Settings className="w-4 h-4 text-[#8B0026]" />
            <h3 className="text-sm font-bold text-[#1E1B1C]">Academic Cycle Parameters</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <Input
              label="Active Academic Placement Session"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
            />
            <Input
              label="Universal Institutional Minimum CGPA"
              type="number"
              step="0.1"
              value={minPlacementCgpa}
              onChange={(e) => setMinPlacementCgpa(e.target.value)}
              helperText="Students below this cutoff cannot apply without T&P exemption."
            />
          </div>
        </Card>

        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8DED4]">
            <Shield className="w-4 h-4 text-[#8B0026]" />
            <h3 className="text-sm font-bold text-[#1E1B1C]">Company Verification Guardrails</h3>
          </div>

          <label className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] cursor-pointer hover:bg-[#FAF5EF]/80 transition-colors text-xs max-w-2xl">
            <div>
              <p className="font-bold text-[#1E1B1C]">Require Placement Director Approval for New Recruiters</p>
              <p className="text-[#5F5A5C] mt-0.5">When enabled, companies cannot publish jobs until an administrator reviews credentials.</p>
            </div>
            <input
              type="checkbox"
              checked={!autoApproveCompanies}
              onChange={(e) => setAutoApproveCompanies(!e.target.checked)}
              className="rounded border-[#E8DED4] text-[#8B0026] focus:ring-[#8B0026] w-4 h-4 cursor-pointer"
            />
          </label>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" icon={Save}>
            Save Placement Policies
          </Button>
        </div>
      </form>
    </div>
  );
};
