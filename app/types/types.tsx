// For data fetched from database or used for display
export type Meal = {
  id?: number;
  slug: string;
  title: string;
  image: string;              // Always a string URL when from DB
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

// For data coming from the share meal form (during creation/upload)
export type MealFormData = {
  title: string;
  summary: string;
  instructions: string;
  image: File;                // Always a File during upload
  creator: string;
  creator_email: string;
};

export type MealsGridProps = {
  meals: (Meal & { id: number })[];
};

