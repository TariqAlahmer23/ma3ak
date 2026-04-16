import { Plus } from 'lucide-react';

type Props = {
  onClick: () => void;
  label?: string;
};

export function FloatingCTA({ onClick, label = 'Create' }: Props) {
  return (
    <button
      onClick={onClick}
      className="premium-btn fixed bottom-24 right-4 z-30 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
    >
      <Plus size={18} />
      {label}
    </button>
  );
}
