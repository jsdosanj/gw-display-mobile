import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/AppText';
import { InteractiveMap, type MapPin } from '../../../components/InteractiveMap';
import { Colors, Spacing } from '../../../constants/theme';
import { text } from '../../../lib/i18n';
import displayContent from '../../../shared/display-content';
import { resolveImage, resolveSilhouette } from '../../../shared/imageMap';
import { useKioskStore } from '../../../store/kioskStore';

export default function PyareMapScreen() {
  const language = useKioskStore((s) => s.language);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);

  const pins: MapPin[] = displayContent.panjPyare.map((pyara, index) => ({
    id: pyara.id,
    x: pyara.mapPoint.x,
    y: pyara.mapPoint.y,
    label: t(pyara.name),
    number: index + 1,
    active: false,
  }));

  const mapImage = resolveImage('/assets/images/panj-pyare-map.jpg');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="body" color="cloud200" style={{ marginBottom: Spacing.md }}>
        {t(displayContent.ui.labels.pyareIntro)}
      </AppText>

      {mapImage ? (
        <InteractiveMap
          imageSource={mapImage}
          pins={pins}
          onSelectPin={(id) => router.push(`/(tabs)/pyare/${id}`)}
        />
      ) : null}

      <View style={styles.strip}>
        {displayContent.panjPyare.map((pyara) => {
          const Silhouette = resolveSilhouette(pyara.silhouettePath);
          return (
            <Pressable
              key={pyara.id}
              onPress={() => router.push(`/(tabs)/pyare/${pyara.id}`)}
              style={styles.avatar}>
              {Silhouette ? (
                <Silhouette width={40} height={40} />
              ) : (
                <View style={styles.avatarFallback} />
              )}
              <AppText variant="label" style={{ marginTop: Spacing.xs, textAlign: 'center' }}>
                {t(pyara.name)}
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
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.night800,
  },
});
