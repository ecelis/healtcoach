import StyledUl from "./Cloud";
import { Pill } from "e-react-ui/dist";

function MealTypeOption(props) {
    return (
        props.mealTypes.map(meal => {
            return (
                <option key={`mt${meal.id}`}
                value={meal.id}>{meal.description_en}</option>
            )
        })        
    );
}

export function MealType (props) {
    return (
        <div>
        <select id="mealType" name="mealType"
        hidden={true}
        multiple={true}
        value={props.selectedMealTypes}
        onChange={props.selectHandler}>
            <MealTypeOption mealTypes={props.mealTypes} />
        </select>
        <StyledUl>
        {
            props.mealTypes.map(mealType => {
                return (
                    <li
                        key={mealType['id']}>
                        <Pill id={mealType.id}
                            itemType="mealType"
                            onClick={props.selectHandler}
                            selected={
                                props.selectedMealTypes.includes(mealType.id) ? true : false
                            }
                            >
                            <span role="img">{String.fromCodePoint(mealType['ico'])}</span>
                            {' '}
                            {mealType.description_en}
                        </Pill>
                    </li>
                )
            })
        }
        </StyledUl>
    </div>
    );
}