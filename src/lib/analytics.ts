// Aggregate-only, no-PII analytics — mirrors the web kiosk's
// sendAnalyticsPing()/getKioskAnalyticsId() (src/scripts/kiosk.ts in
// jsdosanj/gw-display): a random device ID generated once and persisted,
// never tied to a visitor, sent to the same deployed Workers endpoint with
// an added `platform` field so gurdwaras can distinguish device types.
// Best-effort only — any failure here must never affect the app experience.
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { View } from '../shared/display';

const ANALYTICS_ENDPOINT = 'https://gw-display.jasvant-dosanjh.workers.dev/api/analytics';
const DEVICE_ID_KEY = 'khalsa-display-device-id';

let cachedDeviceId: string | null = null;

async function getDeviceId(): Promise<string> {
  if (cachedDeviceId) {
    return cachedDeviceId;
  }
  try {
    const existing = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (existing) {
      cachedDeviceId = existing;
      return existing;
    }
    const generated = Crypto.randomUUID();
    await AsyncStorage.setItem(DEVICE_ID_KEY, generated);
    cachedDeviceId = generated;
    return generated;
  } catch {
    return 'unknown';
  }
}

export async function sendAnalyticsPing(view: View, event: 'view' | 'heartbeat' = 'view'): Promise<void> {
  try {
    const deviceId = await getDeviceId();
    await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kioskId: deviceId, view, event, platform: Platform.OS }),
    });
  } catch {
    // Analytics must never break the app — swallow any failure.
  }
}
