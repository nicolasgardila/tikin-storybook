/**
 * FIGMA SPECS — Alert / Banner (from alert.html)
 * ================================================
 *
 * STRUCTURE: flex, gap 10px, align-items flex-start
 * BORDER: 1px solid (full border, NOT left-only)
 * BORDER-RADIUS: 12px
 * PADDING: 14px 16px
 *
 * ICON: 20x20px, margin-top 1px
 *
 * TITLE: Funnel Display, weight 400, 14px, line-height 1.3
 * DESCRIPTION: Ubuntu Sans, weight 400, 13px, line-height 1.45
 * ACTION: Ubuntu Sans Mono, weight 500, 12px, uppercase, underline
 * CLOSE: container 20x20, icon 14x14, margin-top 1px
 *
 * CONTENT GAP: 4px between title and description
 *
 * VARIANT COLORS (Light):
 *   warning: bg #FFF5D4, border #FFE89E, icon #0B0F10, title #0B0F10, desc #0B0F10, close rgba(11,15,16,0.40)
 *   error:   bg #FEE9E7, border #FDD3D0, icon #EC221F, title #900B09, desc #900B09, close rgba(144,11,9,0.40)
 *   success: bg #EBFFEE, border #CFF7D3, icon #14AE5C, title #02542D, desc #02542D, close rgba(2,84,45,0.40)
 *   info:    bg #F6F6F6, border #E1E1E1, icon #757575, title #0B0B0B, desc rgba(11,11,11,0.65), close rgba(11,11,11,0.35)
 *
 * VARIANT COLORS (Dark):
 *   warning: bg rgba(232,185,49,0.10), border rgba(232,185,49,0.25), icon #E8B931, title #FFFFFF, desc rgba(255,255,255,0.75), close rgba(255,255,255,0.35)
 *   error:   bg rgba(236,34,31,0.08), border rgba(236,34,31,0.20), icon #EC221F, title #FFFFFF, desc rgba(255,255,255,0.70), close rgba(255,255,255,0.35)
 *   success: bg rgba(20,174,92,0.08), border rgba(20,174,92,0.20), icon #14AE5C, title #FFFFFF, desc rgba(255,255,255,0.70), close rgba(255,255,255,0.35)
 *   info:    bg rgba(255,255,255,0.04), border rgba(255,255,255,0.10), icon #B3B3B3, title #FFFFFF, desc rgba(255,255,255,0.55), close rgba(255,255,255,0.30)
 */
import type { ReactNode } from 'react';

interface DSAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  dismissible?: boolean;
}

const variantConfig: Record<string, {
  bgColor: string;
  borderColor: string;
  iconColor: string;
  titleColor: string;
  descColor: string;
  closeColor: string;
  icon: ReactNode;
}> = {
  info: {
    bgColor: 'var(--preview-muted-bg)',
    borderColor: 'var(--preview-border)',
    iconColor: '#757575',
    titleColor: 'inherit',
    descColor: 'inherit',
    closeColor: 'currentColor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 256 256" fill="#757575" style={{ flexShrink: 0, marginTop: '1px' }}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-12-88v48a8,8,0,0,0,16,0V128a8,8,0,0,0-16,0Zm20-36a12,12,0,1,1-12-12A12,12,0,0,1,136,92Z" />
      </svg>
    ),
  },
  success: {
    bgColor: 'color-mix(in srgb, #059669 10%, transparent)',
    borderColor: 'color-mix(in srgb, #059669 20%, transparent)',
    iconColor: '#14AE5C',
    titleColor: 'inherit',
    descColor: 'inherit',
    closeColor: 'currentColor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 256 256" fill="#14AE5C" style={{ flexShrink: 0, marginTop: '1px' }}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
      </svg>
    ),
  },
  warning: {
    bgColor: 'color-mix(in srgb, #D97706 10%, transparent)',
    borderColor: 'color-mix(in srgb, #D97706 20%, transparent)',
    iconColor: '#D97706',
    titleColor: 'inherit',
    descColor: 'inherit',
    closeColor: 'currentColor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 256 256" fill="#D97706" style={{ flexShrink: 0, marginTop: '1px' }}>
        <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z" />
      </svg>
    ),
  },
  error: {
    bgColor: 'color-mix(in srgb, #EC221F 10%, transparent)',
    borderColor: 'color-mix(in srgb, #EC221F 20%, transparent)',
    iconColor: '#EC221F',
    titleColor: 'inherit',
    descColor: 'inherit',
    closeColor: 'currentColor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 256 256" fill="#EC221F" style={{ flexShrink: 0, marginTop: '1px' }}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
      </svg>
    ),
  },
};

export function DSAlert({
  variant = 'info',
  title = 'Informacion',
  description = 'Tu sesion expirara en 5 minutos. Guarda tus cambios.',
  dismissible = false,
}: DSAlertProps) {
  const config = variantConfig[variant] || variantConfig.info;

  return (
    <div
      role="alert"
      style={{
        width: '100%',
        padding: '14px 16px',
        borderRadius: '12px',
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        fontFamily: 'var(--font-ubuntu-sans), sans-serif',
        position: 'relative',
      }}
    >
      {/* Variant icon */}
      {config.icon}

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.3,
            color: config.titleColor,
            fontFamily: 'var(--font-funnel-display), sans-serif',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: 1.45,
            color: config.descColor,
            opacity: variant === 'info' ? 0.65 : undefined,
          }}
        >
          {description}
        </div>
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            color: config.closeColor,
            opacity: variant === 'info' ? 0.35 : undefined,
            lineHeight: 1,
            flexShrink: 0,
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
