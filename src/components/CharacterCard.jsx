import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Chip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const CharacterCard = ({ character }) => {
  const statusColor = {
    Alive: 'success',
    Dead: 'error',
    unknown: 'warning'
  };
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(c => c.id === character.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character);
  };

  return (
    <Link to={`/character/${character.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card
        sx={{
          width: 245,
          height: 275,
          display: 'flex',
          flexDirection: 'column',
          m: 1,
          border: '2px solid #43ff64',
          backgroundColor: 'rgba(27, 38, 59, 0.85)',
          color: '#ffffff',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 0 15px #43ff64',
            transform: 'translateY(-4px)',
          }
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={character.image}
          alt={character.name}
          sx={{
            height: 140,
            objectFit: 'cover',
            borderBottom: '2px solid #43ff64'
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            p: 1.5,
            '&:last-child': { pb: 1.5 }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#43ff64'
              }}
            >
              {character.name}
            </Typography>
            <IconButton
              onClick={handleFavoriteClick}
              sx={{ color: isFavorite ? 'error.main' : 'grey.500', p: 0.5 }}
              size="small"
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 0.5,
              my: 1
            }}
          >
            <Chip
              label={character.status}
              color={statusColor[character.status]}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
            <Chip label={character.species} size="small" sx={{ backgroundColor: '#4cc9f0', color: '#000' }} />
            <Chip label={character.gender} size="small" sx={{ backgroundColor: '#f72585', color: '#fff' }} />
          </Box>

          <Typography
            variant="body2"
            sx={{
              fontSize: '0.7rem',
              color: '#cbd5e1'
            }}
          >
            Last known location: <br />
            <strong>{character.location.name}</strong>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CharacterCard;
