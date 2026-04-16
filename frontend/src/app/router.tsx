import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { AuthGatePage } from '@/pages/AuthGatePage';
import { ChatPage } from '@/pages/ChatPage';
import { CircleDetailPage } from '@/pages/CircleDetailPage';
import { CreateSessionPage } from '@/pages/CreateSessionPage';
import { EditPreferencesPage } from '@/pages/EditPreferencesPage';
import { GuestExplorePage } from '@/pages/GuestExplorePage';
import { MapPage } from '@/pages/MapPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { PremiumPage } from '@/pages/PremiumPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SavedPage } from '@/pages/SavedPage';
import { SessionDetailPage } from '@/pages/SessionDetailPage';
import { SessionsGroupsPage } from '@/pages/SessionsGroupsPage';
import { SplashPage } from '@/pages/SplashPage';
import { SwipePage } from '@/pages/SwipePage';
import { WelcomePage } from '@/pages/WelcomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'landing', element: <SplashPage /> },
      { path: 'welcome', element: <WelcomePage /> },
      { path: 'guest', element: <GuestExplorePage /> },
      { path: 'home', element: <MapPage /> },
      { path: 'map', element: <Navigate to="/home" replace /> },
      { path: 'sessions', element: <SessionsGroupsPage /> },
      { path: 'match', element: <SwipePage /> },
      { path: 'swipe', element: <Navigate to="/match" replace /> },
      { path: 'explore/sessions', element: <Navigate to="/sessions" replace /> },
      { path: 'explore/circles', element: <Navigate to="/sessions" replace /> },
      { path: 'sessions/:id', element: <SessionDetailPage /> },
      { path: 'circles/:id', element: <CircleDetailPage /> },
      { path: 'create', element: <CreateSessionPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'chat/:threadId', element: <ChatPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile/:handle', element: <ProfilePage /> },
      { path: 'profile/me/edit-preferences', element: <EditPreferencesPage /> },
      { path: 'premium', element: <PremiumPage /> },
      { path: 'saved', element: <SavedPage /> },
      { path: 'auth', element: <AuthGatePage /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <Navigate to="/404" replace /> }
    ]
  }
]);
