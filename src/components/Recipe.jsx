import React, { useState } from 'react';

export default function Recipe(props) {
    const [title, setTitle] = useState('');
    const handler = () => {
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
            </form>
        </div>
    );
}