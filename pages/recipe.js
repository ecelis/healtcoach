import { useState, useEfect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css'
import Day from '../components/Day';
import Layout from '../components/Layout';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

export default function Recipe() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [ content, setContent ] = useState();

  /* useEffect(() => {
    //do something
  }, [session]);*/

  if (typeof window !== 'undefined' && loading) return null;
  if(!session) { return <Layout><h1>Acceso negado</h1></Layout>}
  
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <Day /> 
        </Box>
      </Container>
    </Layout>
  )
}
