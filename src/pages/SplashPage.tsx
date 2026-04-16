import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Coffee,
  Compass,
  Lock,
  Sparkles,
  Users,
  WandSparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

const steps = {
  en: [
    { title: 'Discover', body: 'Explore live sessions by intent, vibe, and timing.', icon: Compass },
    { title: 'Match', body: 'Swipe intent-first cards, not faces.', icon: Sparkles },
    { title: 'Join', body: 'Lock your spot and sync instantly in chat.', icon: Users },
    { title: 'Meet', body: 'Move from intention to real-world action.', icon: BadgeCheck }
  ],
  ar: [
    { title: 'اكتشف', body: 'استكشف جلسات مباشرة بحسب النية والأجواء والوقت.', icon: Compass },
    { title: 'طابق', body: 'اسحب بحسب النية، وليس الشكل.', icon: Sparkles },
    { title: 'انضم', body: 'احجز مكانك ونسّق فورًا عبر الدردشة.', icon: Users },
    { title: 'التقِ', body: 'انتقل من النية إلى فعل حقيقي على الأرض.', icon: BadgeCheck }
  ]
} as const;

const useCases = {
  en: [
    { title: 'Study', body: 'Focused sprints and accountability sessions.', icon: WandSparkles },
    { title: 'Work', body: 'Cowork blocks with deep productivity energy.', icon: Briefcase },
    { title: 'Networking', body: 'Meaningful professional introductions.', icon: Users },
    { title: 'Social', body: 'Smart matching for natural connections.', icon: Sparkles },
    { title: 'Outings', body: 'Walks, coffee, and city plans that actually happen.', icon: Coffee }
  ],
  ar: [
    { title: 'دراسة', body: 'جلسات تركيز ومحاسبة واضحة.', icon: WandSparkles },
    { title: 'عمل', body: 'بلوكات عمل بإيقاع إنتاجي عميق.', icon: Briefcase },
    { title: 'تواصل', body: 'تعارف مهني فعلي وهادف.', icon: Users },
    { title: 'اجتماعي', body: 'مطابقة ذكية لعلاقات طبيعية.', icon: Sparkles },
    { title: 'طلعات', body: 'مشي وقهوة وخطط مدينة تحدث فعلًا.', icon: Coffee }
  ]
} as const;

export function SplashPage() {
  const locale = useAppStore((s) => s.locale);
  const navigate = useNavigate();
  const copy = locale === 'ar'
    ? {
        pill: 'اجتماعي-تقني فاخر',
        title1: 'اعثر على ناسك.',
        title2: 'تحرك بنية واضحة.',
        body: 'الناس المناسبة، في الوقت المناسب. معك يحول النية اليومية إلى جلسات حقيقية للدراسة والعمل والتواصل والطلعات.',
        cta: 'ابدأ الآن',
        guest: 'استكشف كضيف',
        whyTitle: 'ليش معك',
        whyBody: 'المشكلة الحقيقية: عزلة، خطط مشتتة، وضعف في الالتزام. معك ينسّق الجلسات حسب النية والوقت والثقة.',
        how: 'كيف يشتغل',
        useCases: 'حالات الاستخدام',
        trust: 'الثقة والأمان',
        trustBody: 'خصوصية أولًا. موقع تقريبي، وصول حسب النية، وفتح الدردشة بعد المطابقة.',
        premium: 'البريميوم / الأعمال',
        premiumBody: 'نموذج جدي قابل للاستثمار: اشتراكات، تعزيز جلسات، وشراكات أماكن.',
        businessCta: 'شاهد النموذج'
      }
    : {
        pill: 'Dark Premium Social-Tech',
        title1: 'Find your people.',
        title2: 'Move with intention.',
        body: 'The right people, right now. MA3AK turns daily intent into real sessions for study, work, networking, and social plans.',
        cta: 'Start now',
        guest: 'Explore as guest',
        whyTitle: 'Why MA3AK',
        whyBody: 'Real problem: isolation, scattered plans, weak follow-through, and shallow matching.',
        how: 'How it works',
        useCases: 'Use cases',
        trust: 'Trust & Safety',
        trustBody: 'Privacy-first by default. Approximate location and match-based chat unlocks keep coordination safe.',
        premium: 'Premium / Business',
        premiumBody: 'Subscription tiers, session boosts, and venue partnerships make it investor-ready.',
        businessCta: 'See business model'
      };

  const stepsList = locale === 'ar' ? steps.ar : steps.en;
  const useCasesList = locale === 'ar' ? useCases.ar : useCases.en;

  return (
    <div className="space-y-10 pb-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-line bg-[#0B1020] p-6 shadow-velvet md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="pointer-events-none absolute -left-16 top-1/3 h-44 w-44 rounded-full bg-cyan/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full bg-violet/25 blur-3xl" />

        <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {copy.pill}
            </p>
            <h1 className="font-heading text-4xl leading-tight text-slate-50 md:text-6xl">
              {copy.title1}
              <br />
              {copy.title2}
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              {copy.body}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/welcome')}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-cyan px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
              >
                {copy.cta} <ArrowRight size={16} />
              </button>
              <Link
                to="/guest"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                {copy.guest}
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto w-full max-w-sm">
            <div className="rounded-[2rem] border border-white/15 bg-[#111827]/70 p-3 backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#161D2E] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan">Live intent cards</p>
                <div className="mt-3 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm font-semibold text-slate-50">Study Sprint 50m</p>
                    <p className="mt-1 text-xs text-slate-300">Focused • 3/4 joined • Near you</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm font-semibold text-slate-50">Builder Networking</p>
                    <p className="mt-1 text-xs text-slate-300">Ambitious • Circle-only • Tonight</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-accent/20 to-violet/20 p-3">
                    <p className="text-sm font-semibold text-slate-50">Coffee Signal 1:1</p>
                    <p className="mt-1 text-xs text-slate-200">Mutual match unlocks chat</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="premium-card rounded-3xl p-6 backdrop-blur">
        <h2 className="font-heading text-2xl text-text">{copy.whyTitle}</h2>
        <p className="mt-3 text-sm text-muted">{copy.whyBody}</p>
      </section>

      <section className="premium-card rounded-3xl p-6 backdrop-blur">
        <h2 className="font-heading text-2xl text-text">{copy.how}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {stepsList.map((step) => (
            <article key={step.title} className="premium-card-soft rounded-2xl p-4">
              <step.icon size={18} className="text-cyan" />
              <h3 className="mt-3 font-semibold text-text">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="premium-card rounded-3xl p-6 backdrop-blur">
        <h2 className="font-heading text-2xl text-text">{copy.useCases}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {useCasesList.map((item) => (
            <article key={item.title} className="premium-card-soft rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-accent/50">
              <item.icon size={18} className="text-accent" />
              <h3 className="mt-3 font-semibold text-text">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="premium-card rounded-3xl p-6">
          <div className="inline-flex rounded-xl bg-cyan/15 p-2 text-cyan">
            <Lock size={18} />
          </div>
          <h2 className="mt-3 font-heading text-2xl text-text">{copy.trust}</h2>
          <p className="mt-2 text-sm text-muted">{copy.trustBody}</p>
        </article>
        <article className="rounded-3xl border border-line bg-gradient-to-br from-surface to-accent/10 p-6">
          <h2 className="font-heading text-2xl text-text">{copy.premium}</h2>
          <p className="mt-2 text-sm text-muted">{copy.premiumBody}</p>
          <button
            onClick={() => navigate('/premium')}
            className="mt-4 rounded-2xl bg-gradient-to-r from-accent to-violet px-4 py-2 text-sm font-semibold text-white"
          >
            {copy.businessCta}
          </button>
        </article>
      </section>
    </div>
  );
}
