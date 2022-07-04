import { useEffect, useState } from "react";
import { MealType } from "./Meal";
import axios from 'axios';
import { axiosOpts, apiUrlBuilder } from "./util";

export default function Menu (props) {
    const [mealTypes, setMealTypes] = useState([]);
    const [menu, setMenu] = useState({
        title: '',
        date: new Date().getDate(),
        menus: [],
        meals: [],
        UserId: null
    });
    const [recetas, setRecetas] = useState([]);

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
        console.log(e.target)
        let arr = [];
        let obj;
        const splitUrl = e.target.href.split('/');
        const target = splitUrl[splitUrl.length - 1];
        const [trigger, id] = target.split(',');
        arr = [...new Set([...menu.meals,
            parseInt(id)])];
        obj = {...menu, ...{meals: arr}}
        setMenu(obj);

        axios.get(apiUrlBuilder('recipe/mealtype/' + obj.meals))
            .then(res => {
                console.log(res.data);
            })
            .catch(error => console.log(error))
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
                    mealType={1}
                    selectHandler={selectHandler}
                    mealTypes={mealTypes}
                 />
                </div>
            </form>
        </div>
    );
}