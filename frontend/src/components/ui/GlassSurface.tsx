import type { PropsWithChildren } from 'react';
import { clsx } from '@/utils';

type Props = PropsWithChildren<{ className?: string }>;

export function GlassSurface({ className, children }: Props) {
  return (
    <div
      className={clsx(
        'premium-card rounded-3xl transition duration-200 md:hover:-translate-y-0.5 md:hover:shadow-glow',
        className
      )}
    >
      {children}
    </div>
  );
}
