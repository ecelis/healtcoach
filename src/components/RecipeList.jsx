import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    apiUrlBuilder,
    axiosOpts,
} from './util';
import StyledContainer from './Container';
import { MealType } from './Meal';
import { AddButton, EditButton, StyledPill, TrashButton } from './Button';
import { Col, Grid, Row } from './Grid';

function Controls(props) {
    let controls = null;
        if (props.controls === 'edit') {
            controls = (
                <React.Fragment>
                    <Col size={1}>
                    <EditButton handler={props.handler} />
                    </Col>
                    <Col size={1}>
                        <TrashButton handler={props.handler} />
                    </Col>
                </React.Fragment>
            );
        } else {
            controls = (
            <Col size={1}>
                <AddButton handler={props.handler} />
            </Col>);
        }
    return controls;
}

export function ListRecipes(props) {
    return (
    <StyledContainer
    height={600}>
        <Grid>
        {
            props.recipes.map(item => {
                return (
                    <Row key={item.id} hoverColor={true}>
                        <Col size={4} align={"left"} id={item.id}>
                        {item.title}        
                        </Col>
                        <Controls controls={props.controls}
                        item={item}
                        handler={props.handler}
                        />
                    </Row>
                )
            })
        }
        </Grid>
    </StyledContainer>)
}

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

    const selectHandler = (e) => {console.log(e.target.id)
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
                    to="/recipe/new"
                    id="addRecipe"
                    link={true}
                    >
                        <span role="img">{String.fromCodePoint('0x2795')}</span>New Recipe
                    </StyledPill>
                </div>
                <div>
                    <ListRecipes recipes={recipes} controls="edit" />
                </div>
            </form>
        </div>
    );
}