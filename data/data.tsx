import { executeStoredProcedure } from './sqlConnection';

 export type Meal = {
    id: number;
	  slug: string;
	  title: string;
	  image: string;
	  summary: string;
	  instructions: string;
	  creator: string;
	  creator_email: string;
};


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

