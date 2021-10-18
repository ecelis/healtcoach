import Head from 'next/head'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css'
import Day from '../components/Day';

export default function Home({ isConnected }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Health Coach</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <Day /> 
        </Box>
      </Container>
    </div>
  )
}
