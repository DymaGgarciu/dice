import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import React from 'react';

interface CustomRadioProps {
  label: string;
  checked: boolean;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
}

export const CustomRadio: React.FC<CustomRadioProps> = React.memo(({
  label,
  checked,
  value,
  onChange,
  disabled = false,
}) => (
  <FormControlLabel
    control={
      <Radio
        checked={checked}
        value={value}
        size="small"
        color="secondary"
        onChange={onChange}
        sx={{
          width: 38,
          height: 38,
          opacity: 1,
          borderRadius: 4,
        }}
        disabled={disabled}
      />
    }
    label={label}
    labelPlacement="start"
    disabled={disabled}
    sx={{
      width: 81,
      height: 38,
      opacity: 1,
      borderRadius: 4,
    }}
  />
)); 