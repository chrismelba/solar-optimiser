import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const EntitySelector = ({ label, value, onChange, entityType }) => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get('/api/entities');
        const filteredEntities = response.data.filter(entity => {
          if (entityType === 'solar') {
            return entity.entity_id.includes('sensor') && 
                   (entity.entity_id.includes('solar') || 
                    entity.entity_id.includes('power') || 
                    entity.entity_id.includes('generation'));
          } else if (entityType === 'grid') {
            return entity.entity_id.includes('sensor') && 
                   (entity.entity_id.includes('grid') || 
                    entity.entity_id.includes('power') || 
                    entity.entity_id.includes('import'));
          } else if (entityType === 'battery') {
            return entity.entity_id.includes('sensor') && 
                   (entity.entity_id.includes('battery') || 
                    entity.entity_id.includes('percentage'));
          }
          return true;
        });
        setEntities(filteredEntities);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch entities');
        setLoading(false);
      }
    };

    fetchEntities();
  }, [entityType]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {entities.map((entity) => (
          <MenuItem key={entity.entity_id} value={entity.entity_id}>
            {entity.attributes?.friendly_name || entity.entity_id}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EntitySelector; 