import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/AppText';
import { ChapterBar } from '../../../components/ChapterBar';
import { DetailCard } from '../../../components/DetailCard';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { text } from '../../../lib/i18n';
import * as kioskState from '../../../shared/kiosk-state';
import displayContent from '../../../shared/display-content';
import { resolveImage } from '../../../shared/imageMap';
import { useKioskStore } from '../../../store/kioskStore';

export default function TakhtDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const language = useKioskStore((s) => s.language);
  const selectTakht = useKioskStore((s) => s.selectTakht);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);

  const selected = displayContent.takhts.find((tk) => tk.id === id) ?? displayContent.takhts[0];
  const index = Math.max(displayContent.takhts.findIndex((tk) => tk.id === selected?.id), 0);

  useEffect(() => {
    if (selected) {
      selectTakht(selected.id);
      navigation.setOptions({ title: t(selected.name) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  if (!selected) {
    return null;
  }

  const image = resolveImage(selected.imagePath);

  const handleStep = (delta: number) => {
    const nextId = kioskState.stepTakht(
      { ...useKioskStore.getState(), selectedTakhtId: selected.id },
      displayContent,
      delta,
    ).selectedTakhtId;
    router.replace(`/(tabs)/takhts/${nextId}`);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {image ? <Image source={image} style={styles.portrait} resizeMode="cover" /> : null}

      <AppText variant="eyebrow" color="gold300">
        {t(selected.location)}
      </AppText>
      <AppText variant="display" style={{ marginTop: Spacing.xs }}>
        {t(selected.name)}
      </AppText>
      <AppText variant="body" color="cloud400" style={{ marginTop: Spacing.xs, marginBottom: Spacing.md }}>
        {t(selected.location)}
        {selected.yearDeclared ? ` · ${selected.yearDeclared}` : ''}
      </AppText>

      <ChapterBar
        total={displayContent.takhts.length}
        currentIndex={index}
        chapterLabel={t(displayContent.ui.labels.chapterLabel)}
        chapterName={t(selected.name)}
        previousLabel={t(displayContent.ui.labels.previousChapter)}
        nextLabel={t(displayContent.ui.labels.nextChapter)}
        onStep={handleStep}
      />

      <View style={styles.cards}>
        <DetailCard label={t(displayContent.ui.labels.establishedBy)}>{t(selected.establishedBy)}</DetailCard>

        <DetailCard label={t(displayContent.ui.labels.significance)}>{t(selected.significance)}</DetailCard>

        {selected.story ? (
          <DetailCard label={t(displayContent.ui.labels.story)} tone="story">
            {t(selected.story)}
          </DetailCard>
        ) : null}

        {selected.funFact ? (
          <DetailCard label={t(displayContent.ui.labels.funFact)} tone="fact">
            {t(selected.funFact)}
          </DetailCard>
        ) : null}

        {selected.jathedaar ? (
          <DetailCard label={t(displayContent.ui.labels.jathedaar)}>{t(selected.jathedaar)}</DetailCard>
        ) : null}

        {selected.visitorsInfo ? (
          <DetailCard label={t(displayContent.ui.labels.visitorsInfo)} tone="visitors">
            {t(selected.visitorsInfo)}
          </DetailCard>
        ) : null}

        {selected.gurusVisited ? (
          <DetailCard label={t(displayContent.ui.labels.gurusVisited)} tone="story">
            {t(selected.gurusVisited)}
          </DetailCard>
        ) : null}

        {selected.areaHistory || selected.localImpact ? (
          <DetailCard label={t(displayContent.ui.labels.areaHistory)}>
            {[
              selected.areaHistory ? t(selected.areaHistory) : '',
              selected.localImpact ? `${t(displayContent.ui.labels.localImpact)}: ${t(selected.localImpact)}` : '',
            ]
              .filter(Boolean)
              .join('\n')}
          </DetailCard>
        ) : null}
      </View>

      <ChapterBar
        total={displayContent.takhts.length}
        currentIndex={index}
        chapterLabel={t(displayContent.ui.labels.chapterLabel)}
        chapterName={t(selected.name)}
        previousLabel={t(displayContent.ui.labels.previousChapter)}
        nextLabel={t(displayContent.ui.labels.nextChapter)}
        onStep={handleStep}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  portrait: {
    width: '100%',
    height: 220,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.night900,
  },
  cards: { marginTop: Spacing.md },
});
