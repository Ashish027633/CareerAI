import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    warning: (msg) => addToast(msg, 'warning'),
    info: (msg) => addToast(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const typeConfig = {
            success: {
              border: 'border-success/40',
              bg: 'bg-dark-card/95',
              text: 'text-success',
              icon: CheckCircle2,
            },
            error: {
              border: 'border-danger/40',
              bg: 'bg-dark-card/95',
              text: 'text-danger',
              icon: AlertCircle,
            },
            warning: {
              border: 'border-warning/40',
              bg: 'bg-dark-card/95',
              text: 'text-warning',
              icon: AlertTriangle,
            },
            info: {
              border: 'border-primary/40',
              bg: 'bg-dark-card/95',
              text: 'text-primary',
              icon: Info,
            },
          }[t.type] || {
            border: 'border-border-dark',
            bg: 'bg-dark-card',
            text: 'text-slate-text',
            icon: Info,
          };

          const IconComponent = typeConfig.icon;

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-card border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${typeConfig.border} ${typeConfig.bg}`}
              role="alert"
            >
              <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${typeConfig.text}`} />
              <p className="text-sm font-medium text-slate-text flex-1 leading-snug">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-muted hover:text-slate-text transition-colors p-0.5"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
};
