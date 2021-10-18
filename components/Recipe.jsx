import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

const Recipe = () => {
  const [recipe, setRecipe] = useState('');
  
  return (
    <React.Fragment>
      <CssBaseline />
          <TextareaAutosize
            color="secondary"
            label="Recipe"
            minRows={19}
            multiline
            required
            value={recipe}
            onChange={e => setRecipe(e.target.value)} />
            <Button variant="contained"
              onClick={() => {
                console.log(recipe);
              }}
            >
              Save
            </Button>
    </React.Fragment>
  );
}

export default Recipe;
