import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/AppText';
import { ChapterBar } from '../../../components/ChapterBar';
import { DetailCard } from '../../../components/DetailCard';
import { ListenButton } from '../../../components/ListenButton';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { text } from '../../../lib/i18n';
import { useStopTtsOnBlur } from '../../../lib/useStopTtsOnBlur';
import * as kioskState from '../../../shared/kiosk-state';
import displayContent from '../../../shared/display-content';
import { resolveImage } from '../../../shared/imageMap';
import { useKioskStore } from '../../../store/kioskStore';

export default function PyaraDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pyaraId = Number(id);
  const navigation = useNavigation();
  useStopTtsOnBlur();
  const language = useKioskStore((s) => s.language);
  const selectPyara = useKioskStore((s) => s.selectPyara);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);

  const selected = displayContent.panjPyare.find((p) => p.id === pyaraId) ?? displayContent.panjPyare[0];
  const index = Math.max(displayContent.panjPyare.findIndex((p) => p.id === selected?.id), 0);

  useEffect(() => {
    if (selected) {
      selectPyara(selected.id);
      navigation.setOptions({ title: t(selected.name) });
    }
    // Only re-sync when the profile itself changes, not on every language toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  if (!selected) {
    return null;
  }

  const image = resolveImage(selected.imagePath);

  const handleStep = (delta: number) => {
    const nextId = kioskState.stepPyara(
      { ...useKioskStore.getState(), selectedPyaraId: selected.id },
      displayContent,
      delta,
    ).selectedPyaraId;
    router.replace(`/(tabs)/pyare/${nextId}`);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {image ? <Image source={image} style={styles.portrait} resizeMode="cover" /> : null}

      <AppText variant="eyebrow" color="gold300">
        {t(selected.representing)}
      </AppText>
      <AppText variant="display" style={{ marginTop: Spacing.xs }}>
        {t(selected.name)}
      </AppText>
      <AppText variant="body" color="cloud400" style={{ marginTop: Spacing.xs, marginBottom: Spacing.md }}>
        {t(displayContent.ui.labels.birthName)}: {t(selected.birthName)} · {selected.years}
      </AppText>

      <ChapterBar
        total={displayContent.panjPyare.length}
        currentIndex={index}
        chapterLabel={t(displayContent.ui.labels.chapterLabel)}
        chapterName={t(selected.name)}
        previousLabel={t(displayContent.ui.labels.previousChapter)}
        nextLabel={t(displayContent.ui.labels.nextChapter)}
        onStep={handleStep}
      />

      <View style={styles.cards}>
        <DetailCard label={t(displayContent.ui.labels.beforeKhalsa)}>
          {`${t(displayContent.ui.labels.previousOccupation)}: ${t(selected.occupation)}\n${t(displayContent.ui.labels.fromRegion)}: ${t(selected.from)}\n${t(displayContent.ui.labels.representing)}: ${t(selected.caste)}`}
        </DetailCard>

        <DetailCard label={t(displayContent.ui.labels.story)} tone="story">
          {t(selected.story ?? selected.details)}
        </DetailCard>
        <ListenButton
          id={`pyara-story-${selected.id}`}
          value={t(selected.story ?? selected.details)}
          label={t(displayContent.ui.labels.ttsListen)}
        />

        {selected.accomplishments || selected.roles ? (
          <DetailCard label={t(displayContent.ui.labels.afterKhalsa)}>
            {[
              selected.accomplishments ? `${t(displayContent.ui.labels.accomplishments)}: ${t(selected.accomplishments)}` : '',
              selected.roles ? `${t(displayContent.ui.labels.roles)}: ${t(selected.roles)}` : '',
            ]
              .filter(Boolean)
              .join('\n')}
          </DetailCard>
        ) : null}

        {selected.funFact ? (
          <DetailCard label={t(displayContent.ui.labels.funFact)} tone="fact">
            {t(selected.funFact)}
          </DetailCard>
        ) : null}

        {selected.shaheedi ? (
          <DetailCard label={t(displayContent.ui.labels.shaheedi)} tone="shaheedi">
            {t(selected.shaheedi)}
          </DetailCard>
        ) : null}

        {selected.lessons ? (
          <DetailCard label={t(displayContent.ui.labels.lessons)} tone="story">
            {t(selected.lessons)}
          </DetailCard>
        ) : null}

        {selected.language || selected.qualities ? (
          <DetailCard label={t(displayContent.ui.labels.qualities)}>
            {[
              selected.qualities ? t(selected.qualities) : '',
              selected.language ? `${t(displayContent.ui.labels.language)}: ${t(selected.language)}` : '',
            ]
              .filter(Boolean)
              .join('\n')}
          </DetailCard>
        ) : null}
      </View>

      <ChapterBar
        total={displayContent.panjPyare.length}
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
    height: 260,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.night900,
  },
  cards: { marginTop: Spacing.md },
});
