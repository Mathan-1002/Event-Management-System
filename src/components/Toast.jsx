import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div 
          key={t.id} 
          className={`toast ${t.type === 'error' ? 'toast-error' : 'toast-success'}`}
        >
          {t.type === 'error' ? (
            <AlertCircle size={18} style={{ color: 'var(--accent-rose)' }} />
          ) : (
            <CheckCircle2 size={18} style={{ color: 'var(--accent-green)' }} />
          )}
          <span>{t.message}</span>
          <button 
            onClick={() => onDismiss(t.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginLeft: 'auto' }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
