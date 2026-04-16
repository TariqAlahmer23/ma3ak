export type Intent =
  | 'study'
  | 'work'
  | 'project'
  | 'networking'
  | 'outing'
  | 'coffee'
  | 'walk'
  | 'meet';

export type Vibe = 'social' | 'focused' | 'chill' | 'ambitious' | 'spontaneous';

export type PrivacyLevel = 'public' | 'approval' | 'invite' | 'circle';

export type ReliabilitySnapshot = {
  score: number;
  punctuality: number;
  respect: number;
  commitment: number;
  sessionsCompleted: number;
};

export type User = {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  bio: string;
  city: string;
  intents: Intent[];
  vibes: Vibe[];
  reliability: ReliabilitySnapshot;
  verifiedPhone: boolean;
  joinedCircleIds: string[];
};

export type Session = {
  id: string;
  title: string;
  intent: Intent;
  hostId: string;
  vibeTags: Vibe[];
  startsAt: string;
  durationMins: number;
  mode: 'in_person' | 'online';
  capacity: number;
  attendees: string[];
  privacy: PrivacyLevel;
  locationLabel: string;
  note?: string;
  reliabilityRequired?: number;
  circleId?: string;
  cover: string;
};

export type Circle = {
  id: string;
  name: string;
  intent: Intent;
  description: string;
  members: number;
  activeNow: number;
  hostIds: string[];
  tags: string[];
  hero: string;
};

export type JoinRequest = {
  id: string;
  sessionId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
};

export type MatchResult = {
  id: string;
  title: string;
  subtitle: string;
  avatarA: string;
  avatarB: string;
};

export type Message = {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  createdAt: string;
  status: 'sent' | 'delivered' | 'seen';
};

export type Thread = {
  id: string;
  kind: 'group' | 'dm';
  title: string;
  participantIds: string[];
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  sessionId?: string;
};

export type NotificationItem = {
  id: string;
  type: 'join_accepted' | 'match_created' | 'session_reminder' | 'liked_session' | 'invite';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  route: string;
};

export type FeedSection = {
  id: string;
  title: string;
  kind: 'sessions' | 'circles' | 'people' | 'intent';
  sessionIds?: string[];
  circleIds?: string[];
  text?: string;
};

export type FilterState = {
  intents: Intent[];
  vibes: Vibe[];
  timeSlot: 'now' | 'today' | 'tonight' | 'weekend';
};

export type OnboardingProfile = {
  intents: Intent[];
  vibes: Vibe[];
  preferredTimes: Array<'morning' | 'afternoon' | 'evening' | 'late'>;
  privacyComfort: PrivacyLevel;
};

export type PremiumPlan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
};
