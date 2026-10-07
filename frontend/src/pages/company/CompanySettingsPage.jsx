import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Bell, Save } from 'lucide-react';

export const CompanySettingsPage = () => {
  const toast = useToast();
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Company recruitment preferences saved successfully.');
  };

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Recruiting Preferences & Security"
        subtitle="Manage recruiter notification frequency, candidate score filters, and hiring credentials."
      />

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8DED4]">
            <Bell className="w-4 h-4 text-[#8B0026]" />
            <h3 className="text-sm font-bold text-[#1E1B1C]">Hiring Notifications</h3>
          </div>

          <label className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] cursor-pointer hover:bg-[#FAF5EF]/80 transition-colors text-xs max-w-2xl">
            <div>
              <p className="font-bold text-[#1E1B1C]">High-Match Candidate Application Alert</p>
              <p className="text-[#5F5A5C] mt-0.5">Receive immediate email dispatch when an applicant scores &gt;85% match</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded border-[#E8DED4] text-[#8B0026] focus:ring-[#8B0026] w-4 h-4 cursor-pointer"
            />
          </label>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
