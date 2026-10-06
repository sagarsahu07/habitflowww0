import { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header.jsx";
import AppNav from "./components/AppNav/AppNav.jsx";
import DashboardPage from "./components/DashboardPage/DashboardPage.jsx";
import AnalyticsPage from "./components/AnalyticsPage/AnalyticsPage.jsx";
import AddHabitSheet from "./components/AddHabitSheet/AddHabitSheet.jsx";
import { useHabits } from "./hooks/useHabits.js";
import { useRoute } from "./hooks/useRoute.js";
import { formatHeaderDate, getGreeting } from "./utils/date.js";
import "./App.css";

// App.jsx is responsible only for: app composition, route switching,
// and the one piece of state shared across routes (the add-habit
// sheet). Each route's actual content lives in its own page
// component (DashboardPage, AnalyticsPage). Calendar is a complete,
// standalone component (src/components/Calendar/) not yet wired to
// any route — that was a deliberate, confirmed historical gap, not
// an omission introduced during recovery.
function App() {
  const {
    habits,
    stats,
    weeklyProgress,
    remainingHabits,
    recentHabits,
    habitStatistics,
    trends,
    insights,
    addHabit,
    deleteHabit,
    toggleToday,
    toggleArchived,
  } = useHabits();

  const { path, navigate } = useRoute();

  const [sheetOpen, setSheetOpen] = useState(false);
  const addButtonRef = useRef(null);

  useEffect(() => {
    if (stats.activeHabits === 0) {
      document.title = "HabitFlow";
      return;
    }
    document.title = `${stats.completedToday}/${stats.activeHabits} done · HabitFlow`;
  }, [stats]);

  function handleOpenSheet() {
    setSheetOpen(true);
  }

  function handleCloseSheet() {
    setSheetOpen(false);
    addButtonRef.current?.focus();
  }

  return (
    <div className="app">
      <div className="container">
        <Header onAddHabit={handleOpenSheet} addButtonRef={addButtonRef} />
        <AppNav currentPath={path} onNavigate={navigate} />
        <main className="app__main">
          {path === "/analytics" ? (
            <AnalyticsPage
              habitStatistics={habitStatistics}
              trends={trends}
              insights={insights}
              onBackToDashboard={() => navigate("/")}
            />
          ) : (
            <DashboardPage
              greeting={getGreeting()}
              currentDate={formatHeaderDate()}
              habits={habits}
              stats={stats}
              weeklyProgress={weeklyProgress}
              remainingHabits={remainingHabits}
              recentHabits={recentHabits}
              onToggle={toggleToday}
              onDelete={deleteHabit}
              onToggleArchive={toggleArchived}
              onAddHabit={handleOpenSheet}
            />
          )}
        </main>
      </div>

      {sheetOpen && (
        <AddHabitSheet onClose={handleCloseSheet} onSubmit={addHabit} />
      )}
    </div>
  );
}

export default App;
