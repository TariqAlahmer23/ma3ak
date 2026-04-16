import type { User } from '@/types/domain';
import { ReliabilityMeter } from '@/components/ui/ReliabilityMeter';
import { TrustBadge } from '@/components/ui/TrustBadge';

export function ProfileSummaryBlock({ user }: { user: User }) {
  return (
    <div className="premium-card rounded-3xl p-5">
      <div className="flex items-start gap-3">
        <img src={user.avatar} className="h-14 w-14 rounded-2xl object-cover" alt={user.name} />
        <div>
          <h2 className="font-heading text-xl text-text">{user.name}</h2>
          <p className="text-sm text-muted">@{user.handle} • {user.city}</p>
          <div className="mt-2"><TrustBadge score={user.reliability.score} /></div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{user.bio}</p>
      <ReliabilityMeter className="mt-4" score={user.reliability.score} />
    </div>
  );
}
