import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export function useAuthGate() {
  const isGuest = useAppStore((s) => s.isGuest);
  const openAuthGate = useAppStore((s) => s.openAuthGate);
  const navigate = useNavigate();

  return {
    isGuest,
    requireAuth(action: 'join' | 'like' | 'chat' | 'create', targetId?: string, redirectTo?: string) {
      if (isGuest) {
        openAuthGate({ action, targetId, redirectTo });
        navigate('/auth');
        return false;
      }
      return true;
    }
  };
}
