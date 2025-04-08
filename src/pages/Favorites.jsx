import React, { useState } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination'; 

const Favorites = () => {
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 12; 

 
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = favorites.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const totalPages = Math.ceil(favorites.length / charactersPerPage);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 1,
        px: { xs: 2, md: 4 },
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#43ff64',
            mb: 4,
            textAlign: 'center',
            textShadow: '0 0 10px #43ff64',
          }}
        >
          Favorite Characters 
        </Typography>

        {favorites.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mt: 6,
              color: 'rgba(255,255,255,0.6)',
              fontStyle: 'italic',
            }}
          >
            No favorite characters yet.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3} justifyContent="center">
              {currentCharacters.map((character) => (
                <Grid item xs={12} sm={6} md={4} key={character.id}>
                  <CharacterCard character={character} />
                </Grid>
              ))}
            </Grid>

            {totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Favorites;