import React, { useState, useMemo, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  CssBaseline,
  Chip,
  Badge,
  Menu,
  ListItemIcon,
  ListItemText as MuiListItemText
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pcParts, compatibilityRules, calculateTotalPowerDraw, checkBottlenecks } from './data/pcParts';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import PaletteIcon from '@mui/icons-material/Palette';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BrushIcon from '@mui/icons-material/Brush';
import GrassIcon from '@mui/icons-material/Grass';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import AudioVisualizer from './components/AudioVisualizer';

// Theme definitions
const themes = {
  black: {
    name: 'Dark',
    icon: <Brightness4Icon />,
    palette: {
      mode: 'dark',
      primary: {
        main: '#5865F2', // Discord blue
        light: '#7983F5',
        dark: '#4752C4',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#57F287', // Discord green
        light: '#7CF4A3',
        dark: '#3FB868',
        contrastText: '#000000',
      },
      error: {
        main: '#ED4245', // Discord red
      },
      warning: {
        main: '#FEE75C', // Discord yellow
      },
      background: {
        default: '#36393F', // Discord dark background
        paper: '#2F3136',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B9BBBE',
      },
    },
  },
  midnight: {
    name: 'Midnight',
    icon: <NightlightIcon />,
    palette: {
      mode: 'dark',
      primary: {
        main: '#FF1744', // Bright red
        light: '#FF616F',
        dark: '#C4001D',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#D50000', // Darker red
        light: '#FF5131',
        dark: '#9B0000',
        contrastText: '#ffffff',
      },
      error: {
        main: '#FF1744', // Bright red
      },
      warning: {
        main: '#FFEA00', // Bright yellow
      },
      background: {
        default: '#0A0A0A', // Almost black
        paper: '#121212',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
      },
    },
  },
  white: {
    name: 'Light',
    icon: <Brightness7Icon />,
    palette: {
      mode: 'light',
      primary: {
        main: '#0366d6', // GitHub blue
        light: '#2188ff',
        dark: '#044289',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#28a745', // GitHub green
        light: '#34d058',
        dark: '#22863a',
        contrastText: '#ffffff',
      },
      error: {
        main: '#d73a49', // GitHub red
      },
      warning: {
        main: '#f6c644', // GitHub yellow
      },
      background: {
        default: '#f6f8fa', // GitHub light gray background
        paper: '#ffffff',
      },
      text: {
        primary: '#24292e', // GitHub dark text
        secondary: '#586069', // GitHub secondary text
      },
    },
  },
  purple: {
    name: 'Purple',
    icon: <BrushIcon />,
  palette: {
      mode: 'dark',
    primary: {
        main: '#9C27B0', // Purple
        light: '#BA68C8',
        dark: '#7B1FA2',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#E040FB', // Light purple
        light: '#E667FA',
        dark: '#C51162',
        contrastText: '#000000',
      },
      error: {
        main: '#F44336', // Red
      },
      warning: {
        main: '#FFC107', // Amber
      },
      background: {
        default: '#1A0F1F', // Dark purple-tinted background
        paper: '#2A1F2F',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
      },
    },
  },
  green: {
    name: 'Green',
    icon: <GrassIcon />,
    palette: {
      mode: 'dark',
      primary: {
        main: '#4CAF50', // Green
        light: '#81C784',
        dark: '#388E3C',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#8BC34A', // Light green
        light: '#AED581',
        dark: '#689F38',
        contrastText: '#000000',
      },
      error: {
        main: '#F44336', // Red
      },
      warning: {
        main: '#FFC107', // Amber
      },
      background: {
        default: '#0F1A0F', // Dark green-tinted background
        paper: '#1F2A1F',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
      },
    },
  },
};

const initialParts = {
  cpu: null,
  motherboard: null,
  ram: null,
  gpu: null,
  storage: null,
  psu: null,
  case: null
};

// Images mapping (placeholder for future real images)
const partImages = {
  cpu: {
    'cpu1': '/src/data/PcPartsPictures/cpu1.jpg',
    'cpu2': '/src/data/PcPartsPictures/cpu2.jpg',
    'cpu3': '/src/data/PcPartsPictures/cpu3.jpg',
    'cpu4': '/src/data/PcPartsPictures/cpu4.jpg',
    'cpu5': '/src/data/PcPartsPictures/cpu5.jpg'
  },
  motherboard: {
    'mb1': '/src/data/PcPartsPictures/mb1.jpg',
    'mb2': '/src/data/PcPartsPictures/mb2.jpg',
    'mb3': '/src/data/PcPartsPictures/mb3.jpg',
    'mb4': '/src/data/PcPartsPictures/mb4.jpg',
    'mb5': '/src/data/PcPartsPictures/mb5.jpg'
  },
  ram: {
    'ram1': '/src/data/PcPartsPictures/ram1.jpg',
    'ram2': '/src/data/PcPartsPictures/ram2.jpg',
    'ram3': '/src/data/PcPartsPictures/ram3.jpg',
    'ram4': '/src/data/PcPartsPictures/ram4.jpg',
    'ram5': '/src/data/PcPartsPictures/ram5.jpg'
  },
  gpu: {
    'gpu1': '/src/data/PcPartsPictures/gpu1.jpg',
    'gpu2': '/src/data/PcPartsPictures/gpu2.jpg',
    'gpu3': '/src/data/PcPartsPictures/gpu3.jpg',
    'gpu4': '/src/data/PcPartsPictures/gpu4.jpg',
    'gpu5': '/src/data/PcPartsPictures/gpu5.jpg'
  },
  storage: {
    'storage1': '/src/data/PcPartsPictures/ssd1.jpg',
    'storage2': '/src/data/PcPartsPictures/ssd2.jpg',
    'storage3': '/src/data/PcPartsPictures/ssd3.jpg',
    'storage4': '/src/data/PcPartsPictures/ssd4.jpg',
    'storage5': '/src/data/PcPartsPictures/ssd5.jpg'
  },
  psu: {
    'psu1': '/src/data/PcPartsPictures/psu1.jpg',
    'psu2': '/src/data/PcPartsPictures/psu2.jpg',
    'psu3': '/src/data/PcPartsPictures/psu3.jpg',
    'psu4': '/src/data/PcPartsPictures/psu4.jpg',
    'psu5': '/src/data/PcPartsPictures/psu5.jpg'
  },
  case: {
    'case1': '/src/data/PcPartsPictures/case1.jpg',
    'case2': '/src/data/PcPartsPictures/case2.jpg',
    'case3': '/src/data/PcPartsPictures/case3.jpg',
    'case4': '/src/data/PcPartsPictures/case4.jpg',
    'case5': '/src/data/PcPartsPictures/case5.jpg'
  }
};

function App() {
  const [selectedParts, setSelectedParts] = useState(initialParts);
  const [totalPrice, setTotalPrice] = useState(0);
  const [compatibilityIssues, setCompatibilityIssues] = useState([]);
  const [bottlenecks, setBottlenecks] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('black'); // Default to black theme
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('user');
    
    if (loggedIn && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'black';
    setCurrentTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);
  
  // Create theme based on current selection
  const theme = useMemo(() => {
    const baseTheme = themes[currentTheme];
    return createTheme({
      palette: baseTheme.palette,
      typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        h1: {
          fontWeight: 600,
        },
        h2: {
          fontWeight: 600,
        },
        h3: {
          fontWeight: 600,
        },
        h4: {
          fontWeight: 600,
        },
        h5: {
          fontWeight: 600,
        },
        h6: {
          fontWeight: 600,
        },
        button: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
      shape: {
        borderRadius: 6,
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
              borderRadius: 6,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 6,
              fontWeight: 500,
            },
            contained: {
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 6,
            },
          },
        },
      },
    });
  }, [currentTheme]);
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePartChange = (partType, partId) => {
    const selectedPart = pcParts[partType].find(p => p.id === partId);
    
    setSelectedParts(prev => {
      const newParts = {
        ...prev,
        [partType]: selectedPart
      };
      
      // Check compatibility
      const issues = [];
      
      // CPU and Motherboard compatibility
      if (newParts.cpu && newParts.motherboard) {
        if (!compatibilityRules.cpuMotherboard(newParts.cpu, newParts.motherboard)) {
          issues.push(`CPU socket (${newParts.cpu.socket}) is not compatible with motherboard socket (${newParts.motherboard.socket})`);
        }
      }
      
      // RAM and Motherboard compatibility
      if (newParts.ram && newParts.motherboard) {
        if (!compatibilityRules.ramMotherboard(newParts.ram, newParts.motherboard)) {
          issues.push(`RAM type (${newParts.ram.type}) is not compatible with motherboard`);
        }
      }
      
      // PSU wattage check
      if (newParts.psu) {
        const totalPower = calculateTotalPowerDraw(newParts);
        if (!compatibilityRules.psuWattage(totalPower, newParts.psu)) {
          issues.push(`PSU wattage (${newParts.psu.wattage}W) might not be sufficient for the build (estimated ${totalPower}W)`);
        }
      }
      
      // GPU and Case compatibility
      if (newParts.gpu && newParts.case) {
        if (!compatibilityRules.gpuCase(newParts.gpu, newParts.case)) {
          issues.push(`GPU might not fit in the selected case`);
        }
      }
      
      setCompatibilityIssues(issues);
      
      // Check for bottlenecks
      setBottlenecks(checkBottlenecks(newParts));
      
      // Calculate total price
      const price = Object.values(newParts).reduce((total, part) => {
        return total + (part ? part.price : 0);
      }, 0);
      setTotalPrice(price);
      
      return newParts;
    });
  };

  // Count selected parts
  const selectedPartsCount = Object.values(selectedParts).filter(part => part !== null).length;
  
  // Theme menu handlers
  const handleThemeMenuOpen = (event) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
    document.body.setAttribute('data-theme', themeKey);
    localStorage.setItem('theme', themeKey);
    handleThemeMenuClose();
  };
  
  // User menu handlers
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    handleUserMenuClose();
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Modern GitHub-style AppBar */}
        <AppBar position="static" color="default" elevation={1} sx={{ 
          borderBottom: currentTheme === 'white' 
            ? '1px solid #e1e4e8' 
            : currentTheme === 'purple'
              ? '1px solid rgba(156, 39, 176, 0.3)'
              : currentTheme === 'green'
                ? '1px solid rgba(76, 175, 80, 0.3)'
                : currentTheme === 'midnight'
                  ? '1px solid rgba(255, 255, 255, 0.12)'
                  : '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <Toolbar>
            <BuildIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              PC Part Picker
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AudioVisualizer />
              <IconButton color="inherit" aria-label="cart">
                <Badge badgeContent={selectedPartsCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" aria-label="info">
                <InfoIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="theme" 
                onClick={handleThemeMenuOpen}
              >
                <PaletteIcon />
              </IconButton>
              <Menu
                anchorEl={themeMenuAnchor}
                open={Boolean(themeMenuAnchor)}
                onClose={handleThemeMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    '& .MuiMenuItem-root': { px: 2, py: 1 },
                  },
                }}
              >
                {Object.entries(themes).map(([key, theme]) => (
                  <MenuItem 
                    key={key} 
                    onClick={() => handleThemeChange(key)}
                    selected={currentTheme === key}
                  >
                    <ListItemIcon>
                      {theme.icon}
                    </ListItemIcon>
                    <MuiListItemText primary={theme.name} />
                    {currentTheme === key && (
                      <CheckCircleIcon fontSize="small" color="primary" />
                    )}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton color="inherit" aria-label="github">
                <GitHubIcon />
              </IconButton>
              
              {/* Login/User Menu */}
              {isLoggedIn ? (
                <>
                  <IconButton 
                    color="inherit" 
                    aria-label="user menu" 
                    onClick={handleUserMenuOpen}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        '& .MuiMenuItem-root': { px: 2, py: 1 },
                      },
                    }}
                  >
                    <MenuItem onClick={handleUserMenuClose}>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <MuiListItemText primary={user?.email || 'User'} />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <MuiListItemText primary="Logout" />
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button 
                  color="inherit" 
                  startIcon={<LoginIcon />}
                  onClick={handleLoginClick}
                  sx={{ ml: 1 }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 600 }}>
              Build Your Dream PC
          </Typography>
            <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
              Select compatible parts and build a powerful custom PC
          </Typography>
          </Box>

          {/* Part Selection Section */}
          <Grid container spacing={3}>
            {Object.entries(pcParts).map(([category, parts]) => (
              <Grid item xs={12} md={6} key={category}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  border: currentTheme === 'white' 
                    ? '1px solid #e1e4e8' 
                    : currentTheme === 'purple'
                      ? '1px solid rgba(156, 39, 176, 0.3)'
                      : currentTheme === 'green'
                        ? '1px solid rgba(76, 175, 80, 0.3)'
                        : currentTheme === 'midnight'
                          ? '1px solid rgba(255, 255, 255, 0.12)'
                          : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: currentTheme === 'purple'
                    ? '0 1px 3px rgba(156, 39, 176, 0.2), 0 1px 2px rgba(156, 39, 176, 0.1)'
                    : currentTheme === 'green'
                      ? '0 1px 3px rgba(76, 175, 80, 0.2), 0 1px 2px rgba(76, 175, 80, 0.1)'
                      : currentTheme === 'midnight'
                        ? '0 1px 3px rgba(255, 255, 255, 0.2), 0 1px 2px rgba(255, 255, 255, 0.1)'
                        : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Typography>
                      {selectedParts[category] && (
                        <Chip 
                          icon={<CheckCircleIcon />} 
                          label="Selected" 
                          color="success" 
                          size="small" 
                          sx={{ ml: 1 }} 
                        />
                      )}
                    </Box>
                    <FormControl fullWidth>
                      <InputLabel id={`${category}-label`}>
                        Select {category.charAt(0).toUpperCase() + category.slice(1)}
                      </InputLabel>
                      <Select
                        labelId={`${category}-label`}
                        value={selectedParts[category]?.id || ''}
                        label={`Select ${category.charAt(0).toUpperCase() + category.slice(1)}`}
                        onChange={(e) => handlePartChange(category, e.target.value)}
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="">
                          <em>Select a {category}</em>
                        </MenuItem>
                        {parts.map((part) => (
                          <MenuItem key={part.id} value={part.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              <Avatar 
                                src={partImages[category][part.id]} 
                                variant="rounded" 
                                sx={{ 
                                  width: 56, 
                                  height: 56, 
                                  mr: 2,
                                  border: currentTheme === 'white' 
                                    ? '1px solid #e1e4e8' 
                                    : currentTheme === 'purple'
                                      ? '1px solid rgba(156, 39, 176, 0.3)'
                                      : currentTheme === 'green'
                                        ? '1px solid rgba(76, 175, 80, 0.3)'
                                        : currentTheme === 'midnight'
                                          ? '1px solid rgba(255, 255, 255, 0.12)'
                                          : '1px solid rgba(255, 255, 255, 0.12)'
                                }}
                              />
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>{part.name}</Typography>
                                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>{part.price.toFixed(2)} лв.</Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {selectedParts[category] && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {selectedParts[category].description}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {Object.entries(selectedParts[category])
                            .filter(([key]) => !['id', 'name', 'price', 'description'].includes(key))
                            .map(([key, value]) => (
                              <Chip 
                                key={key} 
                                label={`${key}: ${value}`} 
                                size="small" 
                                variant="outlined" 
                              />
                            ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Compatibility and Bottleneck Warnings */}
          {(compatibilityIssues.length > 0 || bottlenecks.length > 0) && (
            <Paper elevation={1} sx={{ 
              p: 3, 
              mt: 4, 
              border: currentTheme === 'white' 
                ? '1px solid #e1e4e8' 
                : currentTheme === 'purple'
                  ? '1px solid rgba(156, 39, 176, 0.3)'
                  : currentTheme === 'green'
                    ? '1px solid rgba(76, 175, 80, 0.3)'
                    : currentTheme === 'midnight'
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(255, 255, 255, 0.12)'
            }}>
              <Typography variant="h6" color="error" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ mr: 1 }} />
                Build Warnings
              </Typography>
              {compatibilityIssues.length > 0 && (
                <>
                  <Typography variant="subtitle1" color="error" sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <ErrorIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                    Compatibility Issues:
                  </Typography>
                  <List dense>
                    {compatibilityIssues.map((issue, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText primary={issue} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              {bottlenecks.length > 0 && (
                <>
                  <Divider sx={{ 
                    my: 2,
                    borderColor: currentTheme === 'white' 
                      ? '#e1e4e8' 
                      : currentTheme === 'purple'
                        ? 'rgba(156, 39, 176, 0.3)'
                        : currentTheme === 'green'
                          ? 'rgba(76, 175, 80, 0.3)'
                          : currentTheme === 'midnight'
                            ? 'rgba(255, 255, 255, 0.12)'
                            : 'rgba(255, 255, 255, 0.12)'
                  }} />
                  <Typography variant="subtitle1" color="warning.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                    Potential Bottlenecks:
                  </Typography>
                  <List dense>
                    {bottlenecks.map((bottleneck, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText primary={bottleneck} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Paper>
          )}

          {/* Build Summary */}
          <Paper elevation={1} sx={{ 
            p: 3, 
            mt: 4, 
            border: currentTheme === 'white' 
              ? '1px solid #e1e4e8' 
              : currentTheme === 'purple'
                ? '1px solid rgba(156, 39, 176, 0.3)'
                : currentTheme === 'green'
                  ? '1px solid rgba(76, 175, 80, 0.3)'
                  : currentTheme === 'midnight'
                    ? '1px solid rgba(255, 255, 255, 0.12)'
                    : '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Build Summary
            </Typography>
              <Chip 
                label={`${selectedPartsCount}/7 Parts Selected`} 
                color={selectedPartsCount === 7 ? "success" : "default"} 
              />
            </Box>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Estimated Total: {totalPrice.toFixed(2)} лв.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              sx={{ mt: 2 }}
              fullWidth
              disabled={compatibilityIssues.length > 0}
              startIcon={<ShoppingCartIcon />}
            >
              Save Build
            </Button>
          </Paper>
        </Container>

        {/* Footer */}
        <Box component="footer" sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          backgroundColor: 'background.paper', 
          borderTop: currentTheme === 'white' 
            ? '1px solid #e1e4e8' 
            : currentTheme === 'purple'
              ? '1px solid rgba(156, 39, 176, 0.3)'
              : currentTheme === 'green'
                ? '1px solid rgba(76, 175, 80, 0.3)'
                : currentTheme === 'midnight'
                  ? '1px solid rgba(255, 255, 255, 0.12)'
                  : '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} PC Part Picker. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Wrap the App component with Router
function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppWithRouter; 