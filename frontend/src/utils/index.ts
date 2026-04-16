import clsx from 'clsx';

export { clsx };

export function formatTime(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date);
}

export function formatRelative(iso: string): string {
  const diffMins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  const h = Math.floor(diffMins / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function optimizeImageUrl(src: string, width = 900, quality = 70): string {
  try {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality));
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    return url.toString();
  } catch {
    return src;
  }
}

export function preloadImage(src: string): void {
  if (!src) return;
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}
