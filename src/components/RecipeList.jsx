import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    apiUrlBuilder,
    axiosOpts,
} from './util';
import StyledContainer from './Container';
import { MealType } from './Meal';
import { StyledPill } from './Button';
import { Link } from 'react-router-dom';

export default function RecipeList(props) {
    const [recipes, setRecipes] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);
    const [selectedMealType, setSelectedMealType] = useState([]);
  
    useEffect(() => {
        // GET MealTypes
        axios.get(apiUrlBuilder('mealtype'), {}, axiosOpts)
            .then(res => {
                const {data} = res;
                setMealTypes(data);
                localStorage.setItem('mealTypes', data);
            })
            .catch(error => error.toString() );
    }, []);

    const selectHandler = (e) => {
        e.preventDefault();
        const splitUrl = e.target.href.split('/');
        const target = splitUrl[splitUrl.length - 1];
        const [trigger, id] = target.split(',');
        console.log(trigger,id) // TODO Remove
        setSelectedMealType([parseInt(id)]);
        switch (trigger) {
            case 'mealType':
                axios.get(apiUrlBuilder(`recipe/mealtype/${id}`), {}, axiosOpts)
                    .then(res => {
                        const data = res.data[0];
                        setRecipes(data.Recipes);
                    })
                    .catch(error => {
                        console.log(error)
                    });
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <form>
                <div>
                    <MealType
                        selectedMealTypes={selectedMealType}
                        selectHandler={selectHandler}
                        mealTypes={mealTypes}
                    />
                </div>
                <div>
                    <StyledPill
                    onClick={e => { e.preventDefault(); }}
                    id="addRecipe"
                    href="/recipe/new">
                        <Link to="/recipe/new"><span role="img">{String.fromCodePoint('0x2795')}</span> Add Recipe</Link>
                    </StyledPill>
                </div>
                <div>
                    <StyledContainer>
                        <ul>
                            {
                                recipes.map(item => {
                                    return (
                                        <li>{item.title}</li>
                                    )
                                })
                            }
                        </ul>
                    </StyledContainer>
                </div>
            </form>
        </div>
    );
}