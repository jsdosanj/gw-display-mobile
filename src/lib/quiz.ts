// Ported verbatim from kiosk.ts — pure, no DOM dependency in the original.
import type { KioskState } from '../shared/kiosk-state';
import type { QuizLevel } from '../shared/display';

export type ScoreTier = 'perfect' | 'excellent' | 'good' | 'try-again';

export function scoreTier(score: number, total: number): ScoreTier {
  if (total === 0) {
    return 'try-again';
  }
  const ratio = score / total;
  if (score === total) {
    return 'perfect';
  }
  if (ratio >= 0.8) {
    return 'excellent';
  }
  if (ratio >= 0.5) {
    return 'good';
  }
  return 'try-again';
}

export function currentQuizTotal(state: KioskState): number {
  return Math.min(state.quizCount, state.quizQuestionOrder.length);
}

export const quizLevelIcons: Record<QuizLevel, string> = {
  beginner: '🌱',
  intermediate: '🪔',
  advanced: '🗡️',
};
