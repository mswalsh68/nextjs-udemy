import Mealitem from './mealitem';
import classes from './mealsgrid.module.css';
import type { MealitemProps } from './mealitem';



export default function Mealsgrid({ meals }: { meals: MealitemProps & { id: string }[] }) {
  return (
    <ul className={classes.meals}>
        {meals.map((meal) => ( 
            <li key={meal.id}>
                <Mealitem title={''} slug={''} image={''} summary={''} creator={''} {...meal} />
            </li> 
        ))}
    </ul>
  )
}
