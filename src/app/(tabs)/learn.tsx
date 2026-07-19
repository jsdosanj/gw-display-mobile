import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { DetailCard } from '../../components/DetailCard';
import { Colors, Radius, Spacing } from '../../constants/theme';
import { fontFamilies } from '../../lib/fonts';
import { text } from '../../lib/i18n';
import displayContent from '../../shared/display-content';
import { useKioskStore } from '../../store/kioskStore';

function SectionTitle({ children }: { children: string }) {
  return (
    <AppText variant="heading" style={{ marginTop: Spacing.xl, marginBottom: Spacing.sm }}>
      {children}
    </AppText>
  );
}

export default function LearnScreen() {
  const language = useKioskStore((s) => s.language);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);
  const learn = displayContent.learnSikhi;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="display">{t(learn.title)}</AppText>
      <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.md }}>
        {t(learn.intro)}
      </AppText>

      <SectionTitle>{t(learn.introTitle)}</SectionTitle>
      <AppText variant="body" color="cloud200">
        {t(learn.whatIsSikhi)}
      </AppText>
      <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.sm }}>
        {t(learn.founding)}
      </AppText>
      <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.sm }}>
        {t(learn.sevaSimran)}
      </AppText>

      <SectionTitle>{t(learn.pillarsTitle)}</SectionTitle>
      {learn.pillars.map((pillar, i) => (
        <DetailCard key={i} label={t(pillar.term)}>
          {t(pillar.description)}
        </DetailCard>
      ))}

      <SectionTitle>{t(learn.gurdwaraRoomsTitle)}</SectionTitle>
      {learn.gurdwaraRooms.map((room, i) => (
        <DetailCard key={i} label={t(room.name)}>
          {t(room.description)}
        </DetailCard>
      ))}

      <SectionTitle>{t(learn.etiquetteTitle)}</SectionTitle>
      {learn.etiquette.map((item, i) => (
        <DetailCard key={i} label={t(item.title)}>
          {t(item.description)}
        </DetailCard>
      ))}

      <SectionTitle>{t(learn.gurusTitle)}</SectionTitle>
      {learn.gurus.map((guru) => (
        <DetailCard key={guru.order} label={`${guru.order}. ${t(guru.name)} · ${guru.years}`}>
          {t(guru.summary)}
        </DetailCard>
      ))}

      <SectionTitle>{t(learn.guruLineageTitle)}</SectionTitle>
      <AppText variant="body" color="cloud200" style={{ marginBottom: Spacing.sm }}>
        {t(learn.guruLineageIntro)}
      </AppText>
      <View style={styles.lineageList}>
        {learn.gurus.map((guru) => (
          <View key={guru.order} style={styles.lineageRow}>
            <View style={styles.lineageDot} />
            <AppText variant="body" style={{ flex: 1 }}>
              {guru.order}. {t(guru.name)} — {t(guru.relation)}
            </AppText>
          </View>
        ))}
      </View>

      <SectionTitle>{t(learn.sahibzaadeTitle)}</SectionTitle>
      {learn.sahibzaade.map((s, i) => (
        <DetailCard key={i} label={`${t(s.name)} · ${s.years}`}>
          {t(s.summary)}
        </DetailCard>
      ))}

      <SectionTitle>{t(learn.kakaarsTitle)}</SectionTitle>
      <AppText variant="body" color="cloud200" style={{ marginBottom: Spacing.sm }}>
        {t(learn.kakaarsIntro)}
      </AppText>
      {learn.kakaars.map((k, i) => (
        <DetailCard key={i} label={`${t(k.name)} — ${t(k.meaning)}`} tone="fact">
          {t(k.description)}
        </DetailCard>
      ))}

      <SectionTitle>{t(learn.gurbaniTitle)}</SectionTitle>
      <AppText variant="body" color="cloud200" style={{ marginBottom: Spacing.sm }}>
        {t(learn.gurbaniIntro)}
      </AppText>
      {learn.shabads.map((shabad, i) => (
        <View key={i} style={styles.shabadCard}>
          {/* Raw Gurmukhi scripture text — always the Gurmukhi typeface,
              independent of the UI's current language setting. */}
          <AppText variant="subheading" style={{ fontFamily: fontFamilies.gurmukhiSemiBold }}>
            {shabad.gurmukhi}
          </AppText>
          <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.sm }}>
            {t(shabad.translation)}
          </AppText>
          <AppText variant="label" color="gold300" style={{ marginTop: Spacing.sm }}>
            Ang {shabad.ang} · {shabad.raag} · {t(shabad.author)}
          </AppText>
          <AppText variant="label" color="cloud400" style={{ marginTop: Spacing.xs }}>
            {t(shabad.verificationNote)}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  lineageList: { marginTop: Spacing.xs },
  lineageRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  lineageDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.gold400, marginRight: Spacing.sm },
  shabadCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(247,217,137,0.2)',
    backgroundColor: 'rgba(228,187,94,0.05)',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
});
