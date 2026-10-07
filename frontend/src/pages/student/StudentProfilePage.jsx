import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  User,
  GraduationCap,
  Briefcase,
  Code2,
  FolderGit2,
  Award,
  Globe,
  Plus,
  Save,
  AlertCircle,
} from 'lucide-react';

export const StudentProfilePage = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ ...user });
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Student profile updated successfully!');
    }, 400);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!profile.skills?.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...(profile.skills || []), newSkill.trim()],
      });
      setNewSkill('');
      toast.info(`Added skill: ${newSkill.trim()}`);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <div className="space-y-6 w-full animate-fade-up">
      <PageHeader
        title="Student Profile"
        subtitle="Manage your academic credentials, verified skills, and project portfolio for prospective recruiters."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={Save}
            loading={saving}
            onClick={handleSave}
            className="font-bold shadow-wine"
          >
            Save Profile
          </Button>
        }
      />

      {/* Profile Completion Card */}
      <Card className="bg-cream-soft border border-border shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-text flex items-center gap-2">
              Profile Readiness Score
            </h3>
            <p className="text-xs text-slate-muted mt-0.5">
              Recruiters prioritize profiles with comprehensive project repositories and verified skills.
            </p>
          </div>
          <span className="text-2xl font-black text-burgundy font-mono">
            {profile.profileCompletion || 78}%
          </span>
        </div>

        <ProgressBar
          value={profile.profileCompletion || 78}
          color="primary"
          size="md"
          className="mb-4"
        />

        {profile.missingFields && profile.missingFields.length > 0 && (
          <div className="pt-3 border-t border-border flex flex-wrap items-center gap-2 text-xs">
            <span className="text-yellow flex items-center gap-1 font-bold text-slate-text">
              <AlertCircle className="w-3.5 h-3.5 text-yellow" /> Recommended additions:
            </span>
            {profile.missingFields.map((field, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-yellow/15 text-[#9A7200] text-[11px] font-semibold border border-yellow/30"
              >
                + {field}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* 1. PERSONAL INFORMATION */}
      <Card className="bg-white border border-border shadow-card">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border">
          <div className="p-2 rounded-xl bg-burgundy/10 text-burgundy">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-text">Personal Details</h3>
            <p className="text-[11px] text-slate-muted">Contact information and placement bio</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={profile.fullName || ''}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
          />
          <Input
            label="Email Address"
            value={profile.email || ''}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Input
            label="Phone Number"
            value={profile.phone || ''}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
          <Input
            label="Location"
            value={profile.location || 'Bengaluru, India'}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          />
          <div className="sm:col-span-2">
            <Input
              label="Professional Headline"
              value={profile.headline || ''}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-text mb-1.5">
              Professional Summary / Bio
            </label>
            <textarea
              rows={3}
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full bg-white text-slate-text placeholder:text-slate-dim text-sm rounded-xl border border-border p-3 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 transition-all shadow-subtle"
            />
          </div>
        </div>
      </Card>

      {/* 2. EDUCATION */}
      <Card className="bg-white border border-border shadow-card">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border">
          <div className="p-2 rounded-xl bg-coral/10 text-coral">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-text">Education</h3>
            <p className="text-[11px] text-slate-muted">Academic pedigree and CGPA records</p>
          </div>
        </div>

        <div className="space-y-3">
          {profile.education?.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl bg-cream-soft border border-border flex items-start justify-between gap-4"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-text">{edu.institution}</h4>
                <p className="text-xs text-burgundy font-semibold mt-0.5">{edu.degree}</p>
                <p className="text-[11px] text-slate-muted mt-1 font-mono">
                  {edu.period} • Score: <span className="text-slate-text font-bold">{edu.score}</span>
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-muted border border-border">
                {edu.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. SKILLS */}
      <Card className="bg-white border border-border shadow-card">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border">
          <div className="p-2 rounded-xl bg-success/10 text-success">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-text">Technical Skills</h3>
            <p className="text-[11px] text-slate-muted">Extracted from resume or added manually</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {profile.skills?.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cream-soft border border-border text-xs font-semibold text-slate-text"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-slate-dim hover:text-danger p-0.5"
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <form onSubmit={handleAddSkill} className="flex gap-2 max-w-sm">
          <Input
            placeholder="Add new skill (e.g. Docker, Redis)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <Button type="submit" variant="outline" size="md" icon={Plus}>
            Add
          </Button>
        </form>
      </Card>

      {/* 4. PROJECTS */}
      <Card className="bg-white border border-border shadow-card">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border">
          <div className="p-2 rounded-xl bg-burgundy/10 text-burgundy">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-text">Projects</h3>
            <p className="text-[11px] text-slate-muted">Portfolio engineering projects</p>
          </div>
        </div>

        <div className="space-y-4">
          {profile.projects?.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl bg-cream-soft border border-border"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-bold text-slate-text">{proj.title}</h4>
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-burgundy hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Source Repository</span>
                  </a>
                )}
              </div>
              <p className="text-xs text-slate-muted mt-1 leading-relaxed">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {proj.technologies?.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2.5 py-0.5 rounded-md bg-white text-slate-text border border-border font-medium font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. EXPERIENCE & CERTIFICATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border border-border shadow-card">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
            <Briefcase className="w-4 h-4 text-burgundy" />
            <h3 className="text-sm font-bold text-slate-text">Internship Experience</h3>
          </div>
          <div className="space-y-3">
            {profile.experience?.map((exp) => (
              <div key={exp.id} className="p-3.5 rounded-xl bg-cream-soft border border-border">
                <h4 className="text-xs font-bold text-slate-text">{exp.role}</h4>
                <p className="text-[11px] text-burgundy font-semibold">{exp.company}</p>
                <p className="text-[10px] text-slate-dim mt-0.5 font-mono">{exp.period}</p>
                <p className="text-xs text-slate-muted mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white border border-border shadow-card">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
            <Award className="w-4 h-4 text-coral" />
            <h3 className="text-sm font-bold text-slate-text">Certifications</h3>
          </div>
          <div className="space-y-3">
            {profile.certifications?.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl bg-cream-soft border border-border">
                <h4 className="text-xs font-bold text-slate-text">{c.name}</h4>
                <p className="text-[11px] text-coral font-semibold">{c.issuer}</p>
                <p className="text-[10px] text-slate-dim mt-0.5 font-mono">Issued: {c.issueDate}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 6. SOCIAL & PORTFOLIO LINKS */}
      <Card className="bg-white border border-border shadow-card">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
          <Globe className="w-4 h-4 text-burgundy" />
          <h3 className="text-sm font-bold text-slate-text">Social & Portfolio Links</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="GitHub URL"
            value={profile.socialLinks?.github || ''}
            onChange={(e) =>
              setProfile({
                ...profile,
                socialLinks: { ...profile.socialLinks, github: e.target.value },
              })
            }
          />
          <Input
            label="LinkedIn URL"
            value={profile.socialLinks?.linkedin || ''}
            onChange={(e) =>
              setProfile({
                ...profile,
                socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
              })
            }
          />
          <Input
            label="Portfolio Website"
            value={profile.socialLinks?.portfolio || ''}
            onChange={(e) =>
              setProfile({
                ...profile,
                socialLinks: { ...profile.socialLinks, portfolio: e.target.value },
              })
            }
          />
        </div>
      </Card>
    </div>
  );
};
