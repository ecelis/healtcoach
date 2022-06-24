import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StyledButton from './Button';

function CategoryOption(props) {
    return (<option key={`cat${props.id}`} id={`cat${props.id}`} value={props.id}>
            {props.description_en}
        </option>);
}

export default function Recipe(props) {
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState({
        title: null, ingredients: [], instructions: null
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_APIURL}/category`,
            {}, {
            headers: { 'Content-Type': 'application/json'}
        })
        .then(res => {
            const {data} = res;
            setCategories(data);
        })
        .catch(error => { error.toString();  /* TODO handle errors properly */ });
    }, []);

    const handler = (e) => {
        e.preventDefault();
        console.log('I am the handler', title)
    }

    const selectHandler = (e) => {
        console.log(e.target)
    }

    return (
        <div>
            <h1>Recipe</h1>
            <form onSubmit={handler}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text"
                    value={title}
                    id="title"
                    name="title"
                    onChange={e => (setTitle(e.target.value))}
                    />
                </div>
                <div>
                    <select id="categories"
                    multiple={false}
                    name="categories"
                    value={categories}
                    onChange={e => {selectHandler(e)}}
                    >
                        <option key="catEmpty">-- Categories --</option>
                        {
                            categories.map(category => {
                                return (<CategoryOption
                                    id={category.id}
                                    description_en={category.description_en}
                                />)
                            })
                        }
                    </select>
                </div>
                <div>
                    <select id="ingredients"
                    name="ingredients"
                    value={ingredients}
                    onChange={e => {setIngredients(e.target.value)}}
                    >
                        <option>-- Ingredients --</option>
                        {

                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                    cols="30"
                    rows="24"
                    value={instructions}
                    id="instructions"
                    name="instructions"
                    onChange={e => {setInstructions(e.target.value)}}></textarea>
                </div>
                <div>
                    <StyledButton type="button" text="Save" primary />
                </div>
            </form>
        </div>
    );
}