import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { BrandLogo } from '../common/BrandLogo';
import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { PUBLIC_NAV } from '../../constants/navigation';


export const Navbar = ({ onToggleSidebar, isDashboard = false }) => {
  const { user, role, logout, switchRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const roleDashboardLink =
    role === 'admin'
      ? '/admin/dashboard'
      : role === 'company'
      ? '/company/dashboard'
      : '/student/dashboard';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur-md">
      <div
        className={`${
          isDashboard ? 'w-full px-4 sm:px-6 lg:px-8 xl:px-10' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        } h-16 flex items-center justify-between gap-4`}
      >
        {/* Left: Brand Logo + Sidebar Toggle (if in dashboard) */}
        <div className="flex items-center gap-3">
          {isDashboard && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-muted hover:text-slate-text hover:bg-cream focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <BrandLogo size="md" />
        </div>

        {/* Center: Public Links (shown if not in dashboard) */}
        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-1.5">
            {PUBLIC_NAV.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-burgundy bg-burgundy/10 border border-burgundy/25 font-bold'
                      : 'text-slate-muted hover:text-slate-text hover:bg-cream-soft'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Actions: Role Switcher Demo, Notifications, Profile / Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Role Switcher Badge (Interactive for testing convenience) */}
          {import.meta.env.DEV && (
            <div className="hidden sm:flex items-center gap-1 bg-cream-soft px-2.5 py-1 rounded-xl border border-border text-xs">
              <span className="text-slate-muted font-mono text-[10px] mr-1 font-bold">DEV/TEST:</span>
              <button
                onClick={() => {
                  switchRole('student');
                  navigate('/student/dashboard');
                }}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-all ${
                  role === 'student'
                    ? 'bg-burgundy text-white shadow-wine'
                    : 'text-slate-muted hover:text-slate-text'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  switchRole('company');
                  navigate('/company/dashboard');
                }}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-all ${
                  role === 'company'
                    ? 'bg-burgundy text-white shadow-wine'
                    : 'text-slate-muted hover:text-slate-text'
                }`}
              >
                Company
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  navigate('/admin/dashboard');
                }}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-burgundy text-white shadow-wine'
                    : 'text-slate-muted hover:text-slate-text'
                }`}
              >
                Admin
              </button>
            </div>
          )}

          {/* Notifications Dropdown (when authenticated) */}
          {isAuthenticated && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-xl text-slate-muted hover:text-slate-text hover:bg-cream transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral ring-2 ring-white animate-pulse" />
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-border rounded-2xl shadow-card-hover z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-cream-soft">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-text">
                      Notifications ({unreadCount} new)
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] text-burgundy hover:underline font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-border/60">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-center text-slate-muted py-6">
                        No notifications yet.
                      </p>
                    ) : (
                      notifications.slice(0, 4).map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 text-left transition-colors hover:bg-cream-soft/60 ${
                            !notif.read ? 'bg-burgundy/5' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="text-xs font-bold text-slate-text leading-tight">
                              {notif.title}
                            </h5>
                            <span className="text-[10px] text-slate-dim whitespace-nowrap">
                              {notif.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-slate-muted mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2 border-t border-border bg-cream-soft/40 text-center">
                    <Link
                      to="/student/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-xs text-burgundy hover:text-burgundy-dark font-bold"
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Profile Dropdown or Login / Register */}
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-cream transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-lg bg-burgundy/10 border border-burgundy/25 flex items-center justify-center text-burgundy font-bold text-xs uppercase overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    user?.fullName?.[0] || 'U'
                  )}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-text leading-tight">
                    {user?.fullName || user?.companyName || 'Ashish Sharma'}
                  </span>
                  <span className="text-[10px] font-medium text-slate-dim capitalize">
                    {role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-muted hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-xl shadow-card-hover z-50 py-1.5 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-border bg-cream-soft">
                    <p className="text-xs font-bold text-slate-text truncate">
                      {user?.fullName || user?.companyName}
                    </p>
                    <p className="text-[11px] text-slate-dim truncate">{user?.email}</p>
                  </div>

                  <Link
                    to={roleDashboardLink}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-muted hover:text-slate-text hover:bg-cream-soft transition-colors"
                  >
                    <Layers className="w-4 h-4 text-burgundy" />
                    <span>My Dashboard</span>
                  </Link>

                  {role === 'student' && (
                    <Link
                      to="/student/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-muted hover:text-slate-text hover:bg-cream-soft transition-colors"
                    >
                      <User className="w-4 h-4 text-coral" />
                      <span>Edit Profile</span>
                    </Link>
                  )}

                  <div className="border-t border-border my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-danger hover:bg-danger/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Create Account
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger for public view */}
          {!isDashboard && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-muted hover:text-slate-text hover:bg-cream transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav menu for public portal */}
      {!isDashboard && mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pt-3 pb-6 flex flex-col gap-2 shadow-lg">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2 rounded-lg text-sm text-slate-muted hover:text-slate-text hover:bg-cream-soft font-medium"
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-border pt-3 mt-2 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" className="w-full">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
