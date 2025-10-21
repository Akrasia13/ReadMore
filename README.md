Beta Book-club app. Experimenting with React and Supabase.

## UI Structure

The app now uses `react-router-dom` for page-level routing:

- `/` – Home page (shows basic app UI; prompts sign-in if unauthenticated)
- `/unauthenticated` – Blank-style page with magic link sign-in prompt
- `/admin` – Protected admin dashboard (invitation sending via magic link)

## Authentication Flow

Magic link sign-in using Supabase:
1. User visits `/unauthenticated` (or clicks "Sign In")
2. Enters email -> `sendMagicLink(email)` sends OTP link
3. After following the link in email, session loads and protected routes become accessible

## Key Components

- `src/components/ProtectedRoute.tsx` – Wraps protected routes; redirects to `/unauthenticated` if not signed in
- `src/components/layout/AdminLayout.tsx` – Shared admin layout + header
- `src/pages/Admin/AdminDashboard.tsx` – Admin dashboard embedding `AdminInvite`
- `src/pages/Auth/Unauthenticated.tsx` – Minimal unauthenticated experience + magic link trigger
- `src/pages/Home.tsx` – Placeholder main app area

## Adding New Protected Pages

Create a component under `src/pages/YourArea/YourPage.tsx` then add a route:

```tsx
<Route path="/your-page" element={<ProtectedRoute><YourPage /></ProtectedRoute>} />
```

## Development

```bash
pnpm install
pnpm dev
```

Ensure environment variables exist in `.env` (or via Vite) for Supabase:

```
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Next Ideas

- Role-based admin authorization (currently any authenticated user can reach `/admin`)
- Persist invited emails in a table instead of local state
- Basic library entities & CRUD
- Loading skeletons and error boundaries

## Notes

All pages share a gradient base; consider extracting more shared layout elements as app grows.