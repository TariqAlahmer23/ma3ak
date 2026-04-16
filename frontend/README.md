# MA3AK Frontend (React + Vite + TypeScript)

Frontend-only, mobile-first product demo for **MA3AK** with mock data, local state, and production-ready architecture boundaries for future backend integration.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Zustand
- i18next (EN/AR + RTL)
- PWA shell via static `manifest.webmanifest` + `sw.js`

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Environment

Create `.env` (or copy from `.env.example`):

```bash
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
VITE_MAPBOX_STYLE_URL=mapbox://styles/mapbox/navigation-night-v1
```

- `VITE_MAPBOX_ACCESS_TOKEN` is required for the live Mapbox map.
- `VITE_MAPBOX_STYLE_URL` is optional; change it to any custom Mapbox style URL.

## App Structure

```text
src/
  app/                # Router/bootstrap
  layouts/            # Main app shell + mobile nav
  pages/              # Route-level screens
  components/
    ui/               # Primitives (sheet, filters, badges...)
    cards/            # Session/circle/swipe cards
    chat/             # Chat bubble/typing
    profile/          # Profile summary blocks
    premium/          # Premium cards
    navigation/       # Bottom navigation
    states/           # Empty/skeleton states
  data/mock/          # Seed content and selectors
  store/              # Zustand state and actions
  hooks/              # Auth gate, swipe deck, locale/theme hooks
  repositories/       # Mock adapter interfaces for backend swap
  i18n/               # EN/AR dictionaries + i18n init
  types/              # Shared domain models
  utils/              # Helpers + tokens
```

## Routes Included

- `/` redirects to map home
- `/landing` Splash
- `/welcome` Onboarding
- `/guest` Guest explore
- `/home` Map (core screen)
- `/sessions` Sessions/Groups (core screen)
- `/match` Match swipe (core screen)
- `/sessions/:id`
- `/circles/:id`
- `/create`
- `/messages`
- `/chat/:threadId`
- `/notifications`
- `/profile/:handle`
- `/profile/me/edit-preferences`
- `/premium`
- `/saved`
- `/auth` OTP mock gate

## Mock Data

Main seed data lives in:

- `src/data/mock/index.ts`

This includes users, sessions, circles, chat threads/messages, notifications, feed sections, and premium plans.

## State and Product Flow Simulation

State is in `src/store/useAppStore.ts` and simulates:

- Guest mode browsing with action-level auth gating
- Mock OTP login
- Onboarding preference capture
- Session joining/saving/liking
- Swipe + match success modal
- Group/DM chat state
- Notifications read state
- Theme and locale persistence

## Backend Integration (What to Replace Later)

The following files define adapter boundaries to replace mock logic with API calls:

- `src/repositories/authRepository.ts`
- `src/repositories/sessionRepository.ts`
- `src/repositories/circleRepository.ts`
- `src/repositories/chatRepository.ts`
- `src/repositories/notificationRepository.ts`

### Suggested production migration

1. Replace each repository implementation with API clients.
2. Keep UI and page components unchanged; only swap repository internals and store actions.
3. Move OTP from mock (`1111`) to real provider.
4. Replace static seed IDs with backend IDs.
5. Add real-time transport for chat and notifications.

## PWA Shell

Manifest and service worker integration are configured in `vite.config.ts`.
Current scope is shell installability and static asset support, not full offline-first sync.

## React Native Readiness Notes

The UI is split into reusable components and route screens with minimal DOM-specific logic.
When migrating to React Native:

1. Keep domain types/store/repositories intact.
2. Replace page + component layers with RN equivalents.
3. Reuse state, product flows, and adapter interfaces.

## Production Hardening Checklist

- Add robust form validation
- Add analytics and event instrumentation
- Add accessibility audit pass (screen reader + keyboard)
- Replace image URLs with controlled CDN assets
- Add test suite (unit/integration/e2e)
- Add security/privacy consent + policy screens
