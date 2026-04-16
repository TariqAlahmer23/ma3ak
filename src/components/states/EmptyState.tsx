import type { ReactNode } from 'react';

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="premium-card-soft rounded-3xl border border-dashed border-white/15 p-7 text-center">
      <h3 className="font-heading text-lg text-text">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
