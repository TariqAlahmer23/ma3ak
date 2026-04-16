import type { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type BottomSheetProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
}>;

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/45"
            aria-label="Close"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border border-white/10 bg-[#111827]/95 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-muted/50" />
            {title ? <h3 className="mb-3 font-heading text-lg text-text">{title}</h3> : null}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
