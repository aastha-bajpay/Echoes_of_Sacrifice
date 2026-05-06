import React, { useState } from 'react';
import { useMealLog } from './hooks/useMealLog';
import { useTheme } from './hooks/useTheme';
import { useWater } from './hooks/useWater';
import { useActivity } from './hooks/useActivity';
import Dashboard from './components/Dashboard';
import FoodSearch from './components/FoodSearch';
import MealLog from './components/MealLog';
import Recommendations from './components/Recommendations';
import GoalSetting from './components/GoalSetting';
import ActivityLog from './components/ActivityLog';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

type Tab = 'dashboard' | 'search' | 'log' | 'activity' | 'recs' | 'goals';

const NAV_ITEMS: { id: Tab; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '📊', label: 'Home' },
  { id: 'search', icon: '🔍', label: 'Add' },
  { id: 'log', icon: '📋', label: 'Log' },
  { id: 'activity', icon: '🏃', label: 'Activity' },
  { id: 'recs', icon: '💡', label: 'Insights' },
  { id: 'goals', icon: '🎯', label: 'Goals' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { theme, setTheme } = useTheme();

  const {
    logs,
    goals,
    selectedDate,
    setSelectedDate,
    todayEntries,
    addEntry,
    removeEntry,
    updateGoals,
  } = useMealLog();

  const { getGlasses, setGlasses } = useWater(selectedDate);
  const { todayActivities, addActivity, removeActivity, getTotalBurned } =
    useActivity(selectedDate);

  const entries = todayEntries();
  const waterConsumed = getGlasses(selectedDate);
  const caloriesBurned = getTotalBurned(selectedDate);

  const navigate = (tab: string) => setActiveTab(tab as Tab);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <span className="app-header__logo">🥗</span>
            <span className="app-header__name">WellFuel</span>
          </div>
          <div className="app-header__right">
            <p className="app-header__tagline">Smart nutrition tracker</p>
            <ThemeToggle theme={theme} onThemeChange={setTheme} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        {activeTab === 'dashboard' && (
          <Dashboard
            entries={entries}
            goals={goals}
            selectedDate={selectedDate}
            onNavigate={navigate}
            logs={logs}
            waterConsumed={waterConsumed}
            onWaterUpdate={(g) => setGlasses(g, selectedDate)}
            caloriesBurned={caloriesBurned}
          />
        )}
        {activeTab === 'search' && (
          <FoodSearch onAddFood={addEntry} />
        )}
        {activeTab === 'log' && (
          <MealLog
            entries={entries}
            onRemove={removeEntry}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        )}
        {activeTab === 'activity' && (
          <ActivityLog
            entries={todayActivities()}
            onAdd={addActivity}
            onRemove={removeActivity}
            userWeight={goals.weight ?? 70}
          />
        )}
        {activeTab === 'recs' && (
          <Recommendations entries={entries} goals={goals} onNavigate={navigate} />
        )}
        {activeTab === 'goals' && (
          <GoalSetting goals={goals} onSave={updateGoals} />
        )}
      </main>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`bottom-nav__item${activeTab === item.id ? ' bottom-nav__item--active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="bottom-nav__icon">{item.icon}</span>
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
