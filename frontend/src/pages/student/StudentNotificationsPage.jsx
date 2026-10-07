import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notificationService } from '../../services/api/notificationService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Bell,
  CheckCheck,
  Briefcase,
  Calendar,
  Sparkles,
  Award,
  ArrowRight,
} from 'lucide-react';

export const StudentNotificationsPage = () => {
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationService.getNotifications();
      if (res.success) setNotifications(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    const res = await notificationService.markAllAsRead();
    if (res.success) {
      setNotifications(res.data);
      toast.success('All notifications marked as read.');
    }
  };

  const handleMarkRead = async (id) => {
    const res = await notificationService.markAsRead(id);
    if (res.success) setNotifications(res.data);
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'SHORTLIST':
        return <Award className="w-4 h-4 text-[#8B0026]" />;
      case 'INTERVIEW':
        return <Calendar className="w-4 h-4 text-[#F3C43E]" />;
      case 'RESUME':
        return <Sparkles className="w-4 h-4 text-[#D64F63]" />;
      case 'JOB':
        return <Briefcase className="w-4 h-4 text-[#8B0026]" />;
      default:
        return <Bell className="w-4 h-4 text-[#5F5A5C]" />;
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Loading notification stream..." />;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Notifications Center"
        subtitle="Real-time alerts for recruiter shortlists, interview schedule invitations, and ATS scoring updates."
        actions={
          unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              icon={CheckCheck}
              onClick={handleMarkAllRead}
            >
              Mark All as Read
            </Button>
          )
        }
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up! New application updates and interview alerts will appear here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`transition-all duration-150 ${
                !notif.read
                  ? 'border-[#8B0026]/30 bg-[#FAF5EF] shadow-sm'
                  : 'bg-white border-[#E8DED4] opacity-90'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E8DED4] flex-shrink-0 mt-0.5 shadow-2xs">
                    {getIconForType(notif.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#1E1B1C]">{notif.title}</h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#8B0026]" />
                      )}
                    </div>
                    <p className="text-xs text-[#5F5A5C] mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-[#817B7E] font-mono mt-1.5">{notif.timestamp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!notif.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkRead(notif.id)}
                    >
                      Dismiss
                    </Button>
                  )}
                  {notif.link && (
                    <Link to={notif.link}>
                      <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                        View
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
