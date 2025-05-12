import React, { useState, useEffect } from 'react';
import { Card, CardContent, Chip, Collapse, Divider, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function SavedBuilds() {
  const [expanded, setExpanded] = useState({});
  const [builds, setBuilds] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
    return saved;
  });

  // Keep builds in sync with localStorage (persist across navigation)
  useEffect(() => {
    const onStorage = () => {
      setBuilds(JSON.parse(localStorage.getItem('savedBuilds') || '[]'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
        Saved Builds
      </Typography>
      {builds.length === 0 ? (
        <Typography align="center" color="text.secondary">No builds saved yet.</Typography>
      ) : (
        <List sx={{ width: '100%' }}>
          {builds.map((build, idx) => (
            <Card
              key={idx}
              sx={{
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 2,
                borderRadius: 2,
                background: 'background.paper',
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{`Build ${idx + 1}`}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={expanded[idx] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    onClick={() => handleExpand(idx)}
                    sx={{ minWidth: 120 }}
                  >
                    {expanded[idx] ? 'Hide Parts' : 'View Parts'}
                  </Button>
                </Box>
                <Collapse in={expanded[idx]} timeout="auto" unmountOnExit>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : '#f4f6fa',
                    borderRadius: 2,
                    p: 2,
                  }}>
                    <List dense>
                      {Object.entries(build).map(([partType, part]) => (
                        part ? (
                          <ListItem key={partType} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                <Chip label={partType.charAt(0).toUpperCase() + partType.slice(1)} size="small" sx={{ mr: 1 }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>{part.name}</Typography>
                                <Typography variant="body2" color="primary" sx={{ fontWeight: 600, ml: 2 }}>{part.price?.toFixed(2)} лв.</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">{part.description}</Typography>
                              <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {Object.entries(part)
                                  .filter(([key]) => !['id', 'name', 'price', 'description'].includes(key))
                                  .map(([key, value]) => (
                                    <Chip key={key} label={`${key}: ${value}`} size="small" variant="outlined" />
                                  ))}
                              </Box>
                            </Box>
                          </ListItem>
                        ) : null
                      ))}
                    </List>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
}

export default SavedBuilds;
