// Shared by the Panj Pyare and Panj Takht map screens. Pins are positioned
// with the exact percentage coordinates already stored in display-content.ts
// (mapPoint.x/y) — React Native's layout system accepts percentage strings
// for left/top directly, so this needed zero data conversion from the web
// version, only a native rendering of the same numbers.
import { Image, Pressable, StyleSheet, View, type DimensionValue, type ImageSourcePropType } from 'react-native';

import { Colors, Radius } from '../constants/theme';
import { AppText } from './AppText';

export interface MapPin {
  id: string | number;
  x: string;
  y: string;
  label: string;
  number: number;
  active: boolean;
}

export function InteractiveMap({
  imageSource,
  pins,
  onSelectPin,
}: {
  imageSource: ImageSourcePropType;
  pins: MapPin[];
  onSelectPin: (id: string | number) => void;
}) {
  return (
    <View style={styles.frame}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      {pins.map((pin) => (
        <Pressable
          key={pin.id}
          onPress={() => onSelectPin(pin.id)}
          accessibilityRole="button"
          accessibilityLabel={pin.label}
          style={[
            styles.pin,
            // mapPoint.x/y are always "NN.N%" strings by content-model
            // convention (see PanjPyaraProfile/TakhtProfile) — RN's
            // DimensionValue type wants a template-literal type, not the
            // plain `string` these come through as.
            { left: pin.x as DimensionValue, top: pin.y as DimensionValue },
            pin.active && styles.pinActive,
          ]}>
          <AppText variant="label" color={pin.active ? 'night950' : 'white'} style={styles.pinText}>
            {pin.active ? '☬' : pin.number}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const PIN_SIZE = 36;

const styles = StyleSheet.create({
  frame: {
    aspectRatio: 1,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.night900,
    borderWidth: 1,
    borderColor: 'rgba(247,217,137,0.15)',
  },
  image: { width: '100%', height: '100%' },
  pin: {
    position: 'absolute',
    width: PIN_SIZE,
    height: PIN_SIZE,
    marginLeft: -PIN_SIZE / 2,
    marginTop: -PIN_SIZE / 2,
    borderRadius: PIN_SIZE / 2,
    backgroundColor: Colors.night900,
    borderWidth: 2,
    borderColor: Colors.gold300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinActive: {
    backgroundColor: Colors.gold400,
    borderColor: Colors.gold300,
  },
  pinText: { fontWeight: '700' },
});
