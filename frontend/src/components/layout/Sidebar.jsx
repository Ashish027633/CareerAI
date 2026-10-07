import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';
import {
  LayoutDashboard,
  User,
  FileText,
  Cpu,
  Briefcase,
  Send,
  Calendar,
  Bell,
  Settings,
  PlusCircle,
  Building2,
  GraduationCap,
  FileSpreadsheet,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react';
import { STUDENT_NAV, COMPANY_NAV, ADMIN_NAV } from '../../constants/navigation';

const ICON_MAP = {
  LayoutDashboard,
  User,
  FileText,
  Cpu,
  Briefcase,
  Send,
  Calendar,
  Bell,
  Settings,
  PlusCircle,
  Building2,
  GraduationCap,
  FileSpreadsheet,
  Sparkles,
};

export const Sidebar = ({ isOpen, onClose }) => {
  const { role, user, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const navItems =
    role === 'admin'
      ? ADMIN_NAV
      : role === 'company'
      ? COMPANY_NAV
      : STUDENT_NAV;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const content = (
    <aside className="w-64 xl:w-72 bg-cream-soft border-r border-border flex flex-col h-full select-none">
      {/* Top Sidebar Header (Mobile close button) */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-border lg:hidden bg-white">
        <BrandLogo size="sm" />
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-muted hover:text-slate-text hover:bg-cream transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-5 py-3.5 border-b border-border bg-white/60">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-success ring-4 ring-success/15" />
          <div>
            <p className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-muted">
              AUTHENTICATED CONSOLE
            </p>
            <p className="text-xs font-bold text-slate-text capitalize">
              {role} Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = ICON_MAP[item.icon] || LayoutDashboard;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-burgundy text-white font-semibold shadow-wine border border-burgundy'
                    : 'text-slate-muted hover:text-slate-text hover:bg-cream/60'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* User Quick Info & Logout */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-cream border border-border flex items-center justify-center text-xs font-bold text-burgundy overflow-hidden flex-shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
            ) : (
              user?.fullName?.[0] || 'U'
            )}
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-xs font-bold text-slate-text truncate">
              {user?.fullName || user?.companyName || 'Ashish Sharma'}
            </p>
            <p className="text-[11px] text-slate-dim truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-danger hover:bg-danger/10 border border-danger/25 transition-all duration-150"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Static Sidebar */}
      <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-30">
        {content}
      </div>

      {/* Mobile Drawer with Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#1E1B1C]/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative z-10 w-64 h-full animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
