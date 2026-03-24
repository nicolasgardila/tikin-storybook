/**
 * FIGMA SPECS — Toast (derived from Snackbar pattern)
 * ===================================================
 * Toast uses the same Snackbar visual language (dark bg, inverted).
 * No dedicated toast.html — specs sourced from snackbar.html.
 *
 * STRUCTURE: Double-layer (outer shell + inner shell)
 *   Outer: border-radius 16px, padding 4px
 *   Inner: border-radius 14px, padding 12px 16px
 *
 * OUTER SHELL:
 *   Light: bg #1E1E1E, shadow 0px 4px 20px rgba(11,15,16,0.14), 0px 0px 2px rgba(11,15,16,0.08)
 *   Dark:  bg #F6F6F6, shadow 0px 4px 20px rgba(0,0,0,0.30)
 *
 * INNER SHELL:
 *   Light: bg #0B0B0B
 *   Dark:  bg #FFFFFF
 *
 * ICON: 20x20px
 *   success: #14AE5C
 *   error:   #EC221F
 *   warning: #E8B931
 *   info (lt): rgba(255,255,255,0.55)
 *   info (dk): rgba(11,11,11,0.45)
 *
 * MESSAGE: Ubuntu Sans 400 14px line-height 1.4
 *   Light: #FFFFFF
 *   Dark:  #0B0B0B
 *
 * ACTION: Ubuntu Sans Mono 500 13px uppercase
 *   Light: #FDDC72
 *   Dark:  #0B0B0B, weight 600
 *
 * CLOSE: container 20x20, icon 14x14
 *   Light: rgba(255,255,255,0.40)
 *   Dark:  rgba(11,11,11,0.35)
 *
 * GAP: 12px between elements
 */
import type { ReactNode } from 'react';

interface DSToastProps {
  message?: string;
  variant?: 'info' | 'success' | 'error' | 'warning';
  position?: 'top-right' | 'bottom-center';
  showClose?: boolean;
}

const variantConfig: Record<string, { color: string; icon: ReactNode }> = {
  info: {
    color: 'rgba(255,255,255,0.55)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 256 256" fill="rgba(255,255,255,0.55)" style={{ flexShrink: 0 }}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-12-88v48a8,8,0,0,0,16,0V128a8,8,0,0,0-16,0Zm20-36a12,12,0,1,1-12-12A12,12,0,0,1,136,92Z" />
      </svg>
    ),
  },
  success: {
    color: '#14AE5C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 256 256" fill="#14AE5C" style={{ flexShrink: 0 }}>
        <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
      </svg>
    ),
  },
  error: {
    color: '#EC221F',
    icon: (
      <svg width="20" height="20" viewBox="0 0 256 256" fill="#EC221F" style={{ flexShrink: 0 }}>
        <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z" />
      </svg>
    ),
  },
  warning: {
    color: '#E8B931',
    icon: (
      <svg width="20" height="20" viewBox="0 0 256 256" fill="#E8B931" style={{ flexShrink: 0 }}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-12-88v48a8,8,0,0,0,16,0V128a8,8,0,0,0-16,0Zm20-36a12,12,0,1,1-12-12A12,12,0,0,1,136,92Z" />
      </svg>
    ),
  },
};

export function DSToast({
  message = 'Cambios guardados correctamente',
  variant = 'success',
  position = 'top-right',
  showClose = false,
}: DSToastProps) {
  const config = variantConfig[variant] || variantConfig.info;

  const positionStyle: React.CSSProperties =
    position === 'bottom-center'
      ? { justifyContent: 'center', alignItems: 'flex-end' }
      : { justifyContent: 'flex-end', alignItems: 'flex-start' };

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        width: '100%',
        display: 'flex',
        ...positionStyle,
        minHeight: '80px',
        padding: '16px',
      }}
    >
      {/* Outer shell */}
      <div
        style={{
          backgroundColor: 'var(--preview-border, #1E1E1E)',
          borderRadius: '16px',
          padding: '4px',
          maxWidth: position === 'bottom-center' ? '100%' : '360px',
          width: position === 'bottom-center' ? '100%' : 'auto',
          boxShadow: '0px 4px 20px rgba(11,15,16,0.14), 0px 0px 2px rgba(11,15,16,0.08)',
        }}
      >
        {/* Inner shell */}
        <div
          style={{
            backgroundColor: 'var(--preview-brand, #0B0B0B)',
            borderRadius: '14px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Variant icon */}
          <div style={{ flexShrink: 0 }}>{config.icon}</div>

          {/* Message */}
          <span
            style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.4,
              color: 'var(--preview-brand-on, #FFFFFF)',
              fontFamily: 'var(--font-ubuntu-sans), sans-serif',
              flex: 1,
            }}
          >
            {message}
          </span>

          {/* Close button */}
          {showClose && (
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                flexShrink: 0,
                color: 'rgba(255,255,255,0.40)',
                lineHeight: 1,
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
