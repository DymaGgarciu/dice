import React from 'react';
import { Box } from '@mui/material';

interface ResultCardProps {
  value: number;
}

export const ResultCard: React.FC<ResultCardProps> = React.memo(({ value }) => (
  <Box
    sx={{
      width: '100%',
      height: 200,
      borderRadius: 3,
      background: '#f5f5f5',
      boxShadow: 'none',
      opacity: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, Arial, sans-serif',
      fontWeight: 300,
      fontSize: 96,
      lineHeight: 1.17,
      letterSpacing: '-1.5px',
      userSelect: 'none',
    }}
  >
    {value}
  </Box>
));

ResultCard.displayName = "ResultCard"; 