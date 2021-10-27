import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const handleSave = (payload) => {
  axios.post('http://localhost:3000/api/recipe', payload)
    .then(res => console.log(res));
}

const Recipe = (props) => {
  const [text, setText] = useState('');
  const { data: session, status} = useSession();
  
  return (
    <React.Fragment>
      <CssBaseline />
          <TextareaAutosize
            color="secondary"
            label="Recipe"
            minRows={19}
            required
            value={text}
            onChange={e => setText(e.target.value)} />
            <Button variant="contained"
              onClick={() => {
                const userId = session.user.id;
                handleSave({ text, userId });
              }}
            >
              Save
            </Button>
    </React.Fragment>
  );
}

export default Recipe;
