import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jobService } from '../../services/api/jobService';
import { PageHeader } from '../../components/layout/PageHeader';
import { JobCard } from '../../components/jobs/JobCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Target, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const StudentJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isRecommended = searchParams.get('filter') === 'recommended';

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('all');
  const [jobType, setJobType] = useState('all');
  const [skill, setSkill] = useState('all');
  const [sortBy, setSortBy] = useState('match');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await jobService.getJobs({
        search,
        location,
        jobType,
        skill,
        sortBy,
        minMatch: isRecommended ? 80 : 0,
      });
      if (res.success) setJobs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, location, jobType, skill, sortBy, isRecommended]);

  const handleResetFilters = () => {
    setSearchParams({});
    setSearch('');
    setLocation('all');
    setJobType('all');
    setSkill('all');
    setSortBy('match');
  };

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title={isRecommended ? "Recommended Positions for You" : "Discover Matched Campus Openings"}
        subtitle={isRecommended ? "Handpicked opportunities exhibiting 80%+ semantic compatibility with your verified master resume." : "Live opportunities dynamically ranked by semantic compatibility with your resume profile and verified skills."}
        badge={isRecommended ? (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[#8B0026]/10 text-[#8B0026] border border-[#8B0026]/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Target className="w-3.5 h-3.5" /> Curated Match (≥80%)
          </span>
        ) : null}
      />

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white border border-[#E8DED4] rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search roles by title, keyword, or hiring partner..."
            className="flex-1"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1">
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              options={[
                { label: 'All Locations', value: 'all' },
                { label: 'Bengaluru', value: 'Bengaluru' },
                { label: 'Hyderabad', value: 'Hyderabad' },
                { label: 'Pune', value: 'Pune' },
                { label: 'Remote', value: 'Remote' },
              ]}
              placeholder=""
            />

            <Select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              options={[
                { label: 'All Types', value: 'all' },
                { label: 'Full-time', value: 'Full-time' },
                { label: 'Internship', value: 'Internship' },
              ]}
              placeholder=""
            />

            <Select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              options={[
                { label: 'All Skills', value: 'all' },
                { label: 'Java', value: 'Java' },
                { label: 'Spring Boot', value: 'Spring Boot' },
                { label: 'React', value: 'React' },
                { label: 'Python', value: 'Python' },
                { label: 'Docker', value: 'Docker' },
              ]}
              placeholder=""
            />

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { label: 'Sort: Match %', value: 'match' },
                { label: 'Sort: Recent', value: 'recent' },
                { label: 'Sort: Salary', value: 'salary' },
              ]}
              placeholder=""
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#5F5A5C] pt-3 border-t border-[#E8DED4]">
          <span>
            Found <strong className="text-[#1E1B1C] font-bold">{jobs.length}</strong> matching positions
          </span>
          {(search || location !== 'all' || jobType !== 'all' || skill !== 'all' || isRecommended) && (
            <button
              onClick={handleResetFilters}
              className="text-[#8B0026] hover:underline font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* JOBS GRID */}
      {loading ? (
        <LoadingSpinner message="Evaluating role criteria & matching scores..." />
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No jobs matching your criteria"
          description="Try broadening your search term or clearing the filter controls above."
          actionText="Reset filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
