import { UsersRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CircleCard } from '@/components/cards/CircleCard';
import { circles } from '@/data/mock';

export function ExploreCirclesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <section className="premium-card rounded-3xl p-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan">{t('groups')}</p>
            <h1 className="font-heading text-3xl text-text">{t('groups')}</h1>
          </div>
          <div className="premium-card-soft rounded-2xl p-3 text-cyan"><UsersRound size={18} /></div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {circles.map((circle) => (
          <CircleCard
            key={circle.id}
            circle={circle}
            onOpen={(id) => navigate(`/circles/${id}`)}
            action={
              <button className="premium-btn-secondary w-full rounded-2xl px-4 py-2 text-sm">
                {t('joinGroup')}
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
}
