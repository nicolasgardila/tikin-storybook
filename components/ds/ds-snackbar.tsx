/**
 * FIGMA SPECS — Snackbar
 * =======================
 * Double-layer shell notification at bottom of screen.
 *
 * OUTER SHELL: border-radius 16px, padding 4px, bg #1E1E1E
 *   Shadow: 0px 4px 20px rgba(11,15,16,0.14), 0px 0px 2px rgba(11,15,16,0.08)
 *
 * INNER SHELL: border-radius 14px, padding 12px 16px, bg #0B0B0B
 *
 * MESSAGE: Ubuntu Sans 400 14px, color #FFFFFF, line-height 1.4
 *
 * ACTION BUTTON: Ubuntu Sans Mono 500 13px uppercase, color #FDDC72 (gold)
 *
 * VARIANT ICONS (20x20):
 *   info:    rgba(255,255,255,0.55)
 *   success: #14AE5C
 *   error:   #EC221F
 *   warning: #E8B931
 */
import type { ReactNode } from 'react';

interface DSSnackbarProps {
  message?: string;
  variant?: 'info' | 'success' | 'error' | 'warning';
  showAction?: boolean;
}

const variantIcons: Record<string, { color: string; icon: ReactNode }> = {
  info: {
    color: 'rgba(255,255,255,0.55)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 256 256" fill="rgba(255,255,255,0.55)" style={{ flexShrink: 0 }}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-12-88v48a8,8,0,0,0,16,0V128a8,8,0,0,0-16,0Zm20-36a12,12,0,1,1-12-12A12,12,0,0,1,136,92Z" />
      </svg>
    ),
  },
  success: {
    color: '#14AE5C',
    icon: (
      <svg width="16" height="16" viewBox="0 0 256 256" fill="#14AE5C" style={{ flexShrink: 0 }}>
        <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
      </svg>
    ),
  },
  error: {
    color: '#EC221F',
    icon: (
      <svg width="16" height="16" viewBox="0 0 256 256" fill="#EC221F" style={{ flexShrink: 0 }}>
        <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z" />
      </svg>
    ),
  },
  warning: {
    color: '#E8B931',
    icon: (
      <svg width="16" height="16" viewBox="0 0 256 256" fill="#E8B931" style={{ flexShrink: 0 }}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-12-88v48a8,8,0,0,0,16,0V128a8,8,0,0,0-16,0Zm20-36a12,12,0,1,1-12-12A12,12,0,0,1,136,92Z" />
      </svg>
    ),
  },
};

export function DSSnackbar({
  message = 'Operacion exitosa',
  variant = 'info',
  showAction = false,
}: DSSnackbarProps) {
  const config = variantIcons[variant] || variantIcons.info;

  return (
    <div role="status" aria-live="polite" style={{ width: '100%', maxWidth: '420px' }}>
      {/* Outer shell */}
      <div
        style={{
          backgroundColor: 'var(--preview-border, #1E1E1E)',
          borderRadius: '16px',
          padding: '3px',
          minWidth: '280px',
          maxWidth: '420px',
          boxShadow: '0px 4px 20px rgba(11,15,16,0.14), 0px 0px 2px rgba(11,15,16,0.08)',
        }}
      >
        {/* Inner shell */}
        <div
          style={{
            backgroundColor: 'var(--preview-brand, #0B0B0B)',
            borderRadius: '14px',
            padding: '0 14px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Variant icon */}
          {config.icon}

          {/* Message */}
          <span
            style={{
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: 1,
              color: 'var(--preview-brand-on, #FFFFFF)',
              fontFamily: 'var(--font-ubuntu-sans), sans-serif',
              flex: 1,
            }}
          >
            {message}
          </span>

          {/* Action button */}
          {showAction && (
            <span
              style={{
                fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
                fontWeight: 500,
                fontSize: '13px',
                textTransform: 'uppercase',
                color: '#FDDC72',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              Deshacer
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
