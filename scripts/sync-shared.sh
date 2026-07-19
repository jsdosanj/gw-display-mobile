#!/usr/bin/env bash
# Syncs src/shared/ from the web repo (jsdosanj/gw-display), the source of
# truth for content/types/state. Run this after editing content on the web
# side; CI (.github/workflows/validate.yml) fails the build if this drifts,
# so it can't be silently forgotten.
#
# Usage: scripts/sync-shared.sh /path/to/local/gw-display/checkout
set -euo pipefail

WEB_REPO="${1:?Usage: scripts/sync-shared.sh /path/to/gw-display/checkout}"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/src/shared"

if [ ! -f "$WEB_REPO/src/data/display-content.ts" ]; then
  echo "error: $WEB_REPO doesn't look like a gw-display checkout (missing src/data/display-content.ts)" >&2
  exit 1
fi

cp "$WEB_REPO/src/data/display-content.ts" "$DEST/display-content.ts"
cp "$WEB_REPO/src/types/display.ts" "$DEST/display.ts"
cp "$WEB_REPO/src/lib/kiosk-state.ts" "$DEST/kiosk-state.ts"
cp "$WEB_REPO/src/lib/kiosk-state.test.ts" "$DEST/kiosk-state.test.ts"

# Flatten the web repo's ../types / ../data relative imports to this
# directory's flat layout.
sed -i.bak "s|from '../types/display'|from './display'|" "$DEST/display-content.ts" "$DEST/kiosk-state.ts"
sed -i.bak "s|from '../data/display-content'|from './display-content'|" "$DEST/kiosk-state.test.ts"

# The web repo's test file imports Jest-API-compatible globals from Vitest;
# this repo uses Jest, which provides the same globals ambiently.
sed -i.bak "/^import { describe, expect, it } from 'vitest';$/d" "$DEST/kiosk-state.test.ts"

rm -f "$DEST"/*.bak

echo "Synced. Review the diff, then run 'npm run validate' before committing."
