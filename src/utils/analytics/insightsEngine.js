function buildSummary(habitStatistics) {
  const { activeHabits, overallCompletionRate } = habitStatistics;
  if (activeHabits === 0) return "Add a habit to start seeing insights.";
  const habitWord = activeHabits === 1 ? "habit" : "habits";
  return `You're at ${overallCompletionRate}% overall completion across ${activeHabits} ${habitWord}.`;
}

function buildHighlights(habitStatistics, trends) {
  const highlights = [];
  const { activeHabits, currentStreak, longestStreak, totalCompletions } = habitStatistics;

  if (activeHabits === 0) return highlights;

  if (currentStreak > 0) {
    highlights.push(`You're currently on a ${currentStreak}-day streak.`);
  }

  if (longestStreak > currentStreak) {
    const dayWord = longestStreak === 1 ? "day" : "days";
    highlights.push(`Your longest streak so far is ${longestStreak} ${dayWord}.`);
  }

  if (totalCompletions > 0 && trends.bestDay) {
    highlights.push(
      `${trends.bestDay.name}s are your most consistent day, averaging ${trends.bestDay.averagePercentage}%.`
    );
  }

  if (trends.weekly.percentage > trends.monthly.percentage + 5) {
    highlights.push(
      `You're improving — this week (${trends.weekly.percentage}%) is ahead of your monthly average (${trends.monthly.percentage}%).`
    );
  }

  return highlights;
}

function buildRecommendations(habitStatistics, trends) {
  const recommendations = [];
  const { activeHabits, overallCompletionRate, totalCompletions, weakestHabit } = habitStatistics;

  if (activeHabits === 0) {
    recommendations.push("Add your first habit to start tracking progress.");
    return recommendations;
  }

  if (overallCompletionRate < 30) {
    recommendations.push("Try focusing on just one habit at a time to build momentum.");
  }

  if (trends.weekly.percentage < trends.monthly.percentage - 5) {
    recommendations.push(
      `This week (${trends.weekly.percentage}%) is behind your monthly average (${trends.monthly.percentage}%) — small consistent steps help.`
    );
  }

  if (weakestHabit && weakestHabit.completionRate < 50 && activeHabits > 1) {
    recommendations.push(
      `Consider focusing on ${weakestHabit.name} — it's your lowest at ${weakestHabit.completionRate}%.`
    );
  }

  if (totalCompletions > 0 && trends.weakestDay && trends.weakestDay.averagePercentage < 50) {
    recommendations.push(
      `${trends.weakestDay.name}s tend to be tougher, at ${trends.weakestDay.averagePercentage}% — a reminder that day could help.`
    );
  }

  return recommendations;
}

export function generateInsights(habitStatistics, trends) {
  return {
    summary: buildSummary(habitStatistics),
    highlights: buildHighlights(habitStatistics, trends),
    recommendations: buildRecommendations(habitStatistics, trends),
  };
}
