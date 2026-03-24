/**
 * FIGMA SPECS — Slider
 * =====================
 * Static slider visualization with track, fill, and thumb.
 *
 * TRACK: 4px height, bg #EEEBE6, border-radius 100px
 * FILL: 4px height, bg #0B0B0B (brand), border-radius 100px
 * THUMB: 20px diameter, border-radius 50%, bg #FFFFFF, border 2px solid #0B0B0B
 * DISABLED: fill + thumb border color #D9D9D9, thumb bg #F5F5F5
 */

interface DSSliderProps {
  value?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function DSSlider({
  value = 50,
  min = 0,
  max = 100,
  disabled = false,
}: DSSliderProps) {
  const range = max - min;
  const percent = range > 0 ? Math.max(0, Math.min(100, ((value - min) / range) * 100)) : 0;

  const fillColor = disabled ? 'var(--preview-border)' : 'var(--preview-brand, #0B0B0B)';
  const thumbBorderColor = disabled ? 'var(--preview-border)' : 'var(--preview-brand, #0B0B0B)';
  const thumbBg = disabled ? 'var(--preview-muted-bg)' : 'var(--preview-surface, #FFFFFF)';

  return (
    <div
      style={{
        width: '100%',
        padding: '8px 0',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Track background */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '4px',
            backgroundColor: 'var(--preview-muted-bg, #EEEBE6)',
            borderRadius: '100px',
          }}
        />
        {/* Fill */}
        <div
          style={{
            position: 'absolute',
            width: `${percent}%`,
            height: '4px',
            backgroundColor: fillColor,
            borderRadius: '100px',
          }}
        />
        {/* Thumb */}
        <div
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          style={{
            position: 'absolute',
            left: `${percent}%`,
            transform: 'translateX(-50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: thumbBg,
            border: `2px solid ${thumbBorderColor}`,
            cursor: disabled ? 'default' : 'pointer',
          }}
        />
      </div>
    </div>
  );
}
