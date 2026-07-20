# Legacy of the Khalsa — Mobile

Native Android app (React Native + Expo) built for the touchscreen displays
installed at gurdwaras, sharing content and app logic with the web kiosk at
[`jsdosanj/gw-display`](https://github.com/jsdosanj/gw-display).

## Status

Full feature parity with the web kiosk is implemented: Home, Panj Pyare,
Panj Takht, Quiz, Learn Sikhi, About/Resources/Leaflets, bilingual EN/PA,
seasonal theming, text-to-speech, and anonymous device analytics. Remaining
work is release packaging (Phase 9): a real EAS build, on-device testing on
actual gurdwara hardware, and cutting the first GitHub Release. See the plan
at `jsdosanj/gw-display`'s repo (`/root/.claude/plans/woolly-hopping-wave.md`
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

Builds run automatically via [`.github/workflows/eas-build.yml`](.github/workflows/eas-build.yml)
on every push to `main` (`android-apk` profile), authenticated with an
`EXPO_TOKEN` repository secret — no local machine or CLI login needed. You
can also trigger a build manually from the Actions tab (`workflow_dispatch`),
which lets you pick `android-apk` or `production` (Play Store `.aab`).
Find the finished `.apk` under **Build on EAS** in the workflow run's logs,
or on the [EAS dashboard](https://expo.dev/accounts/jdosan3645s-team/projects/jasvant/builds).

To build locally instead:

```bash
npx eas-cli build --platform android --profile android-apk
```

Produces a directly-installable `.apk` (not a Play Store `.aab`) — see
`eas.json`. Requires a free Expo/EAS account (`npx eas-cli login`), nothing
paid. EAS builds against `app.json`'s `android.package`
(`io.sikhi.legacyofthekhalsa`); as long as that stays unchanged and builds
keep using EAS's own managed keystore (the default — nothing to configure),
every future build signs consistently and installs as an in-place update
rather than requiring an uninstall first.

## Installing on a gurdwara touchscreen device

One-time setup per device, same effort as setting up the existing
browser-based kiosk:

1. Download the latest `.apk` from this repo's
   [GitHub Releases](https://github.com/jsdosanj/gw-display-mobile/releases)
   page onto the device (or transfer it via USB/local network).
2. Open the file. Android will show an **"install blocked" / "install from
   unknown sources"** warning — this is expected for any APK not installed
   via the Play Store, not a sign of a broken or unsafe file. Allow the
   install for that source when prompted.
3. Launch "Legacy of the Khalsa" and confirm content loads in both English
   and Punjabi. No sign-in, account, or network configuration is required —
   the app works fully offline apart from the anonymous analytics ping (see
   below), which fails silently if there's no connection.
4. Set the device/OS to auto-launch the app on boot and keep the screen
   awake, using whatever mechanism the touchscreen's Android build provides
   (kiosk-mode launcher, MDM profile, or a simple "app pinning" setting) —
   this repo doesn't manage that, since it's device-specific.

**Updating an existing device**: repeat step 1–2 with the new release's
`.apk`. Because every build is signed with the same EAS-managed keystore,
installing over the existing app preserves it as an update (no need to
uninstall first, no data loss for the persisted language/theme choice).

**Orientation note**: `app.json` intentionally does not lock orientation
(`"orientation": "default"`) since the exact mounting of gurdwara touchscreen
hardware wasn't confirmed while building this app. If a given installation
is portrait- or landscape-only, that can be locked down in `app.json` later
once real hardware is confirmed.

## Analytics

The app sends an anonymous, best-effort ping (device-generated random ID,
current view, `platform: "android"`) to the same Cloudflare Workers
endpoint the web kiosk uses, so a gurdwara running both a browser kiosk and
this app can see aggregate traffic across both. No PII is collected; a
failed or offline ping is silently ignored. See `src/lib/analytics.ts`.

## Tooling notes

- `expo lint`'s auto-configure step calls `api.expo.dev`, which is blocked
  in network-sandboxed environments. `npm run lint` runs plain `eslint .`
  against the hand-written `eslint.config.js` instead — no network call.
- Jest is set up via `jest-expo`; see `jest.config.js`.
