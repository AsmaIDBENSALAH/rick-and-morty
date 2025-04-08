import React, { useState } from 'react';
import { 
  TextField, 
  InputAdornment,
  IconButton,
  Box,
  Fade
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Close as CloseIcon 
} from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Box sx={{ 
      maxWidth: 600, 
      mx: 'auto', 
      mb: 4,
      transition: 'all 0.3s ease',
      transform: focused ? 'scale(1.02)' : 'scale(1)'
    }}>
      <TextField
        label="Search Characters"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            boxShadow: focused ? '0 0 15px rgba(57, 255, 20, 0.2)' : 'none',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#39ff14', 
                borderWidth: '2px'
              }
            }
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.3)', 
          },
          '& .MuiInputLabel-outlined': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
              color: '#39ff14', 
            }
          },
          '& .MuiOutlinedInput-input': {
            py: 1.5,
            color: 'white',
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon 
                sx={{ 
                  fontSize: 28,
                  color: focused ? '#39ff14' : 'rgba(255, 255, 255, 0.7)'
                }} 
              />
            </InputAdornment>
          ),
          endAdornment: (
            <Fade in={searchTerm.length > 0}>
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  aria-label="clear search"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#39ff14',
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            </Fade>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;