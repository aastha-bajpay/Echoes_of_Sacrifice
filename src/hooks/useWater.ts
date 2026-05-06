import { useState, useCallback, useEffect } from 'react';
import { getTodayDate } from '../utils/nutrition';

const WATER_KEY = 'wellfuel_water';

type WaterData = Record<string, number>;

function loadWater(): WaterData {
  try {
    return JSON.parse(localStorage.getItem(WATER_KEY) || '{}') as WaterData;
  } catch {
    return {};
  }
}

export function useWater(selectedDate: string) {
  const [waterData, setWaterData] = useState<WaterData>(loadWater);

  useEffect(() => {
    localStorage.setItem(WATER_KEY, JSON.stringify(waterData));
  }, [waterData]);

  const getGlasses = useCallback(
    (date?: string): number => waterData[date ?? selectedDate] ?? 0,
    [waterData, selectedDate]
  );

  const setGlasses = useCallback(
    (glasses: number, date?: string) => {
      const d = date ?? selectedDate;
      setWaterData((prev) => ({ ...prev, [d]: Math.max(0, glasses) }));
    },
    [selectedDate]
  );

  return { getGlasses, setGlasses };
}

export function useWaterStandalone() {
  const today = getTodayDate();
  return useWater(today);
}
