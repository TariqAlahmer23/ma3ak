import { useMemo, useState } from 'react';

export function useSwipeDeck<T>(items: T[]) {
  const [index, setIndex] = useState(0);

  const current = useMemo(() => items[index], [items, index]);
  const remaining = items.length - index;

  const swipeNext = () => {
    setIndex((prev) => Math.min(prev + 1, items.length));
  };

  const reset = () => setIndex(0);

  return { current, index, remaining, swipeNext, reset, isComplete: index >= items.length };
}
