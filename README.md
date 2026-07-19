# Legacy of the Khalsa — Mobile

Native Android app (React Native + Expo) built for the touchscreen displays
installed at gurdwaras, sharing content and app logic with the web kiosk at
[`jsdosanj/gw-display`](https://github.com/jsdosanj/gw-display).

## Status

Phase 0 (scaffolding) — project structure, lint/typecheck/test tooling, and
an Android build profile are in place. No app screens yet; the shared
content/state port from the web repo lands in Phase 1. See the plan at
`jsdosanj/gw-display`'s repo (`/root/.claude/plans/woolly-hopping-wave.md`
in the session that authored it) for the full phased roadmap.

## Why this exists / distribution model

This app targets gurdwara touchscreen hardware directly — install the built
`.apk` once per device, the same way the current kiosk gets set up on new
hardware. **No Google Play or Apple developer account is required** for
that. Public app-store distribution (so individuals can install it on their
own phones via sikhi.io) is optional future work, not a v1 requirement.

## Development

```bash
npm install
npm run start       # Expo dev server
npm run validate    # lint + typecheck + test — run before every commit
```

## Building the Android APK

```bash
npx eas-cli build --platform android --profile android-apk
```

Produces a directly-installable `.apk` (not a Play Store `.aab`) — see
`eas.json`. Requires a free Expo/EAS account (`npx eas-cli login`), nothing
paid.

## Tooling notes

- `expo lint`'s auto-configure step calls `api.expo.dev`, which is blocked
  in network-sandboxed environments. `npm run lint` runs plain `eslint .`
  against the hand-written `eslint.config.js` instead — no network call.
- Jest is set up via `jest-expo`; see `jest.config.js`.
