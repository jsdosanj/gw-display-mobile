import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/AppText';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { text } from '../../../lib/i18n';
import displayContent from '../../../shared/display-content';
import { useKioskStore } from '../../../store/kioskStore';

export default function AboutScreen() {
  const language = useKioskStore((s) => s.language);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);
  const about = displayContent.about;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="display">{t(about.title)}</AppText>

      <View style={styles.card}>
        <AppText variant="body" color="cloud200">
          {t(about.collaboration)}
        </AppText>
        <AppText variant="eyebrow" color="gold300" style={{ marginTop: Spacing.md }}>
          {t(about.contributorsLabel)}
        </AppText>
        <View style={styles.chipRow}>
          {about.contributors.map((name) => (
            <View key={name} style={styles.chip}>
              <AppText variant="label" color="cloud200">
                {name}
              </AppText>
            </View>
          ))}
        </View>
      </View>

      <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.md }}>
        {t(about.partnerships)}
      </AppText>
      <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.sm }}>
        {t(about.futureUpdates)}
      </AppText>

      <View style={styles.principleGrid}>
        {about.principles.map((principle, i) => (
          <View key={i} style={styles.principleCard}>
            <AppText variant="subheading">{t(principle.title)}</AppText>
            <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
              {t(principle.description)}
            </AppText>
          </View>
        ))}
      </View>

      <AppText variant="heading" style={{ marginTop: Spacing.xl, marginBottom: Spacing.sm }}>
        {t(displayContent.ui.labels.faqTitle)}
      </AppText>
      {displayContent.faq.map((item, i) => {
        const open = openFaq === i;
        return (
          <Pressable key={i} onPress={() => setOpenFaq(open ? null : i)} style={styles.faqRow}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AppText variant="body" style={{ flex: 1 }}>
                {t(item.question)}
              </AppText>
              <AppText color="gold300">{open ? '−' : '+'}</AppText>
            </View>
            {open ? (
              <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.sm }}>
                {t(item.answer)}
              </AppText>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  card: {
    marginTop: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(247,217,137,0.2)',
    backgroundColor: 'rgba(228,187,94,0.06)',
    padding: Spacing.md,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginTop: Spacing.sm },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(247,217,137,0.25)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  principleGrid: { marginTop: Spacing.lg },
  principleCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: Colors.night900,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  faqRow: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: Colors.night900,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
});
