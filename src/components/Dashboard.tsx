import React from 'react';
import type { MealEntry, UserGoals, NutritionSummary, DailyLog } from '../types';
import NutritionBar from './NutritionBar';
import WaterTracker from './WaterTracker';
import WeeklyProgress from './WeeklyProgress';
import { summarizeEntries, formatDate, formatNum, calculateStreak } from '../utils/nutrition';

interface DashboardProps {
  entries: MealEntry[];
  goals: UserGoals;
  selectedDate: string;
  onNavigate: (tab: string) => void;
  logs: DailyLog[];
  waterConsumed: number;
  onWaterUpdate: (glasses: number) => void;
  caloriesBurned: number;
}

const MEAL_LABELS: Record<string, string> = {
  breakfast: '🌅 Breakfast',
  lunch: '☀️ Lunch',
  dinner: '🌙 Dinner',
  snack: '🍎 Snack',
};

const Dashboard: React.FC<DashboardProps> = ({
  entries,
  goals,
  selectedDate,
  onNavigate,
  logs,
  waterConsumed,
  onWaterUpdate,
  caloriesBurned,
}) => {
  const summary: NutritionSummary = summarizeEntries(entries);
  const netCalories = Math.max(0, Math.round(summary.calories - caloriesBurned));
  const calPct = goals.calories > 0 ? Math.round((netCalories / goals.calories) * 100) : 0;
  const remaining = Math.max(0, goals.calories - netCalories);
  const isOverGoal = netCalories > goals.calories;
  const streak = calculateStreak(logs);

  const mealGroups = entries.reduce<Record<string, MealEntry[]>>((acc, e) => {
    if (!acc[e.mealType]) acc[e.mealType] = [];
    acc[e.mealType].push(e);
    return acc;
  }, {});

  return (
    <div className="dashboard">
      {/* Date + Streak header */}
      <div className="dashboard__date-header">
        <div className="dashboard__date-left">
          <span className="dashboard__date-label">{formatDate(selectedDate)}</span>
          <span className="dashboard__date-value">{selectedDate}</span>
        </div>
        {streak > 0 && (
          <div className="streak-badge">
            🔥 {streak} day{streak !== 1 ? 's' : ''} streak
          </div>
        )}
      </div>

      {/* Calorie ring card */}
      <div className="calorie-card">
        <div className="calorie-card__ring">
          <svg viewBox="0 0 120 120" className="calorie-card__svg">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-border)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={isOverGoal ? 'var(--color-red)' : 'var(--color-orange)'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${Math.min(calPct, 100) * 3.267} 326.7`}
              strokeDashoffset="81.675"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="calorie-card__center">
            <div
              className="calorie-card__consumed"
              style={{ color: isOverGoal ? 'var(--color-red)' : undefined }}
            >
              {netCalories}
            </div>
            <div className="calorie-card__label">net kcal</div>
          </div>
        </div>
        <div className="calorie-card__stats">
          <div className="calorie-card__stat">
            <span className="calorie-card__stat-value calorie-card__stat-value--orange">
              {Math.round(summary.calories)}
            </span>
            <span className="calorie-card__stat-label">Eaten</span>
          </div>
          <div className="calorie-card__divider" />
          <div className="calorie-card__stat">
            <span className="calorie-card__stat-value" style={{ color: 'var(--color-blue)' }}>
              {caloriesBurned}
            </span>
            <span className="calorie-card__stat-label">Burned</span>
          </div>
          <div className="calorie-card__divider" />
          <div className="calorie-card__stat">
            <span className="calorie-card__stat-value calorie-card__stat-value--green">
              {remaining}
            </span>
            <span className="calorie-card__stat-label">Remaining</span>
          </div>
        </div>
      </div>

      {/* Macro bars */}
      <div className="card">
        <h2 className="card__title">Macronutrients</h2>
        <NutritionBar label="Protein" value={summary.protein} goal={goals.protein} unit="g" macro="protein" />
        <NutritionBar label="Carbohydrates" value={summary.carbs} goal={goals.carbs} unit="g" macro="carbs" />
        <NutritionBar label="Fat" value={summary.fat} goal={goals.fat} unit="g" macro="fat" />
        <NutritionBar label="Fiber" value={summary.fiber} goal={goals.fiber} unit="g" macro="fiber" />
      </div>

      {/* Water tracker */}
      <WaterTracker
        goal={goals.waterGlasses}
        consumed={waterConsumed}
        onUpdate={onWaterUpdate}
      />

      {/* Weekly progress */}
      <WeeklyProgress logs={logs} goals={goals} />

      {/* Meal breakdown */}
      <div className="card">
        <h2 className="card__title">Today's Meals</h2>
        {entries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">🍽️</div>
            <p className="empty-state__text">No meals logged yet</p>
            <button className="btn btn--primary" onClick={() => onNavigate('search')}>
              Log Your First Meal
            </button>
          </div>
        ) : (
          Object.entries(mealGroups).map(([mealType, mealEntries]) => (
            <div key={mealType} className="meal-group">
              <div className="meal-group__header">
                <span className="meal-group__name">{MEAL_LABELS[mealType] ?? mealType}</span>
                <span className="meal-group__cal">
                  {formatNum(mealEntries.reduce((s, e) => s + e.calories, 0), 0)} kcal
                </span>
              </div>
              {mealEntries.map((entry) => (
                <div key={entry.id} className="meal-group__item">
                  <span className="meal-group__food">{entry.foodName}</span>
                  <span className="meal-group__macros">
                    {formatNum(entry.servings, 1)}× · {Math.round(entry.calories)} kcal · P:{formatNum(entry.protein)}g
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
