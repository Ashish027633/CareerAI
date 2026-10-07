import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { Globe, Share2, Code2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-cream-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <BrandLogo size="md" className="mb-3" />
            <p className="text-xs text-slate-muted leading-relaxed mb-4">
              AI-driven placement acceleration, automated ATS resume scoring, and precision talent matching for universities and enterprises.
            </p>
            <div className="flex items-center gap-3 text-slate-muted">
              <a href="#" className="hover:text-burgundy transition-colors p-1" aria-label="Web">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-burgundy transition-colors p-1" aria-label="Code Repository">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-burgundy transition-colors p-1" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-text mb-3">
              Platform
            </h5>
            <ul className="space-y-2 text-xs text-slate-muted">
              <li>
                <Link to="/jobs" className="hover:text-burgundy transition-colors font-medium">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-burgundy transition-colors font-medium">
                  Resume Analysis
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-burgundy transition-colors font-medium">
                  About Platform
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-burgundy transition-colors font-medium">
                  Partner Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* User Portals */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-text mb-3">
              Portals
            </h5>
            <ul className="space-y-2 text-xs text-slate-muted">
              <li>
                <Link to="/student/dashboard" className="hover:text-burgundy transition-colors font-medium">
                  Student Workspace
                </Link>
              </li>
              <li>
                <Link to="/company/dashboard" className="hover:text-burgundy transition-colors font-medium">
                  Company Hiring Suite
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-burgundy transition-colors font-medium">
                  Campus Admin Console
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-burgundy transition-colors font-medium">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Architecture */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-text mb-3">
              Architecture
            </h5>
            <p className="text-xs text-slate-muted leading-relaxed mb-3">
              Engineered with clean separation of concerns for Java 21 Spring Boot and AI microservices integration.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-border text-[11px] text-slate-dim font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Phase 1 Prototype v1.0.0
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-dim">
          <p>© {new Date().getFullYear()} CareerAI Platform. All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium text-slate-muted">
            Engineered for modern collegiate placements
          </p>
        </div>
      </div>
    </footer>
  );
};
