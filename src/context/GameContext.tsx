'use client';
import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { GameResult, GameCondition } from '@/types/game';

interface GameState {
  threshold: number;
  condition: GameCondition;
  history: GameResult[];
  isLoading: boolean;
}

type GameAction =
  | { type: 'SET_THRESHOLD'; payload: number }
  | { type: 'SET_CONDITION'; payload: GameCondition }
  | { type: 'ADD_RESULT'; payload: GameResult }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_HISTORY'; payload: GameResult[] };

const initialState: GameState = {
  threshold: 50,
  condition: 'greater',
  history: [],
  isLoading: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_THRESHOLD':
      return { ...state, threshold: action.payload };
    case 'SET_CONDITION':
      return { ...state, condition: action.payload };
    case 'ADD_RESULT': {
      const newHistory = [action.payload, ...state.history].slice(0, 10);
      Cookies.set('dice_history', JSON.stringify(newHistory), { expires: 365 });
      return { ...state, history: newHistory };
    }
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const cookie = Cookies.get('dice_history');
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie) as GameResult[];
        dispatch({ type: 'SET_HISTORY', payload: parsed });
      } catch {}
    }
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within GameProvider');
  return ctx;
} 