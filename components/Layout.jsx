import Head from 'next/head';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar,
    Box,
    CssBaseline,
    Link,
    Toolbar,
    Typography
} from '@mui/material';
import { useSession } from 'next-auth/react';

const theme = createTheme();

function Footer() {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="GrayText.secondary"
                component="p"
                >
                Give footer a purpose
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="http://localhost:3000">
                    celisdelafuente.net
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

function AppHeader({ session, status }) {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    My Healt Coach
                </Typography>
                {
                    status === 'authenticated' ?
                    <p>signed in as {session.user.email}</p> :
                    <p><a href="/api/auth/signin">Sigin</a></p>                    
                }
            </Toolbar>
        </AppBar>
    );
}

export default function Layout({ children }) {
    const { data: session, status } = useSession();

    return (
        <>
            <Head>
                <title>Health Coach</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppHeader session={session} status={status}/>
                <main>{children}</main>
                <Footer />
            </ThemeProvider>
        </>
    )
}