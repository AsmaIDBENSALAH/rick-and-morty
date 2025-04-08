import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Button, 
  useMediaQuery, 
  Menu, 
  MenuItem,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar 
    position="static" 
    elevation={10}
    sx={{ 
      background: 'linear-gradient(90deg, #0f172a 0%, #1b263b 100%)',
      borderBottom: '2px solid #43ff64',
      boxShadow: '0 0 20px #43ff64',
      mb: 4,
    }}
  >
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography 
        variant="h6" 
        component="div" 
        sx={{ 
          flexGrow: 1, 
          color: '#43ff64',
          fontWeight: 'bold',
          textShadow: '0 0 5px #43ff64',
        }}
      >
        Rick & Morty 
      </Typography>
  
      {isMobile ? (
        <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                backgroundColor: '#1e293b',
                color: 'white',
                border: '1px solid #43ff64',
                boxShadow: '0 0 10px #43ff64',
              },
            }}
          >
            <MenuItem 
              component={Link} 
              to="/" 
              onClick={handleClose}
              sx={{
                borderBottom: isActive('/') ? '2px solid #43ff64' : 'none',
                fontWeight: isActive('/') ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: '#334155',
                }
              }}
            >
              Characters
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/favorites" 
              onClick={handleClose}
              sx={{
                borderBottom: isActive('/favorites') ? '2px solid #43ff64' : 'none',
                fontWeight: isActive('/favorites') ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: '#334155',
                }
              }}
            >
              Favoris
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Button 
            component={Link} 
            to="/"
            sx={{
              color: 'white',
              mx: 1.5,
              px: 2,
              py: 1,
              borderBottom: isActive('/') ? '2px solid #43ff64' : 'none',
              fontWeight: isActive('/') ? 'bold' : 'normal',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#334155',
                color: '#43ff64',
                borderRadius: '5px',
              }
            }}
          >
            Characters
          </Button>
          <Button 
            component={Link} 
            to="/favorites"
            sx={{
              color: 'white',
              mx: 1.5,
              px: 2,
              py: 1,
              borderBottom: isActive('/favorites') ? '2px solid #43ff64' : 'none',
              fontWeight: isActive('/favorites') ? 'bold' : 'normal',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#334155',
                color: '#43ff64',
                borderRadius: '5px',
              }
            }}
          >
            Favoris
          </Button>
        </Box>
      )}
    </Toolbar>
  </AppBar>
  
  );
};

export default Navbar;