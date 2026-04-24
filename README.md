# PRIMAL // STUDIO

Local-first creative workspace for the Primal tribe. Each machine picks a seat, authenticates with Google, and gets a shared view of the studio's Drive, activity, and files.

## Development

```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # production bundle
```

## Deployment

Vercel auto-deploys `main` to `studio.primal-lifestyle.com`. Build hash is injected via `VITE_BUILD_HASH`.

## Phase Status

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Scaffold | done |
| 1 | Shell + Seat Picker | pending |
| 2 | Google OAuth + Drive | pending |
| 3 | Realtime + Activity | pending |
| 4 | Uploads | pending |
| 5 | Tags + Pins | pending |
| 6 | BACKBONE iframe | pending |
| 7 | Polish | pending |
