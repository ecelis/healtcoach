import React, { useState } from 'react';
import StyledButton from './Button';

export default function Recipe(props) {
    const [title, setTitle] = useState('');
    const handler = (e) => {
        e.preventDefault();
        console.log(title)
    }
    return (
        <div>
            <h1>Recipe</h1>
            <form onSubmit={handler}>
                <input type="test"
                value={title}
                name="title"
                onChange={e => (setTitle(e.target.value))}
                />
                <StyledButton type="submit">Save</StyledButton>
            </form>
        </div>
    );
}