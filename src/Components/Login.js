import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FormControl } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { validateForm } from '../formValidation';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'name' && errors.name) {
            const newErrors = { ...errors };
            delete newErrors.name;
            setErrors(newErrors);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const errors = validateForm(formState);

        if (Object.keys(errors).length === 0) {
            try {
                setIsLoading(true); // Start the loader

                await signInWithEmailAndPassword(auth, formState.email, formState.password);
                navigate('/home');
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    setSnackbarMessage('Email not found');
                    setSnackbarOpen(true);
                }
                if (error.code === 'auth/wrong-password') {
                    setSnackbarMessage('Invalid password');
                    setSnackbarOpen(true);
                } else {
                    setErrors({ server: error.message });
                }
            } finally {
                setIsLoading(false); // Stop the loader
            }
        } else {
            setErrors(errors);
        }
    };

    useEffect(() => {
        const handleWindowUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // This is necessary for Chrome
        };

        window.addEventListener('beforeunload', handleWindowUnload);

        return () => {
            window.removeEventListener('beforeunload', handleWindowUnload);
        };
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: 'purple',
                    backgroundSize: 'cover',
                }}
            >
                {isLoading ? (
                    <CircularProgress color="secondary" />
                ) : (
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                marginTop: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                padding: '24px',
                                borderRadius: '8px',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </FormControl>
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Sign In'}
                                </Button>
                                <Grid container>
                                    <Grid item></Grid>
                                    <Grid item>
                                        <Link href="/" variant="body2" color="secondary">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={3000}
                                onClose={handleSnackbarClose}
                            >
                                <MuiAlert
                                    elevation={6}
                                    variant="filled"
                                    severity="error"
                                    onClose={handleSnackbarClose}
                                >
                                    {snackbarMessage}
                                </MuiAlert>
                            </Snackbar>
                        </Box>
                    </Container>
                )}
            </Box>
        </ThemeProvider>
    );
}
