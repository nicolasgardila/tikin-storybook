/**
 * FIGMA SPECS — Skeleton
 *
 * Warm bg: #EEEBE6 (not #F6F6F6)
 * Animation: pulse 1.8s ease-in-out infinite
 *
 * Variants:
 *   text:      height 14px, border-radius 4px
 *   circle:    border-radius 50%
 *   rectangle: border-radius 8px
 */

interface DSSkeletonProps {
  variant?: 'text' | 'circle' | 'rectangle';
  width?: string;
  height?: string;
}

export function DSSkeleton({
  variant = 'text',
  width = '200px',
  height = '16px',
}: DSSkeletonProps) {
  const borderRadius =
    variant === 'circle'
      ? '50%'
      : variant === 'rectangle'
        ? '8px'
        : '4px';

  /* For circle, use width as both dimensions if height not explicitly different */
  const resolvedHeight = variant === 'circle' ? width : height;

  return (
    <div
      style={{
        width,
        height: resolvedHeight,
        backgroundColor: 'var(--preview-muted-bg, #EEEBE6)',
        borderRadius,
        animation: 'ds-pulse 1.8s ease-in-out infinite',
      }}
    />
  );
}
