import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import GurdwaraSilhouette from '../../assets/content/gurdwara-silhouette.svg';
import SinghSilhouette from '../../assets/content/singh-silhouette.svg';

// Maps the web-repo-style path strings baked into display-content.ts (and a
// few hardcoded elsewhere for maps/banners/rotators) to bundled RN assets.
// Metro can't `require()` a dynamic string, so this lookup table is the one
// adaptation the asset pipeline needs — the content model itself is
// unchanged from the web repo.
//
// The fresco PNG's filename had a middle-dot character that's unsafe for
// native asset pipelines; it was renamed on copy (sikh-fresco-restoration-
// -3-restored.png) and only needs remapping here, not in the content data.

export const imageMap: Record<string, number> = {
  '/assets/images/IMG_3192.jpeg': require('../../assets/content/IMG_3192.jpeg'),
  '/assets/images/IMG_3194.jpeg': require('../../assets/content/IMG_3194.jpeg'),
  '/assets/images/IMG_3196.jpeg': require('../../assets/content/IMG_3196.jpeg'),
  '/assets/images/IMG_3197.jpeg': require('../../assets/content/IMG_3197.jpeg'),
  '/assets/images/IMG_3198.jpeg': require('../../assets/content/IMG_3198.jpeg'),
  '/assets/images/IMG_3199.jpeg': require('../../assets/content/IMG_3199.jpeg'),
  '/assets/images/IMG_3200.jpeg': require('../../assets/content/IMG_3200.jpeg'),
  '/assets/images/IMG_3268.jpeg': require('../../assets/content/IMG_3268.jpeg'),
  '/assets/images/IMG_3269.jpeg': require('../../assets/content/IMG_3269.jpeg'),
  '/assets/images/IMG_3270.jpeg': require('../../assets/content/IMG_3270.jpeg'),
  '/assets/images/IMG_3271.jpeg': require('../../assets/content/IMG_3271.jpeg'),
  '/assets/images/IMG_3272.jpeg': require('../../assets/content/IMG_3272.jpeg'),
  '/assets/images/IMG_8284.jpeg': require('../../assets/content/IMG_8284.jpeg'),
  '/assets/images/panj-pyare-map.jpg': require('../../assets/content/panj-pyare-map.jpg'),
  '/assets/images/five-takht-map.jpg': require('../../assets/content/five-takht-map.jpg'),
  '/assets/images/sikh-fresco-·-restoration-3-restored.png': require('../../assets/content/sikh-fresco-restoration-3-restored.png'),
  '/assets/images/sikhi-io-beliefs-banner-new-4.webp': require('../../assets/content/sikhi-io-beliefs-banner-new-4.webp'),
  '/assets/images/sikhi-io-gurbani-banner.webp': require('../../assets/content/sikhi-io-gurbani-banner.webp'),
  '/assets/images/sikhi-io-gallery-banner.webp': require('../../assets/content/sikhi-io-gallery-banner.webp'),
  '/assets/images/sikhi-io-sangat-banner.webp': require('../../assets/content/sikhi-io-sangat-banner.webp'),
};

// SVG silhouettes resolve to components (react-native-svg-transformer, see
// metro.config.js), not require()'d numeric asset IDs — kept in a separate
// map so callers know which shape they're getting.
export const silhouetteMap: Record<string, FC<SvgProps>> = {
  '/assets/images/gurdwara-silhouette.svg': GurdwaraSilhouette,
  '/assets/images/singh-silhouette.svg': SinghSilhouette,
};

/** Resolves a content-model image path to a bundled raster asset; returns null if unmapped (never renders a broken image). */
export function resolveImage(path: string | undefined): number | null {
  if (!path) {
    return null;
  }
  return imageMap[path] ?? null;
}

/** Resolves a content-model image path to a bundled SVG component, if it is one. */
export function resolveSilhouette(path: string | undefined): FC<SvgProps> | null {
  if (!path) {
    return null;
  }
  return silhouetteMap[path] ?? null;
}
