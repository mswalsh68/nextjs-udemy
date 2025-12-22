 export type Meal = {
    id: number;
      slug: string;
      title: string;
      image: string | File;
      summary: string;
      instructions: string;
      creator: string;
      creator_email: string;
};

export type MealsGridProps = {
  meals: (Meal & { id: number })[];
};

