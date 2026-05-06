import React from 'react';
import type { DailyLog, UserGoals } from '../types';
import { summarizeEntries, getLast7Days } from '../utils/nutrition';

interface WeeklyProgressProps {
  logs: DailyLog[];
  goals: UserGoals;
}

function getShortDay(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2);
}

const BAR_W = 30;
const GAP = 6;
const CHART_H = 90;
const CHART_W = 7 * (BAR_W + GAP) - GAP;

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ logs, goals }) => {
  const days = getLast7Days();
  const data = days.map((date) => {
    const log = logs.find((l) => l.date === date);
    const calories = log ? summarizeEntries(log.entries).calories : 0;
    return { date, calories, label: getShortDay(date) };
  });

  const maxVal = Math.max(...data.map((d) => d.calories), goals.calories, 500);
  const goalY = CHART_H - (goals.calories / maxVal) * CHART_H;
  const today = days[6];

  return (
    <div className="card weekly-progress">
      <h2 className="card__title">📈 Weekly Calories</h2>
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H + 22}`}
        width="100%"
        style={{ overflow: 'visible' }}
        aria-label="7-day calorie chart"
      >
        {/* Goal dashed line */}
        <line
          x1={0}
          y1={goalY}
          x2={CHART_W}
          y2={goalY}
          stroke="var(--color-orange)"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          opacity="0.8"
        />
        {data.map((day, i) => {
          const barH = maxVal > 0 ? (day.calories / maxVal) * CHART_H : 0;
          const x = i * (BAR_W + GAP);
          const y = CHART_H - barH;
          const isOver = day.calories > goals.calories;
          const isToday = day.date === today;

          return (
            <g key={day.date}>
              {barH > 0 && (
                <rect
                  x={x}
                  y={y}
                  width={BAR_W}
                  height={barH}
                  rx={4}
                  fill={
                    isOver
                      ? 'var(--color-red)'
                      : isToday
                      ? 'var(--color-primary)'
                      : 'var(--weekly-bar-rest, #86efac)'
                  }
                  opacity={isToday ? 1 : 0.75}
                />
              )}
              {barH === 0 && (
                <rect
                  x={x}
                  y={CHART_H - 3}
                  width={BAR_W}
                  height={3}
                  rx={2}
                  fill="var(--color-border)"
                />
              )}
              <text
                x={x + BAR_W / 2}
                y={CHART_H + 14}
                textAnchor="middle"
                fontSize="9"
                fill="var(--color-text-muted)"
                fontWeight={isToday ? '700' : '400'}
              >
                {day.label}
              </text>
              {day.calories > 0 && (
                <text
                  x={x + BAR_W / 2}
                  y={Math.max(y - 3, 8)}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="var(--color-text-muted)"
                >
                  {Math.round(day.calories / 10) * 10}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="weekly-progress__legend">
        <span className="weekly-progress__goal-note">— Goal: {goals.calories} kcal/day</span>
        <span className="weekly-progress__today-note">■ Today</span>
      </div>
    </div>
  );
};

export default WeeklyProgress;
