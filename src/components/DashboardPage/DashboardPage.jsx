import Dashboard from "../Dashboard/Dashboard.jsx";
import DashboardSection from "../DashboardSection/DashboardSection.jsx";
import StatsCard from "../StatsCard/StatsCard.jsx";
import WeeklyProgressCard from "../WeeklyProgressCard/WeeklyProgressCard.jsx";
import QuickAddCard from "../QuickAddCard/QuickAddCard.jsx";
import RemainingHabitsCard from "../RemainingHabitsCard/RemainingHabitsCard.jsx";
import RecentHabitsCard from "../RecentHabitsCard/RecentHabitsCard.jsx";
import HabitList from "../HabitList/HabitList.jsx";
import "./DashboardPage.css";

function DashboardPage({
  greeting,
  currentDate,
  habits,
  stats,
  weeklyProgress,
  remainingHabits,
  recentHabits,
  onToggle,
  onDelete,
  onToggleArchive,
  onAddHabit,
}) {
  return (
    <Dashboard greeting={greeting} currentDate={currentDate}>
      {habits.length > 0 && (
        <DashboardSection title="Overview">
          <div className="dashboard-page__stats-grid">
            <StatsCard label="Today's Progress" value={stats.todaysProgress} suffix="%" />
            <StatsCard label="Completed Habits" value={`${stats.completedToday}/${stats.activeHabits}`} />
            <StatsCard label="Active Habits" value={stats.activeHabits} />
            <StatsCard label="Current Streak" value={stats.currentStreak} suffix={stats.currentStreak === 1 ? " day" : " days"} />
            <StatsCard label="Longest Streak" value={stats.longestStreak} suffix={stats.longestStreak === 1 ? " day" : " days"} />
            <StatsCard label="Completion %" value={stats.completionRate} suffix="%" />
          </div>
        </DashboardSection>
      )}

      {habits.length > 0 && (
        <DashboardSection title="Weekly Progress">
          <WeeklyProgressCard
            dailyCounts={weeklyProgress.dailyCounts}
            weeklyPercentage={weeklyProgress.weeklyPercentage}
            bestDay={weeklyProgress.bestDay}
            worstDay={weeklyProgress.worstDay}
          />
        </DashboardSection>
      )}

      {habits.length > 0 && <QuickAddCard onAdd={onAddHabit} />}

      {stats.activeHabits > 0 && (
        <DashboardSection title="Today's Remaining">
          <RemainingHabitsCard habits={remainingHabits} onComplete={onToggle} />
        </DashboardSection>
      )}

      {stats.activeHabits > 0 && (
        <DashboardSection title="Recent Habits">
          <RecentHabitsCard habits={recentHabits} />
        </DashboardSection>
      )}

      <DashboardSection title="Today's Habits">
        <HabitList
          habits={habits}
          onToggle={onToggle}
          onDelete={onDelete}
          onToggleArchive={onToggleArchive}
          onAddHabit={onAddHabit}
        />
      </DashboardSection>
    </Dashboard>
  );
}

export default DashboardPage;
