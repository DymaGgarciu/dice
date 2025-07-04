import Button from '@mui/material/Button';
import React from 'react';

type PlayButtonProps = React.ComponentProps<typeof Button> & {
  children?: React.ReactNode;
};

export const PlayButton: React.FC<PlayButtonProps> = ({ children = 'Play', ...props }) => (
  <Button
    variant="contained"
    color="secondary"
    size="large"
    sx={{
      p: '8px 22px',
      background: 'var(--secondary-main, #9C27B0)',
      opacity: 1,
      boxShadow: `
        0px 3px 1px -2px #00000033,
        0px 2px 2px 0px #00000024,
        0px 1px 5px 0px #0000001F
      `
    }}
    {...props}
  >
    {children}
  </Button>
); 