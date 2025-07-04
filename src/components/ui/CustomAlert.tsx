import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import React from 'react';

type CustomAlertProps = {
  isWin: boolean;
  title?: string;
  description?: string;
};

export const CustomAlert: React.FC<CustomAlertProps> = React.memo(({ isWin, title, description }) => {
  const bg = isWin ? 'var(--success-main, #2E7D32)' : 'var(--error-main, #D32F2F)';
  const height = isWin ? 48 : 76;
  const Icon = isWin ? CheckCircleIcon : ErrorIcon;

  return (
    <Box
      sx={{
        width: 600,
        borderRadius: 2,
        p: '6px 16px',
        background: bg,
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: 0,
        mb: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: '#fff',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 500,
          fontSize: isWin ? 14 : 16,
        }}
      >
        <Icon sx={{ mr: 1, fontSize: 28 }} />
        <span>{title}</span>
      </Box>
      {description && (
        <Box
          sx={{
            mt: 0.5,
            color: '#fff',
            fontFamily: 'Roboto, Arial, sans-serif',
            fontWeight: 500,
            fontSize: 14,
            marginLeft: 5,
          }}
        >
          {description}
        </Box>
      )}
    </Box>
  );
}); 