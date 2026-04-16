import { useState } from 'react';

export function useBottomSheet(initial = false) {
  const [open, setOpen] = useState(initial);
  return {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    toggle: () => setOpen((v) => !v)
  };
}
