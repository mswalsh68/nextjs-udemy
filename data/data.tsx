import { Meal } from '@/app/types/types';
import { executeStoredProcedure } from './sqlConnection';



export async function getMeals(): Promise<Meal[]> {
      let meals: Meal[] = [];
  try {
    meals = await executeStoredProcedure('dbo.spGetMeals');
    return meals;
    } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch meal data');
  }
}


export async function getMealDetails(slug: string): Promise<Meal[]> {
  let meals: Meal[] = [];
  try {
    meals = await executeStoredProcedure('dbo.spGetMealDetails', {
      slug: slug,
    });
    return meals;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data for this meal');
  }
}
