import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrlBuilder, axiosOpts } from './util';
import StyledButton, { StyledPill } from './Button';
import StyledUl from './Cloud';

const mealTypes = [
    {id: 0, description: 'breakfast', ico: String.fromCodePoint('0x1F373')},
    {id: 1, description: 'brunch', ico: String.fromCodePoint('0x1F347')},
    {id: 2, description: 'meal', ico: String.fromCodePoint('0x1F35B')},
    {id: 3, description: 'snack', ico: String.fromCodePoint('0x1F968')},
    {id: 4, description: 'dinner', ico: String.fromCodePoint('0x1F96A')}
];  // TODO fetch this form somewhere else

const mealCategories = [
    { id: 1, description: 'Fruit', ico: String.fromCodePoint('0x1F349')},  // :leafy_green:
    { id: 2, description: 'Grains', ico: String.fromCodePoint('0x1F35A')},  // .🍉 
    { id: 3, description: 'Meats', ico: String.fromCodePoint('0x1F356')},  // :rice:
    { id: 4, description: 'Milk', ico: String.fromCodePoint('0x1F9C8')}, // :seedling:
    { id: 5, description: 'Seeds', ico: String.fromCodePoint('0x1F331')} ,  // :meat_bone:
    { id: 6, description: 'Vegetals', ico: String.fromCodePoint('0x1F96C')}   // :meat_bone:
];

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

function MealTypeOption() {
    return (
        mealTypes.map(meal => {
            return (
                <option key={`mt${meal.id}`}
                value={meal.id}>{meal.description}</option>
            )
        })        
    );
}

export default function Recipe(props) {
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [],
        categories: [],
        mealType: [],  // TODO review why I did it a string to convert into oarray
        instructions: ''
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
/*
    useEffect(() => {  // GET ingredients
        axios.get(apiUrlBuilder('ingredient'),
            {}, axiosOpts
        )
        .then(res => {
            const {data} = res;
            setIngredients(data);
        })
        .catch(error => { error.toString();   });
    }, []);
*/
    const submitHandler = (e) => {
        e.preventDefault();
        // TODO this is ugly
        const payload = {...recipe, ...{mealType: recipe.mealType.toString()}};
        axios.post(apiUrlBuilder('recipe'), payload, axiosOpts)
            .then(res => {
                res.toString();
            })
            .catch(error => error.toString()) // TODO Handle error
    }

    const selectHandler = (e) => {
        e.preventDefault();
        const payload = {};
        let arr = [];
        let obj;
        const splitUrl = e.target.href.split('/');
        const target = splitUrl[splitUrl.length - 1];
        const [trigger, id] = target.split(',');
        console.log(trigger,id)
        switch (trigger) {
            case 'category':
                arr = [...new Set([...recipe.categories,
                    parseInt(id)])];
                obj = {...recipe, ...{categories: arr}}
                setRecipe(obj);

                axios.get(apiUrlBuilder('ingredient/categories/' + obj.categories))
                    .then(res => {
                        setIngredients(res.data);
                    })
                    .catch(error => console.log(error));

                break;
            case 'ingredient':
                arr = [...new Set([...recipe.ingredients,
                    parseInt(id)])];
                obj = {...recipe, ...{ingredients: arr}}
                setRecipe(obj);
                break;
            case 'mealType':
                arr = [...new Set([...recipe.mealType,
                    parseInt(id)])];
                obj = {...recipe, ...{mealType: arr}}
                setRecipe(obj);
                break;
            default:
                break;
        }
        console.log(recipe);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="title">Recipe</label>
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
                    <select id="mealType" name="mealType"
                    hidden={true}
                    multiple={true}
                    value={recipe.mealType}
                    onChange={selectHandler}>
                        <MealTypeOption />
                    </select>
                    <StyledUl>
                    {
                        mealTypes.map(mealType => {
                            return (
                                <li
                                    key={mealType['id']}>
                                <StyledPill itemId={mealType.id}
                                        itemType="mealType"
                                        onClick={selectHandler}>
                                        <span role="img">{mealType['ico']}</span>
                                        {' '}
                                        {mealType.description}
                            </StyledPill>
                            </li>)
                        })
                    }
                    </StyledUl>
                </div>
                <div>
                    <select id="categories"
                    hidden={true}
                    multiple={true}
                    name="categories"
                    value={recipe.categories}
                    readOnly
                    >
                        {
                            categories.map(category => {
                                return (
                                    <CategoryOption
                                    key={category.id}
                                    categoryId={category.id}
                                    description_en={category.description}
                                />)
                            })
                        }
                    </select>
                    <h3>Categories</h3>
                    <StyledUl>
                    {
                        mealCategories.map(category => { // TODO Fix ico size 12px
                            return (
                                <li key={category.id}>
                                    <StyledPill itemId={category.id}
                                    itemType="category"
                                    onClick={selectHandler}>
                                        <span role="img">{category.ico}</span>
                                        {' '}
                                        {category.description}
                            </StyledPill></li>)
                        })
                    }
                    </StyledUl>
                </div>
                <div>
                    <select id="ingredients"
                    hidden={true}
                    multiple={true}
                    name="ingredients"
                    value={recipe.ingredients}
                    readOnly
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
                    <h3>Ingredients</h3>
                    <StyledUl>
                    {
                        ingredients.map(ingredient => {
                            return (
                                <li key={ingredient.id}>
                                    <StyledPill itemId={ingredient.id}
                                        itemType="ingredient"
                                        onClick={selectHandler}>
                                        {ingredient.description_en}
                            </StyledPill></li>)
                        })
                    }
                    </StyledUl>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                    cols="40"
                    rows="12"
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