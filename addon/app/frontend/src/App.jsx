import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EntitySelector from './components/EntitySelector';
import BatteryCapacityInput from './components/BatteryCapacityInput';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [solarEntity, setSolarEntity] = useState('');
  const [gridEntity, setGridEntity] = useState('');
  const [batteryEntity, setBatteryEntity] = useState('');
  const [batteryCapacity, setBatteryCapacity] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load saved configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await axios.get('/api/config');
        const config = response.data;
        if (config) {
          setSolarEntity(config.solarEntity || '');
          setGridEntity(config.gridEntity || '');
          setBatteryEntity(config.batteryEntity || '');
          setBatteryCapacity(config.batteryCapacity || 10);
        }
      } catch (error) {
        console.error('Failed to load configuration:', error);
      }
    };
    loadConfig();
  }, []);

  const handleSave = async () => {
    try {
      const config = {
        solarEntity,
        gridEntity,
        batteryEntity,
        batteryCapacity
      };
      await axios.post('/api/config', config);
      setSnackbar({
        open: true,
        message: 'Configuration saved successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save configuration',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Solar Optimiser Configuration
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Entity Selection
            </Typography>
            <EntitySelector
              label="Solar Generation Entity"
              value={solarEntity}
              onChange={setSolarEntity}
              entityType="solar"
            />
            <EntitySelector
              label="Grid Power Entity"
              value={gridEntity}
              onChange={setGridEntity}
              entityType="grid"
            />
            <EntitySelector
              label="Battery Percentage Entity"
              value={batteryEntity}
              onChange={setBatteryEntity}
              entityType="battery"
            />
          </Box>

          <BatteryCapacityInput
            value={batteryCapacity}
            onChange={setBatteryCapacity}
          />

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Configuration
            </Button>
          </Box>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App; 