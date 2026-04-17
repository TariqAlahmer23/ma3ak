import { AnimatePresence, motion } from 'framer-motion';
import { Bell, MapPin, Radio, Search, UserCircle2, Users, Zap } from 'lucide-react';
import mapboxgl, { type LngLatLike, type Map as MapboxMap, type MapMouseEvent, type Marker } from 'mapbox-gl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { liveMapEntities, type LiveMapEntity } from '@/data/mock/mapLive';
import { useAuthGate } from '@/hooks/useAuthGate';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { useAppStore } from '@/store/useAppStore';
import type { Intent, Vibe } from '@/types/domain';

const center: [number, number] = [36.2765, 33.5138];
const intents: Intent[] = ['study', 'work', 'project', 'networking', 'outing', 'coffee', 'walk', 'meet'];
const moods: Vibe[] = ['focused', 'social', 'chill', 'ambitious'];

type Cluster = {
  id: string;
  lng: number;
  lat: number;
  members: LiveMapEntity[];
};

type SelectedCard = {
  id: string;
  title: string;
  intent: Intent | 'mixed';
  activity: string;
  peopleCount: number;
  avatars: string[];
  joinRoute: string;
};

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function makeClusterId(members: LiveMapEntity[]) {
  return `cluster_${members.map((m) => m.id).sort().join('_')}`;
}

function createMarkerElement(cluster: Cluster): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'ma3ak-marker';

  if (cluster.members.length > 1) {
    container.classList.add('ma3ak-marker-cluster');

    const avatars = document.createElement('div');
    avatars.className = 'ma3ak-marker-avatars';

    cluster.members.slice(0, 3).forEach((member) => {
      const img = document.createElement('img');
      img.className = 'ma3ak-marker-avatar';
      img.src = member.avatars[0] ?? 'https://i.pravatar.cc/200?img=11';
      img.alt = member.title;
      avatars.appendChild(img);
    });

    const badge = document.createElement('span');
    badge.className = 'ma3ak-marker-count';
    badge.textContent = String(cluster.members.length);

    container.appendChild(avatars);
    container.appendChild(badge);
    return container;
  }

  const member = cluster.members[0];

  if (member.type === 'session') {
    container.classList.add('ma3ak-marker-session');

    const pin = document.createElement('div');
    pin.className = 'ma3ak-marker-pin';
    pin.innerHTML = '<span class="ma3ak-marker-pin-dot"></span>';

    const pulse = document.createElement('span');
    pulse.className = 'ma3ak-marker-pulse';

    container.appendChild(pin);
    container.appendChild(pulse);
    return container;
  }

  const avatar = document.createElement('img');
  avatar.className = 'ma3ak-marker-user-avatar';
  avatar.src = member.avatars[0] ?? 'https://i.pravatar.cc/200?img=11';
  avatar.alt = member.title;

  const glow = document.createElement('span');
  glow.className = 'ma3ak-marker-user-glow';

  container.appendChild(avatar);
  container.appendChild(glow);

  if (member.type === 'group') {
    const badge = document.createElement('span');
    badge.className = 'ma3ak-marker-count';
    badge.textContent = String(Math.max(2, member.peopleCount));
    container.appendChild(badge);
  }

  return container;
}

export function MapPage() {
  const { t } = useTranslation();
  const { intentLabel, vibeLabel } = useDomainLabels();
  const navigate = useNavigate();
  const { requireAuth } = useAuthGate();
  const me = useAppStore((s) => s.me);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const pickModeRef = useRef(false);

  const [entities, setEntities] = useState<LiveMapEntity[]>(liveMapEntities);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const [checkInOpen, setCheckInOpen] = useState(false);
  const [pickMode, setPickMode] = useState(false);
  const [pickedPoint, setPickedPoint] = useState<{ lng: number; lat: number; label: string } | null>(null);
  const [activity, setActivity] = useState('');
  const [intent, setIntent] = useState<Intent>('study');
  const [mood, setMood] = useState<Vibe>('focused');
  const [activeIntent, setActiveIntent] = useState<Intent | 'all'>('all');

  const canPublish = !!pickedPoint && activity.trim().length > 3;

  useEffect(() => {
    if (!activity) {
      setActivity(t('whatAreYouDoing'));
    }
  }, [activity, t]);

  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string | undefined;
  const mapStyle =
    (import.meta.env.VITE_MAPBOX_STYLE_URL as string | undefined) ||
    'mapbox://styles/mapbox/navigation-night-v1';

  const buildClusters = useCallback((map: MapboxMap, items: LiveMapEntity[]): Cluster[] => {
    const zoom = map.getZoom();
    const thresholdPx = Math.max(28, 88 - zoom * 4.5);

    const points = items.map((entity) => {
      const projected = map.project([entity.lng, entity.lat]);
      return {
        entity,
        point: { x: projected.x, y: projected.y }
      };
    });

    const used = new Set<string>();
    const clusters: Cluster[] = [];

    for (const point of points) {
      if (used.has(point.entity.id)) continue;

      const members: LiveMapEntity[] = [point.entity];
      used.add(point.entity.id);

      for (const candidate of points) {
        if (used.has(candidate.entity.id)) continue;
        if (distance(point.point, candidate.point) <= thresholdPx) {
          members.push(candidate.entity);
          used.add(candidate.entity.id);
        }
      }

      const avgLng = members.reduce((acc, m) => acc + m.lng, 0) / members.length;
      const avgLat = members.reduce((acc, m) => acc + m.lat, 0) / members.length;

      clusters.push({
        id: makeClusterId(members),
        lng: avgLng,
        lat: avgLat,
        members
      });
    }

    return clusters;
  }, []);

  const filteredEntities = useMemo(
    () => (activeIntent === 'all' ? entities : entities.filter((entity) => entity.intent === activeIntent)),
    [activeIntent, entities]
  );

  const updateMarkers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    const clusters = buildClusters(map, filteredEntities);

    clusters.forEach((cluster) => {
      const el = createMarkerElement(cluster);

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
        .setLngLat([cluster.lng, cluster.lat] as LngLatLike)
        .addTo(map);

      el.addEventListener('click', () => {
        if (cluster.members.length === 1) {
          const member = cluster.members[0];
          setSelectedCard({
            id: member.id,
            title: member.title,
            intent: member.intent,
            activity: member.activity,
            peopleCount: member.peopleCount,
            avatars: member.avatars,
            joinRoute: member.type === 'session' ? '/sessions' : '/match'
          });
          return;
        }

        const intentsInCluster = Array.from(new Set(cluster.members.map((m) => m.intent)));
        setSelectedCard({
          id: cluster.id,
          title: t('liveSpotsNearby', { count: cluster.members.length }),
          intent: intentsInCluster.length === 1 ? intentsInCluster[0] : 'mixed',
          activity: t('socialClusterActivity'),
          peopleCount: cluster.members.reduce((acc, m) => acc + Math.max(1, m.peopleCount), 0),
          avatars: cluster.members.flatMap((m) => m.avatars).slice(0, 4),
          joinRoute: '/sessions'
        });
      });

      markersRef.current.set(cluster.id, marker);
    });
  }, [buildClusters, filteredEntities, t]);

  useEffect(() => {
    if (!token || !mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center,
      zoom: 13,
      pitch: 28,
      bearing: -8,
      antialias: true
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

    const rerender = () => updateMarkers();

    const applySceneStyling = () => {
      map.setFog({
        color: 'rgb(11,16,32)',
        'high-color': 'rgb(17,24,39)',
        'space-color': 'rgb(7,10,20)',
        'horizon-blend': 0.12
      });
      rerender();
    };

    const handleMapError = (event: { error?: Error }) => {
      const message = event.error?.message?.trim();
      setMapError(message || 'Mapbox failed to load the map style or tiles.');
      if (message) console.error('Mapbox error:', message);
    };

    const handleMapClick = (event: MapMouseEvent) => {
      if (!pickModeRef.current) return;
      setPickedPoint({
        lng: event.lngLat.lng,
        lat: event.lngLat.lat,
        label: t('pinnedAt', { lat: event.lngLat.lat.toFixed(4), lng: event.lngLat.lng.toFixed(4) })
      });
      setPickMode(false);
      setCheckInOpen(true);
    };

    map.on('style.load', applySceneStyling);
    map.on('load', () => {
      setMapError(null);
      map.easeTo({ center, duration: 900 });
      applySceneStyling();
    });
    map.on('error', handleMapError);
    map.on('zoomend', rerender);
    map.on('moveend', rerender);
    map.on('click', handleMapClick);

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current.clear();
      map.off('style.load', applySceneStyling);
      map.off('error', handleMapError);
      map.off('zoomend', rerender);
      map.off('moveend', rerender);
      map.off('click', handleMapClick);
      map.remove();
      mapRef.current = null;
    };
  }, [token, mapStyle, t, updateMarkers]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let cancelled = false;

    const applyStyleIfNeeded = () => {
      if (cancelled) return;

      const styleId = mapStyle.split('/').at(-1) ?? mapStyle;
      const currentSprite = map.getStyle()?.sprite ?? '';
      if (currentSprite.includes(styleId)) return;

      map.setStyle(mapStyle);
    };

    if (map.isStyleLoaded()) {
      applyStyleIfNeeded();
    } else {
      map.once('style.load', applyStyleIfNeeded);
    }

    return () => {
      cancelled = true;
    };
  }, [mapStyle]);

  useEffect(() => {
    pickModeRef.current = pickMode;
  }, [pickMode]);

  useEffect(() => {
    updateMarkers();
  }, [filteredEntities, updateMarkers]);

  const mapStatus = useMemo(() => t('livePointsAround', { count: filteredEntities.length }), [filteredEntities.length, t]);

  const publishCheckIn = () => {
    if (!canPublish || !pickedPoint) return;

    const myAvatar = me?.avatar ?? 'https://i.pravatar.cc/200?img=11';

    const newEntity: LiveMapEntity = {
      id: `checkin_${Date.now()}`,
      type: 'user',
      title: me?.name ? t('checkedInTitleUser', { name: me.name }) : t('checkedInTitleYou'),
      activity,
      intent,
      peopleCount: 1,
      lng: pickedPoint.lng,
      lat: pickedPoint.lat,
      avatars: [myAvatar],
      isLive: true
    };

    setEntities((prev) => [newEntity, ...prev]);
    setSelectedCard({
      id: newEntity.id,
      title: newEntity.title,
      intent: newEntity.intent,
      activity: `${activity} • ${mood}`,
      peopleCount: 1,
      avatars: [myAvatar],
      joinRoute: '/match'
    });

    mapRef.current?.flyTo({ center: [newEntity.lng, newEntity.lat], zoom: 14.2, duration: 900 });

    setCheckInOpen(false);
    setPickMode(false);
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-bg">
      <div ref={mapContainerRef} className="absolute inset-0" />

      <section className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-4 top-4 z-30 flex items-center gap-3 md:hidden">
          <button
            onClick={() => navigate('/profile/you')}
            className="pointer-events-auto order-3 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[rgba(9,17,14,.72)] text-text shadow-[0_12px_30px_rgba(0,0,0,.25)] backdrop-blur-[18px] transition hover:border-white/20"
            aria-label={t('profile')}
          >
            {me?.avatar ? (
              <img src={me.avatar} alt={me.name ?? t('profile')} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <UserCircle2 size={22} />
            )}
          </button>

          <div className="pointer-events-auto order-2 min-w-0 flex-1">
            <div className="rounded-[1.35rem] border border-white/12 bg-[rgba(16,25,21,.66)] px-4 py-3 shadow-[0_14px_30px_rgba(0,0,0,.22)] backdrop-blur-[24px]">
              <div className="flex items-center gap-2 text-sm font-medium text-text">
                <Search size={15} className="text-cyan" />
                <span className="truncate">{pickMode ? t('tapToCheckIn') : t('peopleLiveAround')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/notifications')}
            className="pointer-events-auto order-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[rgba(9,17,14,.72)] text-text shadow-[0_12px_28px_rgba(0,0,0,.22)] backdrop-blur-[18px] transition hover:border-white/20"
            aria-label="Notifications"
          >
            <Bell size={16} />
          </button>
        </div>

        {!token ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-bg/88 p-6 text-center">
            <div className="max-w-md space-y-2">
              <p className="text-sm uppercase tracking-[0.16em] text-cyan">{t('mapSetupRequired')}</p>
              <p className="text-sm text-text">
                {t('addMapToken')}
              </p>
            </div>
          </div>
        ) : null}
        {token && mapError ? (
          <div className="pointer-events-auto absolute inset-x-4 top-[8.5rem] z-30 mx-auto max-w-lg rounded-2xl border border-line/70 bg-[rgba(17,28,23,.92)] p-4 text-sm text-text shadow-2xl backdrop-blur-xl md:top-28">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan">{t('mapLoadFailed')}</p>
            <p className="mt-2 text-muted">{t('mapLoadHelp')}</p>
            <p className="mt-2 break-words rounded-xl bg-white/5 px-3 py-2 font-mono text-xs text-text/90">{mapError}</p>
          </div>
        ) : null}

        <div className="pointer-events-auto absolute left-4 right-4 top-[4.8rem] z-20 hidden md:left-6 md:right-6 md:top-24 md:block md:mx-auto md:max-w-sm">
          <div className="rounded-[1.45rem] border border-white/12 bg-[rgba(16,25,21,.68)] px-4 py-3 shadow-[0_16px_34px_rgba(0,0,0,.24)] backdrop-blur-[24px]">
            <div className="flex items-center gap-2 text-sm font-medium text-text">
              <Search size={15} className="text-cyan" />
              <span>{pickMode ? t('tapToCheckIn') : t('peopleLiveAround')}</span>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto absolute inset-x-4 top-[4.85rem] z-20 md:hidden">
          <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
            {(['all', ...intents] as Array<Intent | 'all'>).map((chip) => {
              const active = activeIntent === chip;
              const label = chip === 'all' ? t('map') : intentLabel(chip);

              return (
                <button
                  key={chip}
                  onClick={() => setActiveIntent(chip)}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                    active
                      ? 'border-accent/40 bg-accent-soft text-text shadow-[0_10px_24px_rgba(29,191,115,.14)]'
                      : 'border-white/12 bg-[rgba(11,20,17,.68)] text-text/76 backdrop-blur-[16px]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute left-4 top-[7.95rem] z-20 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(11,20,17,.78)] px-3.5 py-1.5 text-xs font-medium text-text shadow-[0_10px_24px_rgba(0,0,0,.2)] backdrop-blur-[16px] md:top-36">
          <Radio size={13} className="text-rose-400" />
          {mapStatus}
        </div>

        <AnimatePresence>
          {selectedCard ? (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCard(null)}
                className="pointer-events-auto absolute inset-0 z-20 bg-black/28"
                aria-label={t('closeDetails')}
              />

              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                className="pointer-events-auto absolute inset-x-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-30 rounded-[1.8rem] border border-white/12 bg-[rgba(14,22,19,.82)] p-4 shadow-[0_24px_50px_rgba(0,0,0,.34)] backdrop-blur-[24px] md:bottom-4 md:mx-auto md:max-w-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan">{intentLabel(selectedCard.intent)}</p>
                    <h2 className="font-heading text-lg text-text">{selectedCard.title}</h2>
                  </div>
                  <span className="rounded-full border border-line/60 bg-bg/50 px-2 py-1 text-xs text-text">
                    {t('liveLabel')}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted">{selectedCard.activity}</p>

                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <div className="flex -space-x-2">
                    {selectedCard.avatars.slice(0, 4).map((avatar, idx) => (
                      <img key={`${avatar}-${idx}`} src={avatar} className="h-7 w-7 rounded-full border-2 border-surface object-cover" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1"><Users size={13} /> {selectedCard.peopleCount} {t('nearby')}</span>
                </div>

                <button
                  onClick={() => {
                    if (!requireAuth('join', undefined, '/home')) return;
                    navigate(selectedCard.joinRoute);
                  }}
                  className="premium-btn mt-4 w-full rounded-2xl px-4 py-2.5 text-sm font-semibold"
                >
                  {t('joinNow')}
                </button>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </section>

      <div className="pointer-events-auto absolute bottom-[calc(7.4rem+env(safe-area-inset-bottom))] right-4 z-40 md:bottom-8 md:right-8">
        <button
          onClick={() => {
            if (!requireAuth('create', undefined, '/home')) return;
            setCheckInOpen(true);
          }}
          className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(14,22,19,.8)] px-4 py-3 text-sm font-semibold text-text shadow-[0_18px_36px_rgba(0,0,0,.32)] backdrop-blur-[22px] transition hover:-translate-y-0.5 hover:border-cyan/50"
        >
          <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-accent text-white">
            <Zap size={13} />
            <span className="absolute h-6 w-6 animate-ping rounded-full bg-cyan/30" />
          </span>
          {t('checkIn')}
        </button>
      </div>

      <AnimatePresence>
        {checkInOpen ? (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/55"
              onClick={() => setCheckInOpen(false)}
              aria-label={t('closeCheckIn')}
            />

            <motion.section
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border border-line/60 bg-surface p-5 text-text shadow-2xl"
            >
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-slate-500/50" />
              <h3 className="font-heading text-xl">{t('checkInNow')}</h3>
              <p className="mt-1 text-sm text-muted">{t('shareWhere')}</p>

              <div className="mt-4 space-y-3">
                <div className="premium-card-soft rounded-2xl p-3 text-sm">
                  <p className="text-xs text-muted">{t('place')}</p>
                  <p className="mt-1 text-text">{pickedPoint?.label ?? t('noLocationSelected')}</p>
                </div>

                <button
                  onClick={() => {
                    setCheckInOpen(false);
                    setPickMode(true);
                  }}
                  className="premium-btn-secondary w-full rounded-2xl px-4 py-2 text-sm"
                >
                  {t('selectPlaceOnMap')}
                </button>

                <input
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="premium-input w-full rounded-2xl px-3 py-2 text-sm"
                  placeholder={t('whatAreYouDoing')}
                />

                <div>
                  <p className="mb-2 text-xs text-muted">{t('intentTitle')}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {intents.map((i) => (
                      <button
                        key={i}
                        onClick={() => setIntent(i)}
                        className={`rounded-xl px-2 py-1.5 text-xs ${
                          intent === i ? 'premium-btn text-white' : 'premium-btn-secondary'
                        }`}
                      >
                        {intentLabel(i)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted">{t('mood')}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {moods.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMood(m)}
                        className={`rounded-xl px-2 py-1.5 text-xs ${mood === m ? 'premium-btn text-white' : 'premium-btn-secondary'}`}
                      >
                        {vibeLabel(m)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={!canPublish}
                  onClick={publishCheckIn}
                  className="premium-btn w-full rounded-2xl px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t('goLive')}
                </button>
              </div>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
