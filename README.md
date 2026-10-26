# Screenshot Exact

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c392a48e-6733-4ad5-8923-835d9480c1ba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploying (Vercel)

This is a plain Vite + React single-page app (React Router for client-side routing).

- Build: `vite build` → static files in `dist/`
- `vercel.json` rewrites every path to `index.html`, so deep links like `/app` work.
- Routes: `/` (landing), `/sign-in`, `/sign-up`, `/app` (signed-in only).
- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel → Settings → Environment Variables.

## Backend (Supabase)

The app talks to its own Supabase project (`kdrvavliktkrvxhjqhsg`).
The client in `src/integrations/supabase/client.ts` reads only these two env vars:

| Variable | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://kdrvavliktkrvxhjqhsg.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | the project's `sb_publishable_…` key (browser-safe, RLS-gated; replaces the old anon key) |

Locally they come from `.env`. On Vercel, add both for Production, Preview and Development.
