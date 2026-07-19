import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { ProgressRing } from '../../components/ProgressRing';
import { Colors, Radius, Spacing } from '../../constants/theme';
import { text } from '../../lib/i18n';
import { currentQuizTotal, quizLevelIcons, scoreTier } from '../../lib/quiz';
import displayContent from '../../shared/display-content';
import * as kioskState from '../../shared/kiosk-state';
import type { QuizLevel } from '../../shared/display';
import { useKioskStore } from '../../store/kioskStore';

const QUIZ_LEVELS: QuizLevel[] = ['beginner', 'intermediate', 'advanced'];

const scoreTierMessageKey = {
  perfect: 'perfectScore',
  excellent: 'excellentScore',
  good: 'goodScore',
  'try-again': 'tryAgainScore',
} as const;

export default function QuizScreen() {
  const state = useKioskStore();
  const t = (v: Parameters<typeof text>[0]) => text(v, state.language);

  if (state.quizPhase === 'level') {
    return <LevelSelect t={t} />;
  }
  if (state.quizPhase === 'count') {
    return <CountSelect t={t} />;
  }

  const complete = kioskState.isQuizComplete(state);
  if (complete) {
    return <Results t={t} />;
  }
  return <QuestionScreen t={t} />;
}

type T = (v: Parameters<typeof text>[0]) => string;

function LevelSelect({ t }: { t: T }) {
  const selectQuizLevel = useKioskStore((s) => s.selectQuizLevel);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="label" color="gold300" style={styles.stepLabel}>
        {t(displayContent.ui.labels.chooseLevelStep)}
      </AppText>
      <AppText variant="display" style={{ textAlign: 'center', marginTop: Spacing.sm }}>
        {t(displayContent.ui.labels.chooseLevelTitle)}
      </AppText>
      <AppText variant="body" color="cloud200" style={{ textAlign: 'center', marginTop: Spacing.md }}>
        {t(displayContent.quiz.intro)}
      </AppText>

      <View style={{ marginTop: Spacing.lg }}>
        {QUIZ_LEVELS.map((level) => {
          const meta = displayContent.quiz.levelMeta[level];
          return (
            <Pressable key={level} onPress={() => selectQuizLevel(level)} style={styles.levelCard}>
              <AppText style={{ fontSize: 32 }}>{quizLevelIcons[level]}</AppText>
              <AppText variant="heading" style={{ marginTop: Spacing.sm }}>
                {t(meta.title)}
              </AppText>
              <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
                {t(meta.description)}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

function CountSelect({ t }: { t: T }) {
  const backToQuizLevels = useKioskStore((s) => s.backToQuizLevels);
  const startQuiz = useKioskStore((s) => s.startQuiz);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="label" color="gold300" style={styles.stepLabel}>
        {t(displayContent.ui.labels.chooseCountStep)}
      </AppText>
      <AppText variant="display" style={{ textAlign: 'center', marginTop: Spacing.sm }}>
        {t(displayContent.ui.labels.chooseCountTitle)}
      </AppText>

      <View style={{ marginTop: Spacing.lg }}>
        {displayContent.quiz.countOptions.map((option) => (
          <Pressable key={option.count} onPress={() => startQuiz(option.count)} style={styles.levelCard}>
            <AppText variant="heading">{t(option.label)}</AppText>
            <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
              {option.count}
            </AppText>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={backToQuizLevels} style={styles.backButton}>
        <AppText color="cloud400">← {t(displayContent.ui.labels.backButton)}</AppText>
      </Pressable>
    </ScrollView>
  );
}

function QuestionScreen({ t }: { t: T }) {
  const state = useKioskStore();
  const submitQuizAnswer = useKioskStore((s) => s.submitQuizAnswer);
  const advanceQuiz = useKioskStore((s) => s.advanceQuiz);

  const questions = kioskState.getActiveQuizQuestions(state, displayContent);
  const questionIndex = state.quizQuestionOrder[state.quizIndex];
  const question = questionIndex === undefined ? undefined : questions[questionIndex];
  const total = currentQuizTotal(state);

  if (!question) {
    return null;
  }

  const revealed = state.revealedAnswer;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="eyebrow" color="gold300" style={{ textAlign: 'center' }}>
        {t(displayContent.ui.labels.quizProgress)} {state.quizIndex + 1} / {total}
      </AppText>
      <AppText variant="heading" style={{ textAlign: 'center', marginTop: Spacing.md }}>
        {t(question.prompt)}
      </AppText>

      <View style={{ marginTop: Spacing.lg }}>
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isChosen = index === revealed;
          const showState = revealed !== null;
          return (
            <Pressable
              key={index}
              disabled={showState}
              onPress={() => submitQuizAnswer(index)}
              style={[
                styles.optionCard,
                showState && isCorrect && styles.optionCorrect,
                showState && isChosen && !isCorrect && styles.optionIncorrect,
              ]}>
              <AppText variant="body">{t(option)}</AppText>
            </Pressable>
          );
        })}
      </View>

      {revealed !== null ? (
        <View style={styles.insightCard}>
          <AppText variant="eyebrow" color="gold300">
            {revealed === question.correctIndex
              ? t(displayContent.ui.labels.correctAnswer)
              : `${t(displayContent.ui.labels.correctAnswer)}: ${t(question.options[question.correctIndex] ?? { en: '', pa: '' })}`}
          </AppText>
          <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
            {t(question.insight)}
          </AppText>
          <Pressable onPress={advanceQuiz} style={styles.primaryButton}>
            <AppText color="night950" style={{ fontWeight: '700' }}>
              {t(displayContent.ui.labels.nextQuestion)}
            </AppText>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}

function Results({ t }: { t: T }) {
  const state = useKioskStore();
  const restartQuiz = useKioskStore((s) => s.restartQuiz);
  const backToQuizLevels = useKioskStore((s) => s.backToQuizLevels);

  const score = kioskState.getQuizScore(state, displayContent);
  const total = currentQuizTotal(state);
  const tier = scoreTier(score, total);
  const messageKey = scoreTierMessageKey[tier];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AppText variant="eyebrow" color="gold300" style={{ textAlign: 'center' }}>
        {t(displayContent.sections.quiz.title)}
      </AppText>
      <View style={{ alignItems: 'center', marginTop: Spacing.lg }}>
        <ProgressRing fraction={total === 0 ? 0 : score / total} centerLabel={`${score}/${total}`} />
      </View>
      <AppText variant="subheading" style={{ textAlign: 'center', marginTop: Spacing.md }}>
        {t(displayContent.ui.labels.yourScore)}
      </AppText>
      <AppText variant="body" color="cloud200" style={{ textAlign: 'center', marginTop: Spacing.sm }}>
        {t(displayContent.ui.labels[messageKey])}
      </AppText>

      <View style={styles.resultActions}>
        <Pressable onPress={() => restartQuiz()} style={styles.primaryButton}>
          <AppText color="night950" style={{ fontWeight: '700' }}>
            {t(displayContent.ui.labels.tryAgainButton)}
          </AppText>
        </Pressable>
        <Pressable onPress={backToQuizLevels} style={styles.secondaryButton}>
          <AppText color="cloud200">{t(displayContent.ui.labels.changeLevel)}</AppText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.night950 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  stepLabel: { textAlign: 'center', textTransform: 'uppercase' },
  levelCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: Colors.night900,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  backButton: { marginTop: Spacing.md, alignItems: 'center', padding: Spacing.md },
  optionCard: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: Colors.night900,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  optionCorrect: { borderColor: '#34d399', backgroundColor: 'rgba(52,211,153,0.12)' },
  optionIncorrect: { borderColor: '#fb7185', backgroundColor: 'rgba(251,113,133,0.12)' },
  insightCard: {
    marginTop: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(228,187,94,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(247,217,137,0.2)',
    padding: Spacing.md,
  },
  primaryButton: {
    marginTop: Spacing.md,
    backgroundColor: Colors.gold400,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  secondaryButton: {
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  resultActions: { marginTop: Spacing.lg },
});
