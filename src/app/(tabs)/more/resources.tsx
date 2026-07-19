import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/AppText';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { text } from '../../../lib/i18n';
import displayContent from '../../../shared/display-content';
import { useKioskStore } from '../../../store/kioskStore';

export default function ResourcesScreen() {
  const language = useKioskStore((s) => s.language);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);
  const resources = displayContent.resources;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="display">{t(resources.title)}</AppText>
      <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.md, marginBottom: Spacing.lg }}>
        {t(resources.intro)}
      </AppText>

      {resources.sites.map((site) => (
        <Pressable key={site.id} onPress={() => Linking.openURL(site.url)} style={styles.card}>
          <AppText variant="subheading">{t(site.previewTitle)}</AppText>
          <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
            {t(site.previewDescription)}
          </AppText>
          <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.sm }}>
            {t(site.details)}
          </AppText>
          <View style={styles.linkRow}>
            <AppText variant="label" color="gold300">
              {site.url} ↗
            </AppText>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: Colors.night900,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  linkRow: { marginTop: Spacing.sm },
});
