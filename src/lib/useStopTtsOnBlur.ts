import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

import { useTtsStore } from '../store/ttsStore';

/**
 * Stops any in-flight speech when this screen loses focus. React
 * Navigation's default tab/stack behavior keeps screens mounted (just
 * hidden) when you navigate away, so unmount alone doesn't catch this —
 * without it, speech can keep talking over a screen you've since left
 * (the same bug the web kiosk's renderView()-cancels-on-render fix
 * addresses, just via a different mechanism since RN doesn't re-render the
 * whole tree on every navigation).
 */
export function useStopTtsOnBlur(): void {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      useTtsStore.getState().stop();
    });
    return unsubscribe;
  }, [navigation]);
}
