import { Meal, MealsGridProps } from '@/app/types/types';
import Mealitem from './mealitem';
import classes from './mealsgrid.module.css';



export default function Mealsgrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <Mealitem {...meal} />
        </li>
      ))}
    </ul>
  )
}
