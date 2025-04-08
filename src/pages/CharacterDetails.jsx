import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../Api';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../context/FavoritesContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(c => c.id === parseInt(id));
  const navigate = useNavigate();


  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [id]);

  const handleFavoriteClick = () => {
    if (character) {
      toggleFavorite(character);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!character) return <Typography>Character not found</Typography>;

  return (
    <Box
      sx={{
        minHeight: '110vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
       <IconButton
    onClick={() => navigate(-1)}
    sx={{
      position: 'absolute',
      top: 80,
      left: 10,
      color: '#43ff64',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      '&:hover': {
        backgroundColor: '#43ff64',
        color: '#0f172a',
      },
    }}
  >
    <ArrowBackIcon />
  </IconButton>
      <Box
        sx={{
          position: 'relative',
          maxWidth: 900,
          width: '100%',
          borderRadius: 4,
          p: 3,
          backgroundColor: 'rgba(27, 38, 59, 0.9)', 
          color: '#ffffff',
          border: '2px solid #43ff64',
          backdropFilter: 'blur(5px)', 
        }}
      >
        
        <Avatar
          src={character.image}
          alt={character.name}
          sx={{
            width: 150,
            height: 150,
            position: 'absolute',
            top: -50,
            left: { xs: '50%', sm: -50 },
            transform: { xs: 'translateX(-50%)', sm: 'none' },
            border: '4px solid #43ff64',
            boxShadow: '0 0 15px #43ff64',
            backgroundColor: 'transparent', 
          }}
        />

        <Box sx={{ ml: { xs: 0, sm: 12 }, mt: { xs: 8, sm: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ color: '#43ff64', fontWeight: 'bold' }}>
              {character.name}
            </Typography>
            <IconButton onClick={handleFavoriteClick} sx={{ ml: 1.5 }}>
              <FavoriteIcon color={isFavorite ? 'error' : 'disabled'} fontSize="large" />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              label={character.status}
              color={
                character.status === 'Alive' ? 'success' :
                character.status === 'Dead' ? 'error' : 'warning'
              }
              sx={{ fontWeight: 'bold' }}
            />
            <Chip label={character.species} sx={{ backgroundColor: '#4cc9f0', color: '#000' }} />
            <Chip label={character.gender} sx={{ backgroundColor: '#f72585', color: '#fff' }} />
          </Box>

          <Typography variant="body1" paragraph>
            <strong>Origin:</strong> {character.origin.name}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Last known location:</strong> {character.location.name}
          </Typography>

          {character.type && (
            <Typography variant="body1" paragraph>
              <strong>Type:</strong> {character.type}
            </Typography>
          )}

          <Typography variant="h6" sx={{ mt: 2, mb: 0, color: '#43ff64' }}>
            Episodes
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              p: 2,
              borderRadius: 2,
              justifyContent: 'flex-start',
            }}
          >
            {character.episode.map((ep, index) => {
              const episodeId = ep.split('/').pop();
              return (
                <Box
                  key={index}
                  component="a"
                  href={ep}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: 'none',
                    px: 2,
                    py: 0.7,
                    borderRadius: 2,
                    backgroundColor: 'rgba(30, 41, 59, 0.8)',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#43ff64',
                      color: '#0f172a',
                    },
                  }}
                >
                  Ep {episodeId}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CharacterDetails;