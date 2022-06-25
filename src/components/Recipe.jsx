import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrlBuilder, axiosOpts } from './util';
import StyledButton from './Button';
import StyledUl from './Cloud';

const mealTypes = [
    {id: 0, description: 'breakfast', ico: String.fromCodePoint('0x1F373')},
    {id: 1, description: 'brunch', ico: String.fromCodePoint('0x1F347')},
    {id: 2, description: 'meal', ico: String.fromCodePoint('0x1F35B')},
    {id: 3, description: 'snack', ico: String.fromCodePoint('0x1F968')},
    {id: 4, description: 'dinner', ico: String.fromCodePoint('0x1F96A')}
];  // TODO fetch this form somewhere else

const catIcons = {
    'butter': String.fromCodePoint('0x1F9C8'),
};

const catIconsfn = function (category) {
    //const regex = /`^${category}*`/
    let ico = String.fromCodePoint('0x1F631');
    switch (category) {
        case 'butter':
            ico = catIcons['butter']
            break;
        default:
            break;
    }
    
    return ico;
}

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
        // TODO this is ugly
        const payload = {...recipe, ...{mealType: recipe.mealType.toString()}};
        axios.post(apiUrlBuilder('recipe'), payload, axiosOpts)
            .then(res => {
                res.toString();
            })
            .catch(error => error.toString()) // TODO Handle error
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
            case 'mealType':
                arr = [...new Set([...recipe.mealType,
                    parseInt(e.target.value)])];
                obj = {...recipe, ...{mealType: arr}}
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
                    <StyledUl>
                    {
                        categories.map(category => {
                            return (
                                <li
                                    key={category.id}>
                                    <div><span role="img">{catIconsfn(category.description_en)}</span>
                                {category.description_en}
                                </div>
                            </li>)
                        })
                    }
                    </StyledUl>
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
                    <select id="mealType" name="mealType"
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
                                    <div><span role="img">{mealType['ico']}</span>
                                {mealType['description']}
                                </div>
                            </li>)
                        })
                    }
                    </StyledUl>
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