import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProfileSummaryBlock } from '@/components/profile/ProfileSummaryBlock';
import { circles } from '@/data/mock';
import { useAppStore } from '@/store/useAppStore';

export function ProfilePage() {
  const { t } = useTranslation();
  const me = useAppStore((s) => s.me);
  const user = me;

  if (!user) {
    return (
      <div className="premium-card rounded-3xl p-5">
        <p className="text-sm text-muted">{t('profileGuestLimited')}</p>
        <Link to="/auth" className="premium-btn mt-3 inline-flex rounded-2xl px-4 py-2 text-sm">
          {t('login')}
        </Link>
      </div>
    );
  }

  const joinedCircles = circles.filter((circle) => user.joinedCircleIds.includes(circle.id));

  return (
    <div className="space-y-4 pb-8">
      <ProfileSummaryBlock user={user} />
      <section className="premium-card rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg text-text">{t('credibilitySignals')}</h2>
          <Link to="/profile/me/edit-preferences" className="text-sm text-cyan">{t('edit')}</Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="premium-card-soft rounded-2xl p-3"><p className="text-muted">{t('sessionsCompleted')}</p><p className="font-semibold">{user.reliability.sessionsCompleted}</p></div>
          <div className="premium-card-soft rounded-2xl p-3"><p className="text-muted">{t('punctuality')}</p><p className="font-semibold">{user.reliability.punctuality}%</p></div>
          <div className="premium-card-soft rounded-2xl p-3"><p className="text-muted">{t('respect')}</p><p className="font-semibold">{user.reliability.respect}%</p></div>
          <div className="premium-card-soft rounded-2xl p-3"><p className="text-muted">{t('commitment')}</p><p className="font-semibold">{user.reliability.commitment}%</p></div>
        </div>
      </section>
      <section className="premium-card rounded-3xl p-5">
        <h2 className="font-heading text-lg text-text">{t('joinedCircles')}</h2>
        <div className="mt-3 space-y-2">
          {joinedCircles.map((circle) => (
            <p key={circle.id} className="premium-card-soft rounded-2xl px-3 py-2 text-sm text-text">{circle.name}</p>
          ))}
        </div>
      </section>
      <Link to="/premium" className="premium-btn block rounded-2xl px-4 py-3 text-center text-sm font-semibold">
        {t('upgradeToPro')}
      </Link>
    </div>
  );
}
