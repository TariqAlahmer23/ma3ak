import type { Intent } from '@/types/domain';

export type LiveEntityType = 'user' | 'group' | 'session';

export type LiveMapEntity = {
  id: string;
  type: LiveEntityType;
  title: string;
  activity: string;
  intent: Intent;
  peopleCount: number;
  lng: number;
  lat: number;
  avatars: string[];
  isLive: boolean;
};

export const liveMapEntities: LiveMapEntity[] = [
  {
    id: 'm_user_1',
    type: 'user',
    title: 'Rana nearby',
    activity: 'Open to focused study sprint',
    intent: 'study',
    peopleCount: 1,
    lng: 36.2731,
    lat: 33.5159,
    avatars: ['https://i.pravatar.cc/200?img=5'],
    isLive: true
  },
  {
    id: 'm_user_2',
    type: 'user',
    title: 'Kareem nearby',
    activity: 'Looking for coworking block',
    intent: 'work',
    peopleCount: 1,
    lng: 36.2689,
    lat: 33.5182,
    avatars: ['https://i.pravatar.cc/200?img=18'],
    isLive: true
  },
  {
    id: 'm_group_1',
    type: 'group',
    title: 'Builders Cluster',
    activity: '3 founders planning MVP milestones',
    intent: 'project',
    peopleCount: 3,
    lng: 36.282,
    lat: 33.5137,
    avatars: ['https://i.pravatar.cc/200?img=18', 'https://i.pravatar.cc/200?img=32', 'https://i.pravatar.cc/200?img=41'],
    isLive: true
  },
  {
    id: 'm_group_2',
    type: 'group',
    title: 'Language Walk Group',
    activity: '4 people walking + language exchange',
    intent: 'walk',
    peopleCount: 4,
    lng: 36.2894,
    lat: 33.5098,
    avatars: ['https://i.pravatar.cc/200?img=28', 'https://i.pravatar.cc/200?img=17', 'https://i.pravatar.cc/200?img=13'],
    isLive: true
  },
  {
    id: 'm_session_1',
    type: 'session',
    title: 'Deep Focus: Algorithms',
    activity: '50m concentration sprint starts now',
    intent: 'study',
    peopleCount: 4,
    lng: 36.2769,
    lat: 33.5119,
    avatars: ['https://i.pravatar.cc/200?img=5', 'https://i.pravatar.cc/200?img=11', 'https://i.pravatar.cc/200?img=28'],
    isLive: true
  },
  {
    id: 'm_session_2',
    type: 'session',
    title: 'Networking Coffee Circle',
    activity: 'Warm intros + fast peer connects',
    intent: 'networking',
    peopleCount: 5,
    lng: 36.2665,
    lat: 33.5125,
    avatars: ['https://i.pravatar.cc/200?img=14', 'https://i.pravatar.cc/200?img=33', 'https://i.pravatar.cc/200?img=22'],
    isLive: true
  },
  {
    id: 'm_session_3',
    type: 'session',
    title: 'Startup Night Sprint',
    activity: 'Live pitch deck polish + feedback',
    intent: 'project',
    peopleCount: 6,
    lng: 36.2845,
    lat: 33.5196,
    avatars: ['https://i.pravatar.cc/200?img=48', 'https://i.pravatar.cc/200?img=52', 'https://i.pravatar.cc/200?img=7'],
    isLive: true
  },
  {
    id: 'm_user_3',
    type: 'user',
    title: 'Maya nearby',
    activity: 'Free now for quick coffee meetup',
    intent: 'coffee',
    peopleCount: 1,
    lng: 36.2813,
    lat: 33.5078,
    avatars: ['https://i.pravatar.cc/200?img=44'],
    isLive: true
  }
];
