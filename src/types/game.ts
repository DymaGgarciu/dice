export interface GameResult {
  id: string;
  threshold: number;
  condition: 'greater' | 'less';
  result: number;
  isWin: boolean;
  timestamp: Date;
}

export interface GameState {
  threshold: number;
  condition: 'greater' | 'less';
  history: GameResult[];
  isLoading: boolean;
}

export type GameCondition = 'greater' | 'less'; 