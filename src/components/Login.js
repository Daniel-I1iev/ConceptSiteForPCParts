import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  Alert,
  Container
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (loginForm.username && loginForm.password) {
        setSuccess('Login successful!');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ username: loginForm.username }));
        setLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError('Please fill in all fields');
        setLoading(false);
      }
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (registerForm.username && registerForm.email && 
          registerForm.password && registerForm.confirmPassword) {
        if (registerForm.password !== registerForm.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        setSuccess('Registration successful! Please log in.');
        setLoading(false);
        setTimeout(() => {
          setTabValue(0);
        }, 1000);
      } else {
        setError('Please fill in all fields');
        setLoading(false);
      }
    }, 1000);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container className="login-container">
      <Paper className="login-paper">
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="login tabs"
          className="login-tabs"
          variant="fullWidth"
        >
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>
        
        {(error || success) && (
          <Alert 
            severity={error ? "error" : "success"} 
            className="login-alert"
          >
            {error || success}
          </Alert>
        )}
        
        <Box className="login-form">
          {tabValue === 0 ? (
            <form onSubmit={handleLoginSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                variant="outlined"
                className="password-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
                variant="outlined"
                className="password-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                required
                variant="outlined"
                className="password-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'REGISTER'}
              </Button>
            </form>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Login; 