import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Recipe from './Recipe';

const Meal = () => {
    return (
        <React.Fragment>
            <h3>Meal</h3>
            <Recipe />
        </React.Fragment>
    );
}

export default Meal;