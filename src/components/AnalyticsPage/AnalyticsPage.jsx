import AnalyticsHeader from "../AnalyticsHeader/AnalyticsHeader.jsx";
import DashboardSection from "../DashboardSection/DashboardSection.jsx";
import AnalyticsCard from "../AnalyticsCard/AnalyticsCard.jsx";
import StatsCard from "../StatsCard/StatsCard.jsx";
import StatPlaceholder from "../StatPlaceholder/StatPlaceholder.jsx";
import EmptyAnalyticsState from "../EmptyAnalyticsState/EmptyAnalyticsState.jsx";
import "./AnalyticsPage.css";

const UPCOMING_SECTIONS = ["Achievements"];

function AnalyticsPage({ habitStatistics, trends, insights, onBackToDashboard }) {
  const hasData = habitStatistics.activeHabits > 0;

  if (!hasData) {
    return (
      <div className="analytics-page">
        <AnalyticsHeader />
        <EmptyAnalyticsState onBackToDashboard={onBackToDashboard} />
      </div>
    );
  }

  const { bestHabit, weakestHabit } = habitStatistics;

  return (
    <div className="analytics-page">
      <AnalyticsHeader />

      <DashboardSection title="Overview">
        <AnalyticsCard>
          <div className="analytics-page__stats-grid">
            <StatsCard label="Total Habits" value={habitStatistics.totalHabits} />
            <StatsCard label="Active Habits" value={habitStatistics.activeHabits} />
            <StatsCard label="Archived Habits" value={habitStatistics.archivedHabits} />
            <StatsCard label="Total Completions" value={habitStatistics.totalCompletions} />
          </div>
        </AnalyticsCard>
      </DashboardSection>

      <DashboardSection title="Habit Statistics">
        <AnalyticsCard>
          <div className="analytics-page__stats-grid">
            <StatsCard label="Overall Completion" value={habitStatistics.overallCompletionRate} suffix="%" />
            <StatsCard label="Current Streak" value={habitStatistics.currentStreak} suffix={habitStatistics.currentStreak === 1 ? " day" : " days"} />
            <StatsCard label="Longest Streak" value={habitStatistics.longestStreak} suffix={habitStatistics.longestStreak === 1 ? " day" : " days"} />
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="Best Habit">
          <p className="analytics-page__highlight-name">{bestHabit.name}</p>
          <p className="analytics-page__highlight-meta">
            {bestHabit.completionRate}% completion
            {bestHabit.streak > 0 ? ` · ${bestHabit.streak} day streak` : ""}
          </p>
        </AnalyticsCard>

        <AnalyticsCard title="Weakest Habit">
          <p className="analytics-page__highlight-name">{weakestHabit.name}</p>
          <p className="analytics-page__highlight-meta">
            {weakestHabit.completionRate}% completion
            {weakestHabit.streak > 0 ? ` · ${weakestHabit.streak} day streak` : ""}
          </p>
        </AnalyticsCard>
      </DashboardSection>

      <DashboardSection title="Weekly Trends">
        <AnalyticsCard title="Last 7 Days">
          <div className="analytics-page__progress-row">
            <span className="analytics-page__progress-value">{trends.weekly.percentage}%</span>
            <div
              className="analytics-page__progress-bar"
              role="img"
              aria-label={`${trends.weekly.percentage}% of habits completed over the last 7 days`}
            >
              <div className="analytics-page__progress-fill" style={{ width: `${trends.weekly.percentage}%` }} />
            </div>
          </div>
        </AnalyticsCard>
      </DashboardSection>

      <DashboardSection title="Monthly Trends">
        <AnalyticsCard title="Last 30 Days">
          <div className="analytics-page__progress-row">
            <span className="analytics-page__progress-value">{trends.monthly.percentage}%</span>
            <div
              className="analytics-page__progress-bar"
              role="img"
              aria-label={`${trends.monthly.percentage}% of habits completed over the last 30 days`}
            >
              <div className="analytics-page__progress-fill" style={{ width: `${trends.monthly.percentage}%` }} />
            </div>
          </div>
        </AnalyticsCard>

        {trends.bestDay && (
          <AnalyticsCard title="Best Day of the Week">
            <p className="analytics-page__highlight-name">{trends.bestDay.name}</p>
            <p className="analytics-page__highlight-meta">{trends.bestDay.averagePercentage}% average completion</p>
          </AnalyticsCard>
        )}

        {trends.weakestDay && (
          <AnalyticsCard title="Weakest Day of the Week">
            <p className="analytics-page__highlight-name">{trends.weakestDay.name}</p>
            <p className="analytics-page__highlight-meta">{trends.weakestDay.averagePercentage}% average completion</p>
          </AnalyticsCard>
        )}
      </DashboardSection>

      <DashboardSection title="Insights">
        <AnalyticsCard>
          <p className="analytics-page__insights-summary">{insights.summary}</p>
        </AnalyticsCard>

        <AnalyticsCard title="Highlights">
          {insights.highlights.length > 0 ? (
            <ul className="analytics-page__insights-list">
              {insights.highlights.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          ) : (
            <p className="analytics-page__insights-empty">Keep going — highlights will appear as you build consistency.</p>
          )}
        </AnalyticsCard>

        <AnalyticsCard title="Recommendations">
          {insights.recommendations.length > 0 ? (
            <ul className="analytics-page__insights-list">
              {insights.recommendations.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          ) : (
            <p className="analytics-page__insights-empty">No specific recommendations right now — you're on track.</p>
          )}
        </AnalyticsCard>
      </DashboardSection>

      {UPCOMING_SECTIONS.map((title) => (
        <DashboardSection key={title} title={title}>
          <AnalyticsCard>
            <StatPlaceholder />
          </AnalyticsCard>
        </DashboardSection>
      ))}
    </div>
  );
}

export default AnalyticsPage;
