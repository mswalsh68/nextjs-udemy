import { Meal } from '@/app/types/types';
import { executeStoredProcedure } from './sqlConnection';
import NotFound from '@/app/meals/not-found';



export async function getMeals(): Promise<Meal[]> {
  try {
    const meals:Meal[] = await executeStoredProcedure('dbo.spGetMeals');
    
    return meals ?? [];

    } catch (error) {
    console.error('Error fetching meals:', error);
    throw new Error('Failed to fetch meals');
  }
}


export async function getMealDetails(slug: string): Promise<Meal> {
  
  try {
    const meals: Meal[] = await executeStoredProcedure('dbo.spGetMealDetails', {
      slug: slug,
    });
    return meals[0];
  } catch (error) {
    console.error('Error fetching meal:', error);
    throw new Error('Failed to lead meal');
  }
}
