import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '../constants/theme';
import { AppText } from './AppText';

/** Placeholder for tabs whose real content lands in a later phase — proves the nav shell/i18n work end to end before the screen itself exists. */
export function ComingSoonScreen({ icon, titleEn, titlePa }: { icon: string; titleEn: string; titlePa: string }) {
  return (
    <View style={styles.screen}>
      <AppText style={{ fontSize: 40 }}>{icon}</AppText>
      <AppText variant="heading" style={{ marginTop: Spacing.md, textAlign: 'center' }}>
        {titleEn}
      </AppText>
      <AppText variant="subheading" color="cloud400" style={{ marginTop: Spacing.xs, textAlign: 'center' }}>
        {titlePa}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg },
});
