import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Meal from './Meal';

const Day = (props) => {
    return (
        <React.Fragment>
            <h2>Day</h2>
            <Meal session={props.session}/>
        </React.Fragment>
    );
}

export default Day;