import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../Images/homebg.jpg';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
    },
}));

export default function Home() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        onAuthStateChanged(auth, (user) => {
            setIsLoading(false);

            if (user) {
                const name = user.email.split('@')[0];
                setUserName(name);
                console.log("uid", user);
            } else {
                console.log("user is logged out");
            }
        });

    }, []);

    const handleLogout = () => {
        setIsLoading(true);

        signOut(auth).then(() => {
            navigate('/login', { replace: true });
            console.log('Signed out successfully');
            window.history.pushState(null, '', '/login');
        }).catch((error) => {
            // An error happened.
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className={classes.container}>
            {userName && (
                <h2 style={{ color: 'blue' }}>
                    Hello, {userName}! <span role="img" aria-label="Waving Hand">👋</span>
                </h2>
            )}
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mt: 1, mb: 2, }}
                onClick={handleLogout}
            >
                Logout
            </Button>
            <Backdrop open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};
