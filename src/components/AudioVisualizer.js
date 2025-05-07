import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip, Slider } from '@mui/material';
import { VolumeUp, VolumeOff, PlayArrow, Stop } from '@mui/icons-material';
import { BACKGROUND_MUSIC_URL, VISUALIZER_CONFIG } from '../config/audio';

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const animationRef = useRef(null);
  const [audioContext, setAudioContext] = useState(null);
  const [analyserNode, setAnalyserNode] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [error, setError] = useState(null);

  // Initialize audio context and set up audio nodes
  const initializeAudio = async () => {
    try {
      // Create new audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const newContext = new AudioContext();
      
      // Create nodes
      const source = newContext.createMediaElementSource(audioRef.current);
      const analyser = newContext.createAnalyser();
      const gain = newContext.createGain();
      
      // Configure nodes
      analyser.fftSize = VISUALIZER_CONFIG.fftSize;
      analyser.smoothingTimeConstant = VISUALIZER_CONFIG.smoothingTimeConstant;
      gain.gain.value = volume;
      
      // Connect nodes
      source.connect(analyser);
      analyser.connect(gain);
      gain.connect(newContext.destination);
      
      // Update state
      setAudioContext(newContext);
      setAnalyserNode(analyser);
      setGainNode(gain);
      setError(null);
      
      return true;
    } catch (error) {
      console.error('Error initializing audio:', error);
      setError(`Failed to initialize audio: ${error.message}`);
      return false;
    }
  };

  // Handle play/pause
  const handlePlayPause = async () => {
    if (!audioRef.current) {
      setError('Audio element not found');
      return;
    }

    try {
      // Initialize audio context if needed
      if (!audioContext) {
        const success = await initializeAudio();
        if (!success) return;
      }

      // Resume context if suspended
      if (audioContext?.state === 'suspended') {
        await audioContext.resume();
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
      setError(null);
    } catch (error) {
      console.error('Error toggling playback:', error);
      setError(`Failed to play audio: ${error.message}`);
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (!gainNode) return;
    
    if (isMuted) {
      gainNode.gain.value = volume;
    } else {
      gainNode.gain.value = 0;
    }
    setIsMuted(!isMuted);
  };

  // Handle volume change
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (gainNode && !isMuted) {
      gainNode.gain.value = newValue;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioContext]);

  // Handle visualization
  useEffect(() => {
    if (!analyserNode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = VISUALIZER_CONFIG.barWidth;
      const barSpacing = VISUALIZER_CONFIG.barSpacing;
      
      analyserNode.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);
      
      // Get theme colors based on current theme
      const theme = document.body.getAttribute('data-theme');
      let barColor;
      let glowColor;
      
      switch(theme) {
        case 'purple':
          barColor = '#9C27B0';
          glowColor = 'rgba(156, 39, 176, 0.5)';
          break;
        case 'green':
          barColor = '#4CAF50';
          glowColor = 'rgba(76, 175, 80, 0.5)';
          break;
        case 'midnight':
          barColor = '#FF1744';
          glowColor = 'rgba(255, 23, 68, 0.5)';
          break;
        case 'white':
          barColor = '#0366d6';
          glowColor = 'rgba(3, 102, 214, 0.5)';
          break;
        default:
          barColor = '#5865F2';
          glowColor = 'rgba(88, 101, 242, 0.5)';
      }

      ctx.shadowBlur = 15;
      ctx.shadowColor = glowColor;
      
      dataArray.forEach((value, i) => {
        const boost = i < 8 ? 1.2 : 1;
        const barHeight = Math.max(
          ((value / 255) * height * boost) * 0.8, 
          VISUALIZER_CONFIG.barMinHeight
        );
        const x = i * (barWidth + barSpacing);
        const y = height - barHeight;
        
        const gradient = ctx.createLinearGradient(x, y, x, height);
        gradient.addColorStop(0, barColor);
        gradient.addColorStop(1, glowColor);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
      });
      
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyserNode]);

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      height: '40px',
      mr: 2
    }}>
      <Tooltip title={isPlaying ? "Stop" : "Play"}>
        <IconButton 
          onClick={handlePlayPause}
          color="inherit"
          size="small"
          sx={{
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
        >
          {isPlaying ? <Stop /> : <PlayArrow />}
        </IconButton>
      </Tooltip>
      <Tooltip title={isMuted ? "Unmute" : "Mute"}>
        <IconButton 
          onClick={toggleMute}
          color="inherit"
          size="small"
          sx={{
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
        >
          {isMuted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
      </Tooltip>
      <canvas 
        ref={canvasRef} 
        width={120} 
        height={40} 
        style={{ 
          cursor: 'pointer',
          transition: 'transform 0.2s',
          borderRadius: '4px',
          background: 'rgba(0, 0, 0, 0.1)',
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          aria-label="Volume"
          sx={{
            width: '80px',
            color: 'inherit',
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.16)',
              },
              '&.Mui-active': {
                width: 14,
                height: 14,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.5,
            },
          }}
        />
      </Box>
      <audio
        ref={audioRef}
        src={BACKGROUND_MUSIC_URL}
        loop
        preload="auto"
        onError={(e) => {
          console.error('Audio loading error:', e);
          setError('Failed to load audio file');
        }}
      />
      {error && (
        <Box sx={{ color: 'error.main', fontSize: '0.75rem', ml: 1 }}>
          {error}
        </Box>
      )}
    </Box>
  );
};

export default AudioVisualizer; 