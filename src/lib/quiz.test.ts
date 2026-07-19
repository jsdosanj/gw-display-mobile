import { currentQuizTotal, scoreTier } from './quiz';
import type { KioskState } from '../shared/kiosk-state';

describe('scoreTier', () => {
  it('is try-again when total is 0', () => {
    expect(scoreTier(0, 0)).toBe('try-again');
  });

  it('is perfect on a full score', () => {
    expect(scoreTier(5, 5)).toBe('perfect');
  });

  it('is excellent at >= 80%, below perfect', () => {
    expect(scoreTier(4, 5)).toBe('excellent');
  });

  it('is good at >= 50%, below excellent', () => {
    expect(scoreTier(3, 5)).toBe('good');
  });

  it('is try-again below 50%', () => {
    expect(scoreTier(1, 5)).toBe('try-again');
  });
});

describe('currentQuizTotal', () => {
  it('is the smaller of quizCount and the actual question order length', () => {
    const base = { quizCount: 10, quizQuestionOrder: [0, 1, 2] } as KioskState;
    expect(currentQuizTotal(base)).toBe(3);

    const other = { quizCount: 2, quizQuestionOrder: [0, 1, 2, 3, 4] } as KioskState;
    expect(currentQuizTotal(other)).toBe(2);
  });
});
