import { useState, useCallback, useEffect } from 'react';
import type { ActivityEntry, DailyActivity } from '../types';
import { getTodayDate } from '../utils/nutrition';

const ACTIVITY_KEY = 'wellfuel_activity';

function loadActivity(): DailyActivity[] {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]') as DailyActivity[];
  } catch {
    return [];
  }
}

export function useActivity(selectedDate: string) {
  const [activityLogs, setActivityLogs] = useState<DailyActivity[]>(loadActivity);

  useEffect(() => {
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activityLogs));
  }, [activityLogs]);

  const todayActivities = useCallback((): ActivityEntry[] => {
    return activityLogs.find((l) => l.date === selectedDate)?.entries ?? [];
  }, [activityLogs, selectedDate]);

  const addActivity = useCallback(
    (entry: Omit<ActivityEntry, 'id' | 'loggedAt'>) => {
      const fullEntry: ActivityEntry = {
        ...entry,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        loggedAt: new Date().toISOString(),
      };
      setActivityLogs((prev) => {
        const existing = prev.find((l) => l.date === selectedDate);
        if (existing) {
          return prev.map((l) =>
            l.date === selectedDate
              ? { ...l, entries: [...l.entries, fullEntry] }
              : l
          );
        }
        return [...prev, { date: selectedDate, entries: [fullEntry] }];
      });
    },
    [selectedDate]
  );

  const removeActivity = useCallback((id: string) => {
    setActivityLogs((prev) =>
      prev.map((l) => ({ ...l, entries: l.entries.filter((e) => e.id !== id) }))
    );
  }, []);

  const getTotalBurned = useCallback(
    (date?: string): number => {
      const d = date ?? selectedDate;
      return (
        activityLogs.find((l) => l.date === d)?.entries.reduce(
          (sum, e) => sum + e.caloriesBurned,
          0
        ) ?? 0
      );
    },
    [activityLogs, selectedDate]
  );

  return {
    activityLogs,
    todayActivities,
    addActivity,
    removeActivity,
    getTotalBurned,
  };
}

export function useActivityStandalone() {
  const today = getTodayDate();
  return useActivity(today);
}
