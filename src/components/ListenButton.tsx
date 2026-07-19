import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '../constants/theme';
import { text } from '../lib/i18n';
import displayContent from '../shared/display-content';
import { useKioskStore } from '../store/kioskStore';
import { useTtsStore } from '../store/ttsStore';
import { AppText } from './AppText';

export function ListenButton({ id, value, label }: { id: string; value: string; label: string }) {
  const language = useKioskStore((s) => s.language);
  const t = (v: Parameters<typeof text>[0]) => text(v, language);
  const speakingId = useTtsStore((s) => s.speakingId);
  const speak = useTtsStore((s) => s.speak);
  const stop = useTtsStore((s) => s.stop);
  const [showNoVoiceNotice, setShowNoVoiceNotice] = useState(false);
  const isSpeaking = speakingId === id;

  const handlePress = () => {
    if (isSpeaking) {
      stop();
      return;
    }
    setShowNoVoiceNotice(false);
    speak(id, value, language, () => setShowNoVoiceNotice(true));
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[styles.button, isSpeaking && styles.buttonActive]}>
        <AppText style={{ fontSize: 14 }}>{isSpeaking ? '⏸' : '🔊'}</AppText>
        <AppText variant="label" color={isSpeaking ? 'night950' : 'cloud200'} style={{ marginLeft: 4 }}>
          {label}
        </AppText>
      </Pressable>
      {showNoVoiceNotice ? (
        <AppText variant="label" color="cloud400" style={{ marginTop: Spacing.xs }}>
          {t(displayContent.ui.labels.ttsNoPunjabiVoice)}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  buttonActive: {
    backgroundColor: Colors.gold400,
    borderColor: Colors.gold300,
  },
});
