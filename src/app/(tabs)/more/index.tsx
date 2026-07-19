import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/AppText';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { viewIcons } from '../../../lib/i18n';

const rows: {
  icon: string;
  title: string;
  route: '/(tabs)/more/about' | '/(tabs)/more/resources' | '/(tabs)/more/leaflets' | '/(tabs)/more/theme';
}[] = [
  { icon: viewIcons.about, title: 'About', route: '/(tabs)/more/about' },
  { icon: viewIcons.resources, title: 'Resources', route: '/(tabs)/more/resources' },
  { icon: viewIcons.leaflets, title: 'Leaflets', route: '/(tabs)/more/leaflets' },
  { icon: '🎨', title: 'Theme', route: '/(tabs)/more/theme' },
];

export default function MoreMenuScreen() {
  return (
    <View style={styles.screen}>
      {rows.map((row) => (
        <Pressable key={row.route} onPress={() => router.push(row.route)} style={styles.row}>
          <AppText style={{ fontSize: 22 }}>{row.icon}</AppText>
          <AppText variant="subheading" style={{ marginLeft: Spacing.md, flex: 1 }}>
            {row.title}
          </AppText>
          <AppText color="cloud400">›</AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950, padding: Spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.night900,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
});
