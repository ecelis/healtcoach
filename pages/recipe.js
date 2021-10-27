import Box from '@mui/material/Box';
import Day from '../components/Day';
import Layout from '../components/Layout';
import { useSession, getSession } from 'next-auth/react';

export default function RecipeIndex() {
  const { data: session, status } = useSession();

  return (
    <Layout>
      {
      status !== 'unauthenticated' ?
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <Day session={session} /> 
      </Box>
      : <p>Access Denied</p>
      }
    </Layout>
  )
}
