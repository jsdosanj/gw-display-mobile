// A separate (non-persisted) Zustand store rather than local per-button
// state — expo-speech is a single global native speech queue, so if each
// Listen button tracked its own "am I speaking" state independently,
// starting button B would silently stop button A's audio via the native
// queue without clearing A's own stuck "speaking" indicator. One shared
// speakingId avoids that class of bug entirely.
import * as Speech from 'expo-speech';
import { create } from 'zustand';

import type { Language } from '../shared/display';

const speechLangCodes: Record<Language, string> = {
  en: 'en-US',
  pa: 'pa-IN',
  hi: 'hi-IN',
  es: 'es-ES',
  ar: 'ar-SA',
};

interface TtsStore {
  speakingId: string | null;
  stop: () => void;
  speak: (id: string, value: string, language: Language, onNoPunjabiVoice: () => void) => Promise<void>;
}

export const useTtsStore = create<TtsStore>((set) => ({
  speakingId: null,

  stop: () => {
    Speech.stop();
    set({ speakingId: null });
  },

  speak: async (id, value, language, onNoPunjabiVoice) => {
    Speech.stop();
    set({ speakingId: null });

    // Punjabi voice availability is inconsistent across devices/OS
    // versions — same real-world constraint as the web kiosk's Web Speech
    // API, so it gets the same fallback-notice treatment rather than
    // speaking with the wrong language's pronunciation rules.
    if (language === 'pa') {
      const voices = await Speech.getAvailableVoicesAsync();
      const hasPunjabi = voices.some((voice) => voice.language?.toLowerCase().startsWith('pa'));
      if (!hasPunjabi) {
        onNoPunjabiVoice();
        return;
      }
    }

    set({ speakingId: id });
    Speech.speak(value, {
      language: speechLangCodes[language],
      onDone: () => set((s) => (s.speakingId === id ? { speakingId: null } : s)),
      onStopped: () => set((s) => (s.speakingId === id ? { speakingId: null } : s)),
      onError: () => set((s) => (s.speakingId === id ? { speakingId: null } : s)),
    });
  },
}));
