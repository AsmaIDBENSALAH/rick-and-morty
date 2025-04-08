import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, Box } from '@mui/material';

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    status: '',
    species: '',
    gender: ''
  });

  const handleChange = (name) => (event) => {
    const newFilters = {
      ...filters,
      [name]: event.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: 950,
      mx: 'auto', 
      display: 'flex',
      justifyContent: 'center', 
      p: 2 
    }}>
      <Grid container spacing={3}> 
        {[
          { 
            name: 'status', 
            label: 'Statut', 
            options: [
              { value: '', label: 'Tous' },
              { value: 'alive', label: 'Alive' },
              { value: 'dead', label: 'Dead' },
              { value: 'unknown', label: 'Unknown' }
            ]
          },
          { 
            name: 'species', 
            label: 'Species', 
            options: [
              { value: '', label: 'Tous' },
              { value: 'human', label: 'Human' },
              { value: 'alien', label: 'Alien' },
              { value: 'humanoid', label: 'Humanoid' },
              { value: 'robot', label: 'Robot' }
            ]
          },
          { 
            name: 'gender', 
            label: 'Gender', 
            options: [
              { value: '', label: 'Tous' },
              { value: 'female', label: 'Female' },
              { value: 'male', label: 'Male' },
              { value: 'genderless', label: 'Genderless' },
              { value: 'unknown', label: 'Unknown' }
            ]
          }
        ].map((filter) => (
          <Grid item xs={12} md={4} key={filter.name} sx={{ minWidth: 300 }}> 
            <FormControl fullWidth sx={{ 
              '& .MuiInputBase-root': {
                minWidth: '100%',
              }
            }}>
              <InputLabel sx={{ 
                color: '#aaaaaa',
                '&.Mui-focused': {
                  color: '#39ff14',
                  textShadow: '0 0 5px #39ff14'
                }
              }}>
                {filter.label}
              </InputLabel>
              <Select
                value={filters[filter.name]}
                onChange={handleChange(filter.name)}
                label={filter.label}
                sx={{
                  color: '#ffffff',
                  minWidth: '100%', 
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#333333',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#39ff14',
                    boxShadow: '0 0 8px #39ff14'
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#666666',
                  },
                  '&:hover .MuiSvgIcon-root': {
                    color: '#39ff14',
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#0a0a0a',
                      color: '#ffffff',
                      minWidth: '300px !important', 
                      '& .MuiMenuItem-root': {
                        '&:hover': {
                          backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(57, 255, 20, 0.2)',
                          color: '#39ff14'
                        }
                      }
                    }
                  }
                }}
              >
                {filter.options.map((option) => (
                  <MenuItem 
                    key={option.value} 
                    value={option.value}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                      }
                    }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Filter;