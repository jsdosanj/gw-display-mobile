import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';

import { sendAnalyticsPing } from './analytics';
import type { View } from '../shared/display';

function pathnameToView(pathname: string): View | null {
  if (pathname === '/' || pathname === '/index') return 'home';
  if (pathname.startsWith('/pyare')) return 'pyare';
  if (pathname.startsWith('/takhts')) return 'takhts';
  if (pathname.startsWith('/quiz')) return 'quiz';
  if (pathname.startsWith('/learn')) return 'learn';
  if (pathname.startsWith('/more/about')) return 'about';
  if (pathname.startsWith('/more/resources')) return 'resources';
  if (pathname.startsWith('/more/leaflets')) return 'leaflets';
  return null;
}

// Pings once per distinct view reached (not on every param change within a
// view, e.g. switching between Pyare profiles) — mirrors the web kiosk's
// render()-level "viewChanging" gate on sendAnalyticsPing.
export function useAnalyticsView(): void {
  const pathname = usePathname();
  const lastView = useRef<View | null>(null);

  useEffect(() => {
    const view = pathnameToView(pathname);
    if (view && view !== lastView.current) {
      lastView.current = view;
      void sendAnalyticsPing(view, 'view');
    }
  }, [pathname]);
}
