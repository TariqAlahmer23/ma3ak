import type {
  Circle,
  FeedSection,
  Message,
  NotificationItem,
  PremiumPlan,
  Session,
  Thread,
  User
} from '@/types/domain';

const now = new Date();

export const users: User[] = [
  {
    id: 'u_me',
    handle: 'you',
    name: 'You',
    avatar: 'https://i.pravatar.cc/200?img=11',
    bio: 'Building momentum with intentional sessions.',
    city: 'Damascus',
    intents: ['study', 'project', 'networking'],
    vibes: ['focused', 'ambitious'],
    verifiedPhone: true,
    joinedCircleIds: ['c1', 'c2'],
    reliability: { score: 87, punctuality: 90, respect: 94, commitment: 82, sessionsCompleted: 29 }
  },
  {
    id: 'u1',
    handle: 'rana',
    name: 'Rana Almasri',
    avatar: 'https://i.pravatar.cc/200?img=5',
    bio: 'UX student, deep work fan.',
    city: 'Damascus',
    intents: ['study', 'work'],
    vibes: ['focused', 'chill'],
    verifiedPhone: true,
    joinedCircleIds: ['c1'],
    reliability: { score: 91, punctuality: 93, respect: 92, commitment: 89, sessionsCompleted: 41 }
  },
  {
    id: 'u2',
    handle: 'moh',
    name: 'Mohammad Kareem',
    avatar: 'https://i.pravatar.cc/200?img=18',
    bio: 'Founder mode. Sprinting nightly.',
    city: 'Aleppo',
    intents: ['project', 'networking', 'coffee'],
    vibes: ['ambitious', 'social'],
    verifiedPhone: true,
    joinedCircleIds: ['c2', 'c3'],
    reliability: { score: 84, punctuality: 79, respect: 90, commitment: 86, sessionsCompleted: 34 }
  },
  {
    id: 'u3',
    handle: 'sara_ling',
    name: 'Sara Lingua',
    avatar: 'https://i.pravatar.cc/200?img=28',
    bio: 'Language exchange + city walks.',
    city: 'Homs',
    intents: ['walk', 'outing', 'meet'],
    vibes: ['social', 'spontaneous'],
    verifiedPhone: true,
    joinedCircleIds: ['c4'],
    reliability: { score: 88, punctuality: 87, respect: 93, commitment: 81, sessionsCompleted: 22 }
  }
];

export const sessions: Session[] = [
  {
    id: 's1',
    title: '50m Deep Focus: Algorithms',
    intent: 'study',
    hostId: 'u1',
    vibeTags: ['focused'],
    startsAt: new Date(now.getTime() + 25 * 60000).toISOString(),
    durationMins: 50,
    mode: 'in_person',
    capacity: 4,
    attendees: ['u1', 'u_me'],
    privacy: 'approval',
    locationLabel: 'Malki District',
    note: 'Bring one hard problem to solve before the timer ends.',
    reliabilityRequired: 70,
    circleId: 'c1',
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 's2',
    title: 'Founder Sprint: MVP Scope Lock',
    intent: 'project',
    hostId: 'u2',
    vibeTags: ['ambitious', 'focused'],
    startsAt: new Date(now.getTime() + 80 * 60000).toISOString(),
    durationMins: 90,
    mode: 'online',
    capacity: 6,
    attendees: ['u2'],
    privacy: 'public',
    locationLabel: 'Online Room',
    note: 'Arrive with one metric to move this week.',
    circleId: 'c2',
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 's3',
    title: 'Coffee Signal: New Connections 1:1',
    intent: 'coffee',
    hostId: 'u3',
    vibeTags: ['social', 'chill'],
    startsAt: new Date(now.getTime() + 180 * 60000).toISOString(),
    durationMins: 40,
    mode: 'in_person',
    capacity: 2,
    attendees: ['u3'],
    privacy: 'approval',
    locationLabel: 'Abu Rummaneh Area',
    note: 'Mutual match unlocks chat and precise meetup code.',
    reliabilityRequired: 75,
    cover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 's4',
    title: 'Sunset Walk: decompress + talk',
    intent: 'walk',
    hostId: 'u3',
    vibeTags: ['chill', 'social'],
    startsAt: new Date(now.getTime() + 240 * 60000).toISOString(),
    durationMins: 60,
    mode: 'in_person',
    capacity: 8,
    attendees: ['u3', 'u1'],
    privacy: 'public',
    locationLabel: 'Qassioun foothills',
    cover: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&q=80&auto=format&fit=crop'
  }
];

export const circles: Circle[] = [
  {
    id: 'c1',
    name: 'Study Pulse',
    intent: 'study',
    description: 'Daily accountability sessions for serious students.',
    members: 412,
    activeNow: 47,
    hostIds: ['u1'],
    tags: ['focus', 'exam prep', 'quiet'],
    hero: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'c2',
    name: 'Builders Syria',
    intent: 'project',
    description: 'Founders, freelancers and makers shipping weekly.',
    members: 289,
    activeNow: 31,
    hostIds: ['u2'],
    tags: ['startup', 'mvp', 'product'],
    hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'c3',
    name: 'Career Network Room',
    intent: 'networking',
    description: 'Warm intros, mock interviews and profile reviews.',
    members: 351,
    activeNow: 19,
    hostIds: ['u2'],
    tags: ['career', 'networking'],
    hero: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'c4',
    name: 'Walk & Language',
    intent: 'walk',
    description: 'Practice Arabic-English while walking around town.',
    members: 198,
    activeNow: 12,
    hostIds: ['u3'],
    tags: ['walking', 'language exchange'],
    hero: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=1200&q=80&auto=format&fit=crop'
  }
];

export const threads: Thread[] = [
  {
    id: 't1',
    kind: 'group',
    title: 'Algorithms 50m Sprint',
    participantIds: ['u_me', 'u1', 'u3'],
    lastMessage: 'Timer starts in 8 mins.',
    lastMessageAt: new Date(now.getTime() - 5 * 60000).toISOString(),
    unread: 2,
    sessionId: 's1'
  },
  {
    id: 't2',
    kind: 'dm',
    title: 'Rana Almasri',
    participantIds: ['u_me', 'u1'],
    lastMessage: 'Shared the notes in files tab.',
    lastMessageAt: new Date(now.getTime() - 40 * 60000).toISOString(),
    unread: 0
  }
];

export const messages: Message[] = [
  {
    id: 'm1',
    threadId: 't1',
    senderId: 'u1',
    content: 'Today target: 12 graph questions.',
    createdAt: new Date(now.getTime() - 20 * 60000).toISOString(),
    status: 'seen'
  },
  {
    id: 'm2',
    threadId: 't1',
    senderId: 'u_me',
    content: 'Locked in. I will handle shortest-path set first.',
    createdAt: new Date(now.getTime() - 12 * 60000).toISOString(),
    status: 'seen'
  },
  {
    id: 'm3',
    threadId: 't1',
    senderId: 'u3',
    content: 'Timer starts in 8 mins.',
    createdAt: new Date(now.getTime() - 5 * 60000).toISOString(),
    status: 'delivered'
  },
  {
    id: 'm4',
    threadId: 't2',
    senderId: 'u1',
    content: 'Shared the notes in files tab.',
    createdAt: new Date(now.getTime() - 40 * 60000).toISOString(),
    status: 'seen'
  }
];

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'join_accepted',
    title: 'Join accepted',
    body: 'You are in for Founder Sprint tonight.',
    createdAt: new Date(now.getTime() - 30 * 60000).toISOString(),
    read: false,
    route: '/sessions/s2'
  },
  {
    id: 'n2',
    type: 'match_created',
    title: 'Mutual match',
    body: 'Coffee Signal unlocked. Chat is now open.',
    createdAt: new Date(now.getTime() - 90 * 60000).toISOString(),
    read: false,
    route: '/chat/t2'
  },
  {
    id: 'n3',
    type: 'session_reminder',
    title: 'Session reminder',
    body: 'Algorithms sprint starts in 25 minutes.',
    createdAt: new Date(now.getTime() - 120 * 60000).toISOString(),
    read: true,
    route: '/sessions/s1'
  }
];

export const feed: FeedSection[] = [
  { id: 'f1', title: 'Near you now', kind: 'sessions', sessionIds: ['s1', 's2'] },
  { id: 'f2', title: 'Trending circles', kind: 'circles', circleIds: ['c2', 'c1', 'c3'] },
  { id: 'f3', title: 'Intent momentum', kind: 'intent', text: 'Project sessions are up 32% in your city tonight.' }
];

export const premiumPlans: PremiumPlan[] = [
  {
    id: 'plus',
    name: 'Plus',
    price: '$3 / month',
    description: 'More visibility and smarter filters.',
    features: ['Advanced intent filters', '40 joins/day', 'Priority in open sessions']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$7 / month',
    description: 'For founders and professionals with high velocity.',
    features: ['Private pro circles', 'Session analytics', 'Weekly boost credit'],
    highlight: true
  }
];
