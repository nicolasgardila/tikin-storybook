/**
 * FIGMA SPEC — Avatar
 * Source: DS decisions (STATE.md) and avatar.mdx specs
 *
 * SIZE-TO-FONT: 24->9, 32->11, 40->14, 48->16, 64->22
 * STATUS COLORS: online=#14AE5C, offline=#B3B3B3, busy=#EC221F, away=#E8B931
 * INITIALS BG: #E8E4DD light, border 0.5px solid #DEDEDE
 * FONT: Ubuntu Sans, weight 600, uppercase
 * STATUS DOT: 12px, 2px border solid #FAF8F4
 */

interface DSAvatarProps {
  size?: '24' | '32' | '40' | '48' | '64';
  initials?: string;
  src?: string;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
  loading?: boolean;
}

const fontSizeMap: Record<string, number> = {
  '24': 9,
  '32': 11,
  '40': 14,
  '48': 16,
  '64': 22,
};

const statusColors: Record<string, string> = {
  online: '#14AE5C',
  offline: '#B3B3B3',
  busy: '#EC221F',
  away: '#E8B931',
};

export function DSAvatar({
  size = '40',
  initials = 'NG',
  src = '',
  showStatus = false,
  status = 'online',
  loading = false,
}: DSAvatarProps) {
  const sizeNum = parseInt(size, 10);
  const fontSize = fontSizeMap[size] || 14;

  const circleStyle: React.CSSProperties = {
    width: `${sizeNum}px`,
    height: `${sizeNum}px`,
    borderRadius: '50%',
    backgroundColor: 'var(--preview-muted-bg, #E8E4DD)',
    border: '0.5px solid var(--preview-border, #DEDEDE)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-ubuntu-sans), sans-serif',
    fontWeight: 600,
    fontSize: `${fontSize}px`,
    color: 'inherit',
    textTransform: 'uppercase',
    lineHeight: 1,
    overflow: 'hidden',
  };

  if (loading) {
    return (
      <div
        style={{
          ...circleStyle,
          animation: 'ds-pulse 1.8s ease-in-out infinite',
        }}
      />
    );
  }

  const avatarContent = src ? (
    <img src={src} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
  ) : initials;

  if (!showStatus) {
    return <div style={circleStyle}>{avatarContent}</div>;
  }

  const dotSize = sizeNum >= 48 ? 12 : sizeNum >= 32 ? 10 : 8;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <div style={circleStyle}>{avatarContent}</div>
      <div
        style={{
          position: 'absolute',
          bottom: '1px',
          right: '1px',
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: '50%',
          backgroundColor: statusColors[status] || statusColors.online,
          border: '2px solid var(--preview-surface, #FAF8F4)',
        }}
      />
    </div>
  );
}
