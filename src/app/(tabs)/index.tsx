import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { ThemeAtmosphere } from '../../components/ThemeAtmosphere';
import { Colors, Radius, Spacing } from '../../constants/theme';
import { text } from '../../lib/i18n';
import { resolveImage } from '../../shared/imageMap';
import { useKioskStore } from '../../store/kioskStore';
import displayContent from '../../shared/display-content';
import type { View as ViewName } from '../../shared/display';

const tabRoutes: Partial<Record<ViewName, string>> = {
  pyare: '/(tabs)/pyare',
  takhts: '/(tabs)/takhts',
  quiz: '/(tabs)/quiz',
  learn: '/(tabs)/learn',
};

export default function HomeScreen() {
  const language = useKioskStore((s) => s.language);
  const t = (value: Parameters<typeof text>[0]) => text(value, language);
  const home = displayContent.home;

  return (
    <View style={styles.screen}>
      <ThemeAtmosphere />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <AppText variant="label" color="gold300">
            {t(home.collaborationBanner)}
          </AppText>
        </View>

        <AppText variant="display" style={styles.heroTitle}>
          {t(home.heroTitle)}
        </AppText>
        <AppText variant="body" color="cloud200" style={styles.heroDescription}>
          {t(home.heroDescription)}
        </AppText>

        <AppText variant="heading" style={styles.sectionTitle}>
          {t(home.differentiationTitle)}
        </AppText>
        <AppText variant="body" color="cloud200" style={styles.sectionBody}>
          {t(home.differentiationDescription)}
        </AppText>

        <View style={styles.cardRow}>
          {home.differentiationCards.map((card) => {
            const image = resolveImage(card.imagePath);
            return (
              <Pressable
                key={card.id}
                onPress={() => router.push(tabRoutes[card.id] as never)}
                style={styles.diffCard}>
                {image ? <Image source={image} style={styles.diffCardImage} /> : null}
                <View style={styles.diffCardBody}>
                  <AppText variant="subheading">{t(card.title)}</AppText>
                  <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
                    {t(card.description)}
                  </AppText>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.featureGrid}>
          {home.featureCards.map((feature) => (
            <Pressable
              key={feature.id}
              onPress={() => {
                const route = tabRoutes[feature.id];
                if (route) {
                  router.push(route as never);
                }
              }}
              style={styles.featureCard}>
              <AppText style={{ fontSize: 28 }}>{feature.icon}</AppText>
              <AppText variant="eyebrow" color="gold300" style={{ marginTop: Spacing.sm }}>
                {t(feature.eyebrow)}
              </AppText>
              <AppText variant="subheading" style={{ marginTop: Spacing.xs }}>
                {t(feature.title)}
              </AppText>
              <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
                {t(feature.description)}
              </AppText>
              <AppText variant="label" color="gold300" style={{ marginTop: Spacing.sm }}>
                {t(feature.cta)} →
              </AppText>
            </Pressable>
          ))}
        </View>

        <AppText variant="heading" style={styles.sectionTitle}>
          {t(displayContent.ui.labels.timelineTitle)}
        </AppText>
        <View style={styles.timeline}>
          {displayContent.timeline.map((event, index) => (
            <View key={`${event.year}-${index}`} style={styles.timelineRow}>
              <View style={styles.timelineYearCol}>
                <AppText variant="label" color="gold300">
                  {event.year}
                </AppText>
                <View style={styles.timelineDot} />
              </View>
              <View style={styles.timelineBody}>
                <AppText variant="subheading">{t(event.title)}</AppText>
                <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
                  {t(event.description)}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  banner: {
    backgroundColor: 'rgba(228,187,94,0.12)',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  heroTitle: { marginBottom: Spacing.md },
  heroDescription: { marginBottom: Spacing.lg },
  sectionTitle: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
  sectionBody: { marginBottom: Spacing.md },
  cardRow: { gap: Spacing.md, marginBottom: Spacing.lg },
  diffCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.night900,
    borderWidth: 1,
    borderColor: 'rgba(247,217,137,0.15)',
  },
  diffCardImage: { width: '100%', height: 140 },
  diffCardBody: { padding: Spacing.md },
  featureGrid: { gap: Spacing.md, marginBottom: Spacing.lg },
  featureCard: {
    borderRadius: Radius.lg,
    backgroundColor: Colors.night900,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: Spacing.md,
  },
  timeline: { marginTop: Spacing.sm },
  timelineRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.lg },
  timelineYearCol: { width: 64, alignItems: 'center' },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gold400,
    marginTop: Spacing.xs,
  },
  timelineBody: { flex: 1 },
});
