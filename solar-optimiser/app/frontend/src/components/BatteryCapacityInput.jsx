import React from 'react';
import {
  Box,
  TextField,
  Slider,
  Typography,
  Paper
} from '@mui/material';

const BatteryCapacityInput = ({ value, onChange }) => {
  const handleNumberChange = (event) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    if (newValue === '' || newValue > 0) {
      onChange(newValue);
    }
  };

  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Battery Capacity (kWh)
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          type="number"
          value={value}
          onChange={handleNumberChange}
          inputProps={{ min: 0, step: 0.1 }}
          sx={{ width: 120 }}
        />
        <Box sx={{ flex: 1, px: 2 }}>
          <Slider
            value={value}
            onChange={handleSliderChange}
            min={1}
            max={45}
            step={0.1}
            marks={[
              { value: 1, label: '1' },
              { value: 45, label: '45' }
            ]}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default BatteryCapacityInput; 