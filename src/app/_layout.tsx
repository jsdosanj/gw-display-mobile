import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Colors } from '../constants/theme';
import { useAppFonts } from '../lib/fonts';
import { useAnalyticsView } from '../lib/useAnalyticsView';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();
  useAnalyticsView();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.night950} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.night950 } }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
