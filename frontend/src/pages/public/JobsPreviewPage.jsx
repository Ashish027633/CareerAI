import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/api/jobService';
import { JobCard } from '../../components/jobs/JobCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';

export const JobsPreviewPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('all');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await jobService.getJobs({ search, jobType });
      if (res.success) setJobs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, jobType]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-text tracking-tight">
          Campus Recruitment Openings
        </h1>
        <p className="text-xs sm:text-sm text-slate-muted mt-1">
          Explore current hiring drives from partner technology employers.
        </p>
      </div>

      {/* Filter strip */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by job title or required skill..."
          className="flex-1"
        />
        <div className="w-full sm:w-48">
          <Select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            options={[
              { label: 'All Types', value: 'all' },
              { label: 'Full-time', value: 'full-time' },
              { label: 'Internship', value: 'internship' },
            ]}
            placeholder=""
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Searching available jobs..." />
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No jobs found matching criteria"
          description="Try broadening your search keyword or resetting the filter options."
          actionText="Reset filters"
          onAction={() => {
            setSearch('');
            setJobType('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
