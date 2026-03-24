type Status = 'alpha' | 'beta' | 'stable';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  alpha: {
    label: 'Alpha',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  },
  beta: {
    label: 'Beta',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  },
  stable: {
    label: 'Stable',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
