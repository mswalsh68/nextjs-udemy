import { Meal } from '@/app/types/types';
import { executeStoredProcedure } from './sqlConnection';
import { notFound } from 'next/navigation';



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
    if (meals.length === 0) {
      notFound(); // This triggers Next.js 404 page automatically
    }
    return meals[0];
  } catch (error) {
    console.error('Error fetching meal:', error);
    throw new Error('Failed to lead meal');
  }
}
