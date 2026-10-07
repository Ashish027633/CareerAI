import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompaniesPreviewPage = () => {
  const companies = [
    {
      name: 'TechCorp Solutions',
      industry: 'Enterprise Software & Cloud Systems',
      location: 'Bengaluru / Hyderabad',
      openings: 8,
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80',
      description: 'Global provider of cloud automation software and distributed backend architectures.',
    },
    {
      name: 'Razorflow FinTech',
      industry: 'FinTech & Payments Infrastructure',
      location: 'Hyderabad, India',
      openings: 5,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      description: 'Developing high-throughput payment checkout infrastructure for millions of transactions.',
    },
    {
      name: 'StripeWave Cloud',
      industry: 'Cloud Monitoring & Telemetry',
      location: 'Pune / Remote',
      openings: 4,
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
      description: 'Real-time observability platform powering resilient Kubernetes infrastructure.',
    },
    {
      name: 'NeuroScale Intelligence',
      industry: 'Artificial Intelligence & NLP',
      location: 'Bengaluru, India',
      openings: 3,
      logo: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=100&auto=format&fit=crop&q=80',
      description: 'Pioneering foundational language processing models for automated document evaluation.',
    },
    {
      name: 'NexusScale Systems',
      industry: 'DevOps & Site Reliability',
      location: 'Gurugram / Noida',
      openings: 2,
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
      description: 'Mission-critical cloud orchestration partner for tier-1 banking institutions.',
    },
    {
      name: 'Cognitive Global Services',
      industry: 'Digital Consulting & IT Solutions',
      location: 'Chennai / Coimbatore',
      openings: 6,
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
      description: 'Enterprise IT engineering and digital transformation training partner for fresh graduates.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-text tracking-tight">
          Participating Hiring Partners
        </h1>
        <p className="text-xs sm:text-sm text-slate-muted mt-1">
          Explore campus recruiters actively hiring engineering and technology graduates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((c, i) => (
          <Card key={i} className="flex flex-col justify-between bg-white border border-border shadow-card hover:border-coral/40 hover:shadow-card-hover transition-all duration-200">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-12 h-12 rounded-xl object-cover border border-border"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-text">{c.name}</h3>
                  <p className="text-xs text-burgundy font-semibold">{c.industry}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-muted mb-3">
                <MapPin className="w-3.5 h-3.5 text-slate-dim" />
                <span>{c.location}</span>
              </div>

              <p className="text-xs text-slate-muted leading-relaxed mb-4">
                {c.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-text flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-dim" />
                {c.openings} Active Roles
              </span>
              <Link to="/jobs">
                <Button variant="ghost" size="sm" className="font-semibold text-burgundy">
                  View Roles
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
