import { Stack } from 'expo-router';

import { Colors } from '../../../constants/theme';

export default function MoreStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.night900 },
        headerTitleStyle: { color: Colors.white },
        headerTintColor: Colors.gold300,
        contentStyle: { backgroundColor: Colors.night950 },
      }}>
      <Stack.Screen name="index" options={{ title: 'More' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="resources" options={{ title: 'Resources' }} />
      <Stack.Screen name="leaflets" options={{ title: 'Leaflets' }} />
    </Stack>
  );
}
