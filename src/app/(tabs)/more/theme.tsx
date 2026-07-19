import { FlatList, Pressable, StyleSheet } from 'react-native';

import { AppText } from '../../../components/AppText';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { text } from '../../../lib/i18n';
import { useThemeColors } from '../../../lib/useThemeColors';
import displayContent from '../../../shared/display-content';
import { useKioskStore } from '../../../store/kioskStore';

export default function ThemePickerScreen() {
  const language = useKioskStore((s) => s.language);
  const themeId = useKioskStore((s) => s.themeId);
  const setTheme = useKioskStore((s) => s.setTheme);
  const themeColors = useThemeColors();

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={displayContent.themes}
      keyExtractor={(theme) => theme.id}
      renderItem={({ item: theme }) => {
        const active = theme.id === themeId;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => setTheme(theme.id)}
            style={[
              styles.row,
              active && { borderColor: themeColors.gold400, backgroundColor: 'rgba(228,187,94,0.08)' },
            ]}>
            <AppText style={{ fontSize: 22 }}>{theme.icon}</AppText>
            <AppText variant="subheading" style={{ marginLeft: Spacing.md, flex: 1 }}>
              {text(theme.label, language)}
            </AppText>
            {active ? <AppText color="gold300">✓</AppText> : null}
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md },
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
