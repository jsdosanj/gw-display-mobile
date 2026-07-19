import { Stack } from 'expo-router';

import { Colors } from '../../../constants/theme';

export default function TakhtsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.night900 },
        headerTitleStyle: { color: Colors.white },
        headerTintColor: Colors.gold300,
        contentStyle: { backgroundColor: Colors.night950 },
      }}>
      <Stack.Screen name="index" options={{ title: 'Panj Takht' }} />
      <Stack.Screen name="[id]" options={{ title: '' }} />
    </Stack>
  );
}
