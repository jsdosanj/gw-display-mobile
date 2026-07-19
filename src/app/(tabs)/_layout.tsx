import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { Colors } from '../../constants/theme';
import { viewIcons } from '../../lib/i18n';
import { useKioskStore } from '../../store/kioskStore';

function TabIcon({ glyph, focused }: { glyph: string; focused: boolean }) {
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.6 }}>{glyph}</Text>;
}

export default function TabsLayout() {
  const language = useKioskStore((s) => s.language);
  const setLanguage = useKioskStore((s) => s.setLanguage);

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.night900 },
        headerTitleStyle: { color: Colors.white },
        headerTintColor: Colors.gold300,
        headerRight: () => (
          <Text
            accessibilityRole="button"
            accessibilityLabel={language === 'pa' ? 'Switch to English' : 'ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲੋ'}
            onPress={() => setLanguage(language === 'pa' ? 'en' : 'pa')}
            style={{
              color: Colors.gold300,
              fontWeight: '600',
              marginRight: 16,
              paddingVertical: 6,
              paddingHorizontal: 4,
            }}>
            {language === 'pa' ? 'EN' : 'ਪੰਜਾਬੀ'}
          </Text>
        ),
        tabBarStyle: { backgroundColor: Colors.night900, borderTopColor: Colors.night800 },
        tabBarActiveTintColor: Colors.gold300,
        tabBarInactiveTintColor: Colors.cloud500,
        tabBarLabelStyle: { fontSize: 11 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: language === 'pa' ? 'ਘਰ' : 'Home',
          tabBarIcon: ({ focused }) => <TabIcon glyph={viewIcons.home} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="pyare"
        options={{
          title: 'Panj Pyare',
          tabBarIcon: ({ focused }) => <TabIcon glyph={viewIcons.pyare} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="takhts"
        options={{
          title: 'Panj Takht',
          tabBarIcon: ({ focused }) => <TabIcon glyph={viewIcons.takhts} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: language === 'pa' ? 'ਕੁਇਜ਼' : 'Quiz',
          tabBarIcon: ({ focused }) => <TabIcon glyph={viewIcons.quiz} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: language === 'pa' ? 'ਸਿੱਖੋ' : 'Learn',
          tabBarIcon: ({ focused }) => <TabIcon glyph={viewIcons.learn} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: language === 'pa' ? 'ਹੋਰ' : 'More',
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.6 }}>⋯</Text>,
        }}
      />
    </Tabs>
  );
}
