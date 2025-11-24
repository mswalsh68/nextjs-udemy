import Mealitem from './mealitem';
import classes from './mealsgrid.module.css';
import type { Meal } from '@/data/data';

type MealsGridProps = {
  meals: (Meal & { id: number })[];
};


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
