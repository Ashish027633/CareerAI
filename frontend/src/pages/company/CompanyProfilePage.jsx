import React, { useState, useEffect } from 'react';
import { companyService } from '../../services/api/companyService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Globe, MapPin, Save, ShieldCheck } from 'lucide-react';

export const CompanyProfilePage = () => {
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await companyService.getProfile();
      if (res.success) setProfile(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await companyService.updateProfile(profile);
      if (res.success) {
        toast.success('Company profile updated successfully.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Loading employer profile..." />;
  }

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Employer Brand Profile"
        subtitle="Maintain your company information, campus drive overview, and organizational culture details."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={Save}
            loading={saving}
            onClick={handleSave}
          >
            Save Profile
          </Button>
        }
      />

      <Card className="border-[#E8DED4] shadow-sm">
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#E8DED4]">
          <img
            src={profile.logo}
            alt={profile.companyName}
            className="w-16 h-16 rounded-2xl object-cover border border-[#E8DED4] shadow-2xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#1E1B1C]">{profile.companyName}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#238B68]/15 text-[#238B68] border border-[#238B68]/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Campus Verified
              </span>
            </div>
            <p className="text-xs text-[#5F5A5C] mt-0.5">{profile.industry}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            value={profile.companyName}
            onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
          />
          <Input
            label="Industry Domain"
            value={profile.industry}
            onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
          />
          <Input
            label="Website URL"
            icon={Globe}
            value={profile.website}
            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
          />
          <Input
            label="Headquarters / Office"
            icon={MapPin}
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          />
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F5A5C] mb-1.5">
              Company Overview & Culture
            </label>
            <textarea
              rows={4}
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              className="w-full bg-[#FAF5EF] text-[#1E1B1C] text-xs rounded-xl border border-[#E8DED4] p-3.5 focus:outline-none focus:border-[#8B0026] focus:ring-2 focus:ring-[#8B0026]/10"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};
