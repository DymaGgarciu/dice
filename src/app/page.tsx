'use client';
import React, { useState, useCallback } from 'react';
import { Box, Stack, Paper } from '@mui/material';
import { CustomAlert } from '@/components/ui/CustomAlert';
import { PlayButton } from '@/components/ui/PlayButton';
import { CustomRadio } from '@/components/ui/CustomRadio';
import CustomSlider from '@/components/ui/CustomSlider';
import { CustomHistoryTable } from '@/components/ui/CustomHistoryTable';
import { ResultCard } from '@/components/ui/ResultCard';
import { useGameContext } from '@/context/GameContext';

export default function Home() {
  const { state, dispatch } = useGameContext();
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [alertDesc, setAlertDesc] = useState<string>('');

  const handlePlay = useCallback(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 100) + 1;
      setResult(rolled);
      let win = false;
      let desc = '';
      if (state.condition === 'greater') {
        win = rolled > state.threshold;
        desc = win ? '' : 'Number was higher';
      } else {
        win = rolled < state.threshold;
        desc = win ? '' : 'Number was lower';
      }
      setIsWin(win);
      setAlertDesc(desc);
      setShowResult(true);
      dispatch({
        type: 'ADD_RESULT',
        payload: {
          id: Date.now().toString(),
          threshold: state.threshold,
          condition: state.condition,
          result: rolled,
          isWin: win,
          timestamp: new Date(),
        },
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 400);
  }, [dispatch, state.condition, state.threshold]);

  const handleSliderChange = useCallback((_event: Event, value: number) => {
    dispatch({ type: 'SET_THRESHOLD', payload: value });
  }, [dispatch]);

  return (
    <Box sx={{ p: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff' }}>
      <Box sx={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: 600 }}>
        {showResult && isWin !== null && (
          <CustomAlert isWin={isWin} title={isWin ? 'You won' : 'You lost'} description={alertDesc} />
        )}
      </Box>
      <Box sx={{  mt: 15,mb: 2, width: 320, mx: 'auto' }}>
        <Paper elevation={0} sx={{ bgcolor: '#fff', borderRadius: 3,  mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ResultCard value={result !== null ? result : 100} />
          <Stack direction="row" spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <CustomRadio label="Under" checked={state.condition === 'less'} value="less" onChange={() => dispatch({ type: 'SET_CONDITION', payload: 'less' })} />
            <CustomRadio label="Over" checked={state.condition === 'greater'} value="greater" onChange={() => dispatch({ type: 'SET_CONDITION', payload: 'greater' })} />
          </Stack>
          <Box sx={{ width: '100%', mt: 2, mb: 2, position: 'relative' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', left: 0, right: 0, top: 44, width: '100%', p: '0 2px' }}>
              <span style={{ fontSize: 12, color: '#888' }}>0</span>
              <span style={{ fontSize: 12, color: '#888' }}>100</span>
            </Box>
            <CustomSlider value={state.threshold} onChange={handleSliderChange} />
          </Box>
          <PlayButton onClick={handlePlay} disabled={state.isLoading} >
            PLAY
          </PlayButton>
        </Paper>
      </Box>
      <Box sx={{ width: 600, mt: 2 }}>
        <CustomHistoryTable history={state.history} />
      </Box>
    </Box>
  );
}
