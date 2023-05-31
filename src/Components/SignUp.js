import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FormControl } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { validateForm } from '../formValidation';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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

    const handleRegister = async (e) => {
        e.preventDefault();

        const errors = validateForm(formState);

        if (Object.keys(errors).length === 0) {
            try {
                setLoading(true);
                await createUserWithEmailAndPassword(
                    auth,
                    formState.email,
                    formState.password
                );
                navigate('/home');
            } catch (error) {
                setErrors({ server: error.message });
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: 'purple',
                    backgroundSize: 'cover',
                }}
            >
                {loading ? (
                    <CircularProgress color="secondary" />
                ) : (
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                marginTop: 15,
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
                                Sign up
                            </Typography>
                            <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? 'Signing Up...' : 'Sign Up'}
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2" color="secondary">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                )}
            </Box>
        </ThemeProvider>
    );
}
