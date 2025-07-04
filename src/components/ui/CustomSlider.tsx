'use client';
import * as React from 'react';
import Slider from '@mui/material/Slider';

const marks = [
  { value: 0 },
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 100 },
];

interface CustomSliderProps {
  value: number;
  onChange: (event: Event, value: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ value, onChange }) => {
  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    onChange(event, Array.isArray(newValue) ? newValue[0] : newValue);
  };
  return (
    <div style={{ width: '100%', height: 62, display: 'flex', alignItems: 'center' }}>
      <Slider
        size="small"
        value={value}
        onChange={handleChange}
        marks={marks}
        min={0}
        max={100}
        valueLabelDisplay="auto"
        color="secondary"
        sx={{ color: '#9C27B0', width: '100%' }}
      />
    </div>
  );
};

export default CustomSlider; 