import { GameResult, GameCondition } from '../types/game';

export const generateDiceResult = (): number => {
  return Math.floor(Math.random() * 100) + 1; 
};

export const checkWinCondition = (
  result: number,
  threshold: number,
  condition: GameCondition
): boolean => {
  if (condition === 'greater') {
    return result > threshold;
  } else {
    return result < threshold;
  }
};

export const createGameResult = (
  threshold: number,
  condition: GameCondition,
  result: number
): GameResult => {
  const isWin = checkWinCondition(result, threshold, condition);
  
  return {
    id: Date.now().toString(),
    threshold,
    condition,
    result,
    isWin,
    timestamp: new Date()
  };
};

export const addToHistory = (
  history: GameResult[],
  newResult: GameResult,
  maxSize: number = 10
): GameResult[] => {
  const updatedHistory = [newResult, ...history];
  return updatedHistory.slice(0, maxSize);
}; 