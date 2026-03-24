interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--docs-border)]">
            <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium text-[var(--docs-muted)]">Prop</th>
            <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium text-[var(--docs-muted)]">Type</th>
            <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium text-[var(--docs-muted)]">Default</th>
            <th scope="col" className="py-3 text-left text-[13px] font-medium text-[var(--docs-muted)]">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-[var(--docs-border)]">
              <td className="py-3 pr-4">
                <code className="rounded-md bg-[var(--docs-accent)] px-1.5 py-0.5 text-[13px] font-medium text-[var(--docs-fg)] font-ds-mono">
                  {prop.name}
                </code>
                {prop.required && <span className="ml-1.5 text-red-500 text-xs">*</span>}
              </td>
              <td className="py-3 pr-4 text-[13px] text-[var(--docs-muted)] font-ds-mono">
                {prop.type}
              </td>
              <td className="py-3 pr-4 text-[13px] text-[var(--docs-muted)] font-ds-mono">
                {prop.default ?? '\u2014'}
              </td>
              <td className="py-3 text-[13px] text-[var(--docs-muted)]">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
