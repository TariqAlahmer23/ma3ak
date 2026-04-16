export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-muted/40 ${className ?? ''}`} />;
}
