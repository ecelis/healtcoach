import Head from 'next/head'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css'
import Day from '../coponents/Day';

export default function Home() {
  return (
    <div className={styles.container}>   
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <Day /> 
        </Box>
      </Container>
    </div>
  )
}
