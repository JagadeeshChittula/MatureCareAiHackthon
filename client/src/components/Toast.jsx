import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  const bgStyles = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
    error: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
    info: 'bg-sky-950/90 border-sky-500/50 text-sky-200',
    warning: 'bg-amber-950/90 border-amber-500/50 text-amber-200',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
  };

  return (
    <div className={`fixed top-5 right-5 z-50 flex items-start gap-3 p-4 rounded-xl border glass-panel shadow-2xl transition-all animate-bounce-short max-w-md ${bgStyles[type]}`}>
      {icons[type]}
      <div className="text-sm font-medium pr-2 leading-relaxed">{message}</div>
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-white transition">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
