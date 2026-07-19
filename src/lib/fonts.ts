// Bundled font weights, loaded once at app startup (see src/app/_layout.tsx)
// via expo-font's useFonts. All three families are Google Fonts distributed
// under OFL/MIT through the @expo-google-fonts packages — no licensing
// concerns embedding them in the app binary.
import { Cinzel_600SemiBold, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import {
  MuktaMahee_400Regular,
  MuktaMahee_600SemiBold,
  MuktaMahee_700Bold,
} from '@expo-google-fonts/mukta-mahee';
import { useFonts } from 'expo-font';

export const fontFamilies = {
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  displaySemiBold: 'Cinzel_600SemiBold',
  displayBold: 'Cinzel_700Bold',
  gurmukhiRegular: 'MuktaMahee_400Regular',
  gurmukhiSemiBold: 'MuktaMahee_600SemiBold',
  gurmukhiBold: 'MuktaMahee_700Bold',
} as const;

/** Returns [fontsLoaded, fontError] — gate splash-screen dismissal on fontsLoaded. */
export function useAppFonts(): [boolean, Error | null] {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Cinzel_600SemiBold,
    Cinzel_700Bold,
    MuktaMahee_400Regular,
    MuktaMahee_600SemiBold,
    MuktaMahee_700Bold,
  });
  return [loaded, error ?? null];
}
