import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { circles, feed, messages, notifications, premiumPlans, sessions, threads, users } from '@/data/mock';
import type {
  Circle,
  FilterState,
  MatchResult,
  Message,
  NotificationItem,
  OnboardingProfile,
  Session,
  Thread,
  User
} from '@/types/domain';
import { uid } from '@/utils';

export type AuthGateIntent = {
  action: 'join' | 'like' | 'chat' | 'create';
  targetId?: string;
  redirectTo?: string;
};

type AppState = {
  locale: 'en' | 'ar';
  theme: 'dark';
  isGuest: boolean;
  me: User | null;
  onboarding: OnboardingProfile;
  sessions: Session[];
  circles: Circle[];
  feed: typeof feed;
  threads: Thread[];
  messages: Message[];
  notifications: NotificationItem[];
  savedSessionIds: string[];
  likedSessionIds: string[];
  authGate: AuthGateIntent | null;
  match: MatchResult | null;
  filters: FilterState;
  setTheme: (theme: 'dark') => void;
  setLocale: (locale: 'en' | 'ar') => void;
  openAuthGate: (intent: AuthGateIntent) => void;
  closeAuthGate: () => void;
  loginMock: () => void;
  logout: () => void;
  setOnboarding: (profile: Partial<OnboardingProfile>) => void;
  joinSession: (sessionId: string) => void;
  likeSession: (sessionId: string) => void;
  toggleSaved: (sessionId: string) => void;
  addSession: (session: Session) => void;
  sendMessage: (threadId: string, content: string) => void;
  markNotificationRead: (id: string) => void;
  setMatch: (match: MatchResult | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  premiumPlans: typeof premiumPlans;
};

const defaultOnboarding: OnboardingProfile = {
  intents: ['study', 'project', 'networking'],
  vibes: ['focused', 'ambitious'],
  preferredTimes: ['afternoon', 'evening'],
  privacyComfort: 'approval'
};

const savedLocale = (localStorage.getItem('ma3ak_locale') as 'en' | 'ar' | null) ?? 'en';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      locale: savedLocale,
      theme: 'dark',
      isGuest: true,
      me: null,
      onboarding: defaultOnboarding,
      sessions,
      circles,
      feed,
      threads,
      messages,
      notifications,
      savedSessionIds: ['s1'],
      likedSessionIds: [],
      authGate: null,
      match: null,
      filters: { intents: [], vibes: [], timeSlot: 'today' },
      premiumPlans,
      setTheme: () => set({ theme: 'dark' }),
      setLocale: (locale) => set({ locale }),
      openAuthGate: (authGate) => set({ authGate }),
      closeAuthGate: () => set({ authGate: null }),
      loginMock: () => set({ isGuest: false, me: users[0], authGate: null }),
      logout: () => set({ isGuest: true, me: null }),
      setOnboarding: (profile) => set({ onboarding: { ...get().onboarding, ...profile } }),
      joinSession: (sessionId) => {
        const me = get().me;
        if (!me) return;
        set({
          sessions: get().sessions.map((session) =>
            session.id === sessionId && !session.attendees.includes(me.id)
              ? { ...session, attendees: [...session.attendees, me.id] }
              : session
          )
        });
      },
      likeSession: (sessionId) => {
        const liked = get().likedSessionIds;
        if (liked.includes(sessionId)) return;
        set({ likedSessionIds: [...liked, sessionId] });
      },
      toggleSaved: (sessionId) => {
        const current = get().savedSessionIds;
        set({
          savedSessionIds: current.includes(sessionId)
            ? current.filter((id) => id !== sessionId)
            : [...current, sessionId]
        });
      },
      addSession: (session) => set({ sessions: [session, ...get().sessions] }),
      sendMessage: (threadId, content) => {
        const me = get().me ?? users[0];
        const message: Message = {
          id: uid('msg'),
          threadId,
          senderId: me.id,
          content,
          createdAt: new Date().toISOString(),
          status: 'sent'
        };
        set({ messages: [...get().messages, message] });
      },
      markNotificationRead: (id) => {
        set({
          notifications: get().notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        });
      },
      setMatch: (match) => set({ match }),
      setFilters: (filters) => set({ filters: { ...get().filters, ...filters } })
    }),
    {
      name: 'ma3ak-store',
      partialize: (state) => ({
        locale: state.locale,
        theme: state.theme,
        isGuest: state.isGuest,
        me: state.me,
        onboarding: state.onboarding,
        savedSessionIds: state.savedSessionIds,
        likedSessionIds: state.likedSessionIds
      })
    }
  )
);
