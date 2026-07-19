import { Linking, Pressable, ScrollView, StyleSheet } from 'react-native';

import { AppText } from '../../../components/AppText';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { text } from '../../../lib/i18n';
import displayContent from '../../../shared/display-content';
import { useKioskStore } from '../../../store/kioskStore';

export default function LeafletsScreen() {
  const language = useKioskStore((s) => s.language);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);
  const leaflets = displayContent.leaflets;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="display">{t(leaflets.title)}</AppText>
      <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.md, marginBottom: Spacing.lg }}>
        {t(leaflets.intro)}
      </AppText>

      <Pressable onPress={() => Linking.openURL(leaflets.hubUrl)} style={styles.button}>
        <AppText color="night950" style={{ fontWeight: '700' }}>
          {t(leaflets.cta)}
        </AppText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  button: {
    backgroundColor: Colors.gold400,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
});
