// Thin Zustand adapter over the shared pure reducers in src/shared/kiosk-state.ts
// — every action here is a one-liner that hands off to the already-tested
// shared logic; no app-specific state logic lives in this file. Kiosk-only
// concerns (wakeKiosk, resetForInactivity/inactivity timeout, the "awake"
// attract-screen gate) are part of the shared module but deliberately never
// called here — a phone/tablet app has no inactivity-driven attract loop.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import displayContent from '../shared/display-content';
import * as kioskState from '../shared/kiosk-state';
import type { KioskState } from '../shared/kiosk-state';
import type { Language, QuizLevel, View } from '../shared/display';

interface KioskStore extends KioskState {
  setLanguage: (language: Language) => void;
  setTheme: (themeId: string) => void;
  navigate: (view: View) => void;
  selectPyara: (id: number) => void;
  selectTakht: (id: string) => void;
  stepPyara: (delta: number) => void;
  stepTakht: (delta: number) => void;
  selectQuizLevel: (level: QuizLevel) => void;
  backToQuizLevels: () => void;
  startQuiz: (count: number) => void;
  submitQuizAnswer: (answerIndex: number) => void;
  advanceQuiz: () => void;
  restartQuiz: () => void;
}

export const useKioskStore = create<KioskStore>()(
  persist(
    (set) => ({
      ...kioskState.createInitialState(displayContent),

      setLanguage: (language) => set((s) => kioskState.setLanguage(s, language)),
      setTheme: (themeId) => set((s) => kioskState.setTheme(s, themeId)),
      navigate: (view) => set((s) => kioskState.navigate(s, view)),
      selectPyara: (id) => set((s) => kioskState.selectPyara(s, id)),
      selectTakht: (id) => set((s) => kioskState.selectTakht(s, id)),
      stepPyara: (delta) => set((s) => kioskState.stepPyara(s, displayContent, delta)),
      stepTakht: (delta) => set((s) => kioskState.stepTakht(s, displayContent, delta)),
      selectQuizLevel: (level) => set((s) => kioskState.selectQuizLevel(s, level)),
      backToQuizLevels: () => set((s) => kioskState.backToQuizLevels(s)),
      startQuiz: (count) => set((s) => kioskState.startQuiz(s, displayContent, count)),
      submitQuizAnswer: (answerIndex) => set((s) => kioskState.submitQuizAnswer(s, answerIndex)),
      advanceQuiz: () => set((s) => kioskState.advanceQuiz(s)),
      restartQuiz: () => set((s) => kioskState.restartQuiz(s, displayContent)),
    }),
    {
      name: 'khalsa-legacy-preferences',
      storage: createJSONStorage(() => AsyncStorage),
      // Only small, cross-session preferences persist — quiz progress and
      // navigation position reset fresh each app launch, same as the web
      // kiosk resets on inactivity.
      partialize: (s) => ({ language: s.language, themeId: s.themeId }),
    },
  ),
);
