import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../context/ToastContext';
import { Bell, Lock, Save, ShieldCheck } from 'lucide-react';

export const StudentSettingsPage = () => {
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Account security preferences saved successfully.');
  };

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Settings & Placement Preferences"
        subtitle="Manage your credentials, automated notification delivery channels, and platform security."
      />

      <form onSubmit={handleSave} className="space-y-6">
        {/* Security */}
        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8DED4]">
            <Lock className="w-4 h-4 text-[#8B0026]" />
            <h3 className="text-sm font-bold text-[#1E1B1C]">Change Password</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 8 characters"
            />
          </div>
        </Card>

        {/* Alerts */}
        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8DED4]">
            <Bell className="w-4 h-4 text-[#8B0026]" />
            <h3 className="text-sm font-bold text-[#1E1B1C]">Notification Dispatch Channels</h3>
          </div>

          <div className="space-y-3 text-xs max-w-2xl">
            <label className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] cursor-pointer hover:bg-[#FAF5EF]/80 transition-colors">
              <div>
                <p className="font-bold text-[#1E1B1C]">Email Placement Digest</p>
                <p className="text-[#5F5A5C] mt-0.5">Receive immediate notifications whenever an application status changes</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded border-[#E8DED4] text-[#8B0026] focus:ring-[#8B0026] w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] cursor-pointer hover:bg-[#FAF5EF]/80 transition-colors">
              <div>
                <p className="font-bold text-[#1E1B1C]">SMS Urgent Interview Alerts</p>
                <p className="text-[#5F5A5C] mt-0.5">Receive SMS notifications 1 hour prior to scheduled campus interview rounds</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="rounded border-[#E8DED4] text-[#8B0026] focus:ring-[#8B0026] w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
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
