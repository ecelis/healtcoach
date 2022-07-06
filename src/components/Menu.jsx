import { useEffect, useState } from "react";
import { MealType } from "./Meal";
import axios from 'axios';
import { axiosOpts, apiUrlBuilder } from "./util";

function RecipeOption(props) {
    const { recipe } = props;    
    return (
        <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
    )
}

export default function Menu (props) {
    const [mealTypes, setMealTypes] = useState([]);
    const [menu, setMenu] = useState({
        title: '',
        date: new Date().getDate(),
        meals: {},
        UserId: null
    });
    const [recipes, setRecipes] = useState([]);
    const [currentMeal, setCurrentMeal] = useState();
    const [meals, setMeals] = useState([]);

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
        let arr = [];
        let obj;
        let splitUrl = null;
        let target = null;
        let trigger = null;
        let id = null;
        if (e.target.href)
        {
            splitUrl = e.target.href.split('/');
            target = splitUrl[splitUrl.length - 1];
            [trigger, id] = target.split(',');
        } else {
            trigger = 'receta'
        }
        switch (trigger) {
            case 'mealType':
                setCurrentMeal(id);
                const mealOnMenu = menu.meals;
                if(mealOnMenu[id]) {
                    mealOnMenu[id] = {
                        ...mealTypes.find(i => i.id === parseInt(id)),
                        recipes: mealOnMenu[id].recipes
                    };
                } else {
                    mealOnMenu[id] = {
                        ...mealTypes.find(i => i.id === parseInt(id)),
                        recipes: []
                    };
                }
                obj = {...menu, ...{meals: mealOnMenu}}
                setMenu(obj);

                axios.get(apiUrlBuilder('recipe/mealtype/' + id, {}, axiosOpts))
                    .then(res => {
                        const mealtype = res.data[0];
                        setRecipes(mealtype.Recipes);
                    })
                    .catch(error => console.log(error));
                break;
            case 'receta':
                const meal = menu.meals[currentMeal];
                const recipe = recipes.find(i => i.id === parseInt(e.target.value));
                meal.recipes.push(recipe);
                const newMeals = Object.assign({}, menu.meals, meal)
                obj = {...menu, ...{meals: newMeals}}
                setMenu(obj);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="title">Menu</label>{' '}
                    <input type="text"
                    value={menu.title}
                    id="title"
                    name="title"
                    onChange={e => {
                        const obj = {
                            ...menu,
                            ...{title: e.target.value}
                        }
                        setMenu(obj)
                    }}
                    />
                   <MealType
                    selectedMealTypes={[parseInt(currentMeal)]}
                    selectHandler={selectHandler}
                    mealTypes={mealTypes}
                    />
                    <div>
                        <select id="recipes" name="recipes" size={5}
                        onChange={selectHandler}>
                        {
                        recipes.map(recipe => {
                            return <RecipeOption key={recipe.id} recipe={recipe} />
                        })
                        }
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
}