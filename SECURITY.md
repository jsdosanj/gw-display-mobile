# Security Policy

This app has no user accounts, no PII, and no login (see the README's
"Why this exists / distribution model" — it's installed directly on
gurdwara-owned touchscreen hardware, not distributed through public app
stores for v1). The only network call it makes is a best-effort, anonymous
analytics ping (device-generated random ID + current screen name) to the
companion web repo's `/api/analytics` endpoint; see `src/lib/analytics.ts`.

## Reporting a Vulnerability

If you find a security issue in this repository (dependency vulnerability,
exposed credential, unsafe handling of the `Linking.openURL()` outbound
links in the Resources screen, etc.), please open a private report via
GitHub's **Security** tab → **Report a vulnerability**, rather than a
public issue. This repo has private vulnerability reporting enabled.

## Supported Versions

Only the `main` branch is maintained; there are no released version
branches to backport fixes to.
