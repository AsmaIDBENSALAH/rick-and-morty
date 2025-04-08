import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../Api';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
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
  const theme = useTheme();
  
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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

 
  const containerStyles = {
    mobile: {
      minHeight: '100vh',
      p: 0,
      pt: 8,
      alignItems: 'flex-start'
    },
    tablet: {
      minHeight: '100vh',
      p: 2,
      alignItems: 'center'
    },
    desktop: {
      minHeight: '110vh',
      p: 2,
      alignItems: 'center'
    }
  };

  const cardStyles = {
    mobile: {
      borderRadius: 0,
      p: 2,
      m: 0,
      border: 'none',
      mt: 4,
      width: '100%'
    },
    tablet: {
      borderRadius: 4,
      p: 3,
      m: 2,
      border: '2px solid #43ff64',
      width: '90%',
      maxWidth: 700
    },
    desktop: {
      borderRadius: 4,
      p: 3,
      m: 2,
      border: '2px solid #43ff64',
      width: '100%',
      maxWidth: 900
    }
  };

  const avatarStyles = {
    mobile: {
      width: 100,
      height: 100,
      top: -50,
      left: '50%',
      transform: 'translateX(-50%)'
    },
    tablet: {
      width: 130,
      height: 130,
      top: -50,
      left: -50
    },
    desktop: {
      width: 150,
      height: 150,
      top: -50,
      left: -50
    }
  };

  const getResponsiveStyle = (styles) => {
    if (isMobile) return styles.mobile;
    if (isTablet) return styles.tablet;
    return styles.desktop;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...getResponsiveStyle(containerStyles)
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: isMobile ? 'fixed' : 'absolute',
          top: isMobile ? 70 : 80,
          left: isMobile ? 5 : 10,
          zIndex: 1000,
          color: '#43ff64',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          '&:hover': {
            backgroundColor: '#43ff64',
            color: '#0f172a',
          },
        }}
      >
        <ArrowBackIcon fontSize={isMobile ? 'medium' : 'large'} />
      </IconButton>
      
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(27, 38, 59, 0.9)',
          color: '#ffffff',
          backdropFilter: 'blur(5px)',
          boxShadow: isMobile ? 'none' : '0 0 20px rgba(67, 255, 100, 0.3)',
          ...getResponsiveStyle(cardStyles)
        }}
      >
        <Avatar
          src={character.image}
          alt={character.name}
          sx={{
            position: 'absolute',
            border: '4px solid #43ff64',
            boxShadow: '0 0 15px #43ff64',
            backgroundColor: 'transparent',
            ...getResponsiveStyle(avatarStyles)
          }}
        />

        <Box sx={{ 
          ml: isMobile ? 0 : isTablet ? 10 : 12, 
          mt: isMobile ? 6 : 0,
          pt: isMobile ? 4 : 0 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left',
            pt: isMobile ? 2 : 0
          }}>
            <Typography 
              variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h4'} 
              sx={{ 
                color: '#43ff64', 
                fontWeight: 'bold',
                mr: isMobile ? 0 : 1.5,
                fontSize: isTablet ? '1.8rem' : null
              }}
            >
              {character.name}
            </Typography>
            <IconButton 
              onClick={handleFavoriteClick} 
              sx={{ 
                ml: isMobile ? 0 : 1.5,
                mt: isMobile ? 1 : 0
              }}
            >
              <FavoriteIcon 
                color={isFavorite ? 'error' : 'disabled'} 
                fontSize={isMobile ? 'medium' : 'large'} 
              />
            </IconButton>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            mb: 2, 
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <Chip
              label={character.status}
              color={
                character.status === 'Alive' ? 'success' :
                character.status === 'Dead' ? 'error' : 'warning'
              }
              sx={{ fontWeight: 'bold' }}
              size={isMobile ? 'small' : 'medium'}
            />
            <Chip 
              label={character.species} 
              sx={{ backgroundColor: '#4cc9f0', color: '#000' }} 
              size={isMobile ? 'small' : 'medium'}
            />
            <Chip 
              label={character.gender} 
              sx={{ backgroundColor: '#f72585', color: '#fff' }} 
              size={isMobile ? 'small' : 'medium'}
            />
          </Box>

          <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Typography variant={isTablet ? 'body1' : 'body1'} paragraph>
              <strong>Origin:</strong> {character.origin.name}
            </Typography>
            <Typography variant={isTablet ? 'body1' : 'body1'} paragraph>
              <strong>Last known location:</strong> {character.location.name}
            </Typography>

            {character.type && (
              <Typography variant={isTablet ? 'body1' : 'body1'} paragraph>
                <strong>Type:</strong> {character.type}
              </Typography>
            )}
          </Box>

          <Typography 
            variant={isMobile ? 'subtitle1' : 'h6'} 
            sx={{ 
              mt: 2, 
              mb: 1, 
              color: '#43ff64',
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isTablet ? '1.2rem' : null
            }}
          >
            Episodes
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              p: isMobile ? 1 : 2,
              borderRadius: 2,
              justifyContent: isMobile ? 'center' : 'flex-start',
              maxHeight: isMobile ? '200px' : isTablet ? '250px' : 'none',
              overflowY: 'auto'
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
                    px: isMobile ? 1 : isTablet ? 1.5 : 2,
                    py: isMobile ? 0.5 : 0.7,
                    borderRadius: 2,
                    backgroundColor: 'rgba(30, 41, 59, 0.8)',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.875rem',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#43ff64',
                      color: '#0f172a',
                    },
                    flex: isMobile ? '0 0 calc(33% - 8px)' : isTablet ? '0 0 calc(25% - 8px)' : 'none',
                    textAlign: 'center',
                    minWidth: isTablet ? '80px' : 'none'
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