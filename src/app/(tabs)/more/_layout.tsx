import { Stack } from 'expo-router';

import { Colors } from '../../../constants/theme';
import { useThemeColors } from '../../../lib/useThemeColors';

export default function MoreStackLayout() {
  const themeColors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.night900 },
        headerTitleStyle: { color: Colors.white },
        headerTintColor: themeColors.gold300,
        contentStyle: { backgroundColor: Colors.night950 },
      }}>
      <Stack.Screen name="index" options={{ title: 'More' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="resources" options={{ title: 'Resources' }} />
      <Stack.Screen name="leaflets" options={{ title: 'Leaflets' }} />
      <Stack.Screen name="theme" options={{ title: 'Theme' }} />
    </Stack>
  );
}
