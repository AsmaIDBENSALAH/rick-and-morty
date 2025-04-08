import React from 'react';
import { Button, Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        my: 4,
        px: 3,
        py: 1,
      }}
    >
      <IconButton
        onClick={handlePrev}
        disabled={currentPage === 1}
        sx={{
          color: '#6b7280', 
          border: '2px solid #e5e7eb',
          backgroundColor: '#f3f4f6', 
          '&:hover': {
            backgroundColor: '#e5e7eb',
            color: '#111827', 
          },
          '&:disabled': {
            color: '#9ca3af',
            borderColor: '#d1d5db',
            backgroundColor: '#f9fafb',
          },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <Typography
        sx={{
          color: '#111827', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          backgroundColor: '#e5e7eb', 
          px: 2,
          py: 0.5,
          borderRadius: 2,
        }}
      >
        {currentPage} / {totalPages}
      </Typography>

      <IconButton
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
        sx={{
          color: '#6b7280',
          border: '2px solid #e5e7eb',
          backgroundColor: '#f3f4f6',
          '&:hover': {
            backgroundColor: '#e5e7eb',
            color: '#111827',
          },
          '&:disabled': {
            color: '#9ca3af',
            borderColor: '#d1d5db',
            backgroundColor: '#f9fafb',
          },
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default Pagination;
