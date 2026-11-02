'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getLocalQuizCount } from '../services/localQuizStorage';

interface StorageModeContextType {
  isLocalMode: boolean;
  isChecking: boolean;
  localCount: number;
  lastChecked: Date | null;
  serverStatus: 'online' | 'offline' | 'checking';
  checkBackendHealth: () => Promise<boolean>;
  setLocalMode: (active: boolean) => void;
  refreshLocalCount: () => void;
}

const StorageModeContext = createContext<StorageModeContextType | undefined>(undefined);

const PREF_KEY = 'quiz_builder_storage_mode';

const getApiBase = (): string => {
  if (typeof process !== 'undefined' && process.env) {
    return (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || '').replace(/\/$/, '');
  }
  return '';
};

export const StorageModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocalMode, setIsLocalMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem(PREF_KEY);
    return saved !== null ? saved === 'local' : true;
  });

  const [serverStatus, setServerStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [localCount, setLocalCount] = useState<number>(() => getLocalQuizCount());
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const refreshLocalCount = useCallback(() => {
    setLocalCount(getLocalQuizCount());
  }, []);

  const checkBackendHealth = useCallback(async (): Promise<boolean> => {
    setIsChecking(true);
    setServerStatus('checking');

    const apiBase = getApiBase();

    // Check both /health and /api/quizzes with a quick 3.5s timeout
    const testUrls = apiBase
      ? [`${apiBase}/health`, `${apiBase}/api/quizzes`]
      : ['/health', '/api/quizzes'];

    let isHealthy = false;

    for (const url of testUrls) {
      try {
        const response = await axios.get(url, { timeout: 3500 });
        if (response.status >= 200 && response.status < 300) {
          isHealthy = true;
          break;
        }
      } catch {
        // Continue to fallback check
      }
    }

    setLastChecked(new Date());
    setIsChecking(false);

    if (isHealthy) {
      setServerStatus('online');
      setIsLocalMode(false);
      localStorage.setItem(PREF_KEY, 'cloud');
      return true;
    } else {
      setServerStatus('offline');
      setIsLocalMode(true);
      localStorage.setItem(PREF_KEY, 'local');
      return false;
    }
  }, []);

  // Initial check on mount
  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

  const setLocalMode = (active: boolean) => {
    setIsLocalMode(active);
    localStorage.setItem(PREF_KEY, active ? 'local' : 'cloud');
  };

  return (
    <StorageModeContext.Provider
      value={{
        isLocalMode,
        isChecking,
        localCount,
        lastChecked,
        serverStatus,
        checkBackendHealth,
        setLocalMode,
        refreshLocalCount,
      }}
    >
      {children}
    </StorageModeContext.Provider>
  );
};

export const useStorageMode = (): StorageModeContextType => {
  const context = useContext(StorageModeContext);
  if (!context) {
    throw new Error('useStorageMode must be used within a StorageModeProvider');
  }
  return context;
};
