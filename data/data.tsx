import { Meal } from '@/app/types/types';
import { executeStoredProcedure } from './sqlConnection';

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

export async function saveMeal(meal: Meal): Promise<void> {
  console.log('Attempting to save meal:', {
    title: meal.title,
    slug: meal.slug,
    image: meal.image,
    creator: meal.creator,
    creator_email: meal.creator_email,
    summaryLength: meal.summary.length,
    instructionsLength: meal.instructions.length,
  });

  try {
    const result = await executeStoredProcedure('dbo.spSaveMeal', {
      Title: meal.title,
      Summary: meal.summary,
      Instructions: meal.instructions,
      Image: meal.image,
      Creator: meal.creator,
      Creator_Email: meal.creator_email,
      Slug: meal.slug,
    });

    console.log('Meal saved successfully:', meal.slug, 'Result:', result);
  } catch (error) {
    console.error('Failed to save meal to database (see SQL error log above)');
    throw new Error('Failed to save meal to database');
  }
}