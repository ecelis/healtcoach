import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrlBuilder, axiosOpts } from './util';
import StyledButton from './Button';

function CategoryOption(props) {
    return (
        <option key={`category${props.categoryId}`}
            value={props.categoryId}>
            {props.description_en}
        </option>
    );
}

function IngredientOption(props) {
    return (
        <option key={`ingredient${props.ingredientId}`}
            value={props.ingredientId}>
            {props.description_en}
        </option>
    );
}

export default function Recipe(props) {
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState({
        title: '', ingredients: [], categories: [], instructions: ''
    });

    useEffect(() => {  // GET categories
        axios.get(apiUrlBuilder('category'),
            {}, axiosOpts
        )
        .then(res => {
            const {data} = res;
            setCategories(data);
        })
        .catch(error => { error.toString();  /* TODO handle errors properly */ });
    }, []);

    useEffect(() => {  // GET ingredients
        axios.get(apiUrlBuilder('ingredient'),
            {}, axiosOpts
        )
        .then(res => {
            const {data} = res;
            setIngredients(data);
        })
        .catch(error => { error.toString();  /* TODO handle errors properly */ });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('I am the handler', recipe)
    }

    const selectHandler = (e) => {
        let arr = [];
        let obj;
        switch (e.target.id) {
            case 'categories':
                arr = [...new Set([...recipe.categories,
                    parseInt(e.target.value)])];
                    obj = {...recipe, ...{categories: arr}}
                    setRecipe(obj);
                break;
            case 'ingredients':
                arr = [...new Set([...recipe.ingredients,
                    parseInt(e.target.value)])];
                    obj = {...recipe, ...{ingredients: arr}}
                    setRecipe(obj);
                break;
            default:
                setRecipe(recipe);
        }
    }

    return (
        <div>
            <h1>Recipe</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text"
                    value={recipe.title}
                    id="title"
                    name="title"
                    onChange={e => {
                        const obj = {
                            ...recipe,
                            ...{title: e.target.value}
                        }
                        setRecipe(obj)
                    }}
                    />
                </div>
                <div>
                    <select id="categories"
                    multiple={true}
                    name="categories"
                    value={recipe.categories}
                    onChange={selectHandler}
                    >
                        {
                            categories.map(category => {
                                return (
                                    <CategoryOption
                                    key={category.id}
                                    categoryId={category.id}
                                    description_en={category.description_en}
                                />)
                            })
                        }
                    </select>
                </div>
                <div>
                    <select id="ingredients"
                    multiple={true}
                    name="ingredients"
                    value={recipe.ingredients}
                    onChange={selectHandler}
                    >
                        {
                            ingredients.map(ingredient => {
                                return (
                                    <IngredientOption
                                    key={`ingredient${ingredient.id}`}
                                    ingredientId={ingredient.id}
                                    value={ingredient.id}
                                    description_en={ingredient.description_en} />
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                    cols="40"
                    rows="24"
                    value={recipe.instructions}
                    id="instructions"
                    name="instructions"
                    onChange={e => {
                        const obj = {
                            ...recipe,
                            ...{instructions: e.target.value}
                        }
                        setRecipe(obj)
                    }}></textarea>
                </div>
                <div>
                    <StyledButton type="button" text="Save" primary />
                </div>
            </form>
        </div>
    );
}