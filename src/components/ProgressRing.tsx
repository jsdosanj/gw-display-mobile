// SVG stroke-based ring, ported from kiosk.ts's renderProgressRing() —
// same radius/circumference math, native <Circle> in place of the web
// version's inline <svg>.
import { StyleSheet, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import { Colors } from '../constants/theme';
import { AppText } from './AppText';

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProgressRing({ fraction, centerLabel }: { fraction: number; centerLabel: string }) {
  const clamped = Math.max(0, Math.min(1, fraction));
  const offset = CIRCUMFERENCE * (1 - clamped);

  return (
    <View style={styles.wrap} accessibilityRole="image" accessibilityLabel={centerLabel}>
      <Svg width={88} height={88} viewBox="0 0 120 120">
        <Circle cx={60} cy={60} r={RADIUS} stroke="rgba(255,255,255,0.1)" strokeWidth={10} fill="none" />
        <Circle
          cx={60}
          cy={60}
          r={RADIUS}
          stroke={Colors.gold400}
          strokeWidth={10}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation={-90}
          origin="60,60"
        />
      </Svg>
      <AppText variant="label" style={styles.label}>
        {centerLabel}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 88, height: 88, alignItems: 'center', justifyContent: 'center' },
  label: { position: 'absolute' },
});
