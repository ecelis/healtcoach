import { useEffect, useState } from "react";
import { MealType } from "./Meal";
import axios from 'axios';
import { axiosOpts, apiUrlBuilder } from "./util";
import {ListRecipes} from './RecipeList';
import { Button } from "e-react-ui/dist";

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

    const handleDate = function(e) {
        console.log('tgt', e.target.value)
        const d = e.target.value;
        console.log('date',d)
        const obj = {
            ...menu,
            ...{date: d}
        };
console.log(obj);
        setMenu(obj);
    }

    const submitHandler = function(e) {
        e.preventDefault();
        axios.post(apiUrlBuilder('menu'), menu, axiosOpts)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
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
                    </div>
                    <div><input type="date"  id="menuDate"
                    onChange={handleDate}/></div>
                    <div>
                   <MealType
                    selectedMealTypes={[parseInt(currentMeal)]}
                    selectHandler={selectHandler}
                    mealTypes={mealTypes}
                    /></div>
                    <div>
                        <ListRecipes recipes={recipes}
                            controls="menu"
                            hoverColor={true}
                            handler={selectHandler}
                            />
                    </div>
                    <div>
                        <Button label="Save" primary/>
                        {`${JSON.stringify(menu)}`}
                    </div>
                </div>
            </form>
        </div>
    );
}