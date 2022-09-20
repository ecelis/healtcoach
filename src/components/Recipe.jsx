import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    apiUrlBuilder,
    axiosOpts,
    mealCategories
} from './util';
import StyledUl from './Cloud';
import {Button, Container, Pill} from 'e-react-ui/dist';
import { MealType } from './Meal';

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
    const [mealTypes, setMealTypes] = useState([]);
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [],
        categories: [],
        mealType: [],  // TODO review why I did it a string to convert into oarray
        instructions: ''
    });

    useEffect(() => {
        // GET MealTypes
        axios.get(apiUrlBuilder('mealtype'), {}, axiosOpts)
            .then(res => {
                const {data} = res;
                setMealTypes(data);
                localStorage.setItem('mealTypes', data);
            })
            .catch(error => error.toString() );
        // GET categories
        axios.get(apiUrlBuilder('category'),
            {}, axiosOpts
        )
        .then(res => {
            const {data} = res;
            console.log(data)
            setCategories(data);
        })
        .catch(error => { error.toString();  /* TODO handle errors properly */ });
    }, []);

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
        //const payload = {};
        let arr = [];
        let obj;
        const splitUrl = e.target.href.split('/');
        console.log(splitUrl)
        const target = splitUrl[splitUrl.length - 1];
        console.log(target)
        const [trigger, id] = target.split(',');
        console.log(trigger,id)
        switch (trigger) {
            case 'category':
                if (recipe.categories.includes(parseInt(id))) {
                    arr = recipe.categories;
                    console.log(arr)
                    arr.splice(recipe.categories.indexOf(parseInt(id), 1));
                } else {
                    arr = [...new Set([...recipe.categories,
                        parseInt(id)])];
                }
                obj = {...recipe, ...{categories: arr}}
                setRecipe(obj);

                axios.get(apiUrlBuilder('ingredient/categories/' + obj.categories))
                    .then(res => {
                        setIngredients(res.data);
                    })
                    .catch(error => console.log(error));

                break;
            case 'ingredient':
                if (recipe.ingredients.includes(parseInt(id))) {
                    arr = recipe.ingredients;
                    arr.splice(recipe.ingredients.indexOf(parseInt(id), 1));
                } else {
                    arr = [...new Set([...recipe.ingredients,
                        parseInt(id)])];
                }                
                obj = {...recipe, ...{ingredients: arr}}
                setRecipe(obj);
                break;
            case 'mealType':
                if (recipe.mealType.includes(parseInt(id))) {
                    arr = recipe.mealType;
                    arr.splice(recipe.mealType.indexOf(parseInt(id), 1));
                } else {
                    arr = [...new Set([...recipe.mealType,
                        parseInt(id)])];
                }
                obj = {...recipe, ...{mealType: arr}}
                setRecipe(obj);
                break;
            default:
                break;
        }
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
                <MealType
                    selectedMealTypes={recipe.mealType}
                    selectHandler={selectHandler}
                    mealTypes={mealTypes}
                 />
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
                                    <Pill itemId={category.id}
                                    to={`category,${category.id}`}
                                    onClick={selectHandler}
                                    selected={ recipe.categories.includes(category.id) ? true : false }
                                    >
                                        <span role="img">{category.ico}</span>
                                        {' '}
                                        {category.description}
                            </Pill></li>)
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
                    <Container>
                    <StyledUl>
                    {
                        ingredients.map(ingredient => {
                            return (
                                <li key={ingredient.id}>
                                    <Pill itemId={ingredient.id}
                                        to={`ingredient,${ingredient.id}`}
                                        onClick={selectHandler}
                                        selected={recipe.ingredients.includes(ingredient.id) ? true : false}
                                        >
                                        {ingredient.description_en}
                            </Pill></li>)
                        })
                    }
                    </StyledUl>
                    </Container>
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
                    <Button type="submit" label="Save" primary />
                </div>
            </form>
        </div>
    );
}