import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/AppText';
import { InteractiveMap, type MapPin } from '../../../components/InteractiveMap';
import { Colors, Spacing } from '../../../constants/theme';
import { text } from '../../../lib/i18n';
import displayContent from '../../../shared/display-content';
import { resolveImage, resolveSilhouette } from '../../../shared/imageMap';
import { useKioskStore } from '../../../store/kioskStore';

const FALLBACK_SILHOUETTE = '/assets/images/gurdwara-silhouette.svg';

export default function TakhtsMapScreen() {
  const language = useKioskStore((s) => s.language);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);

  const pins: MapPin[] = displayContent.takhts.map((takht, index) => ({
    id: takht.id,
    x: takht.mapPoint.x,
    y: takht.mapPoint.y,
    label: t(takht.name),
    number: index + 1,
    active: false,
  }));

  const mapImage = resolveImage('/assets/images/five-takht-map.jpg');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="body" color="cloud200" style={{ marginBottom: Spacing.md }}>
        {t(displayContent.ui.labels.takhtsIntro)}
      </AppText>

      {mapImage ? (
        <InteractiveMap
          imageSource={mapImage}
          pins={pins}
          onSelectPin={(id) => router.push(`/(tabs)/takhts/${id}`)}
        />
      ) : null}

      <View style={styles.strip}>
        {displayContent.takhts.map((takht) => {
          const Silhouette = resolveSilhouette(takht.silhouettePath ?? FALLBACK_SILHOUETTE);
          return (
            <Pressable
              key={takht.id}
              onPress={() => router.push(`/(tabs)/takhts/${takht.id}`)}
              style={styles.avatar}>
              {Silhouette ? <Silhouette width={40} height={40} /> : <View style={styles.avatarFallback} />}
              <AppText variant="label" style={{ marginTop: Spacing.xs, textAlign: 'center' }}>
                {t(takht.name)}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  strip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  avatar: { width: '18%', alignItems: 'center', marginBottom: Spacing.md },
  avatarFallback: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.night800 },
});
