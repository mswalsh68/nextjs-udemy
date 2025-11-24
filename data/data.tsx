import { executeStoredProcedure } from './sqlConnection';

 type Cheesecake = {
    id: number;
	  slug: string;
	  title: string;
	  image: string;
	  summary: string;
	  instructions: string;
	  creator: string;
	  creator_email: string;
};


export async function spGetItemBycategory( CategoryID: number): Promise<Cheesecake[]> {
      let products: Cheesecake[] = [];
  try {
    products = await executeStoredProcedure('dbo.spGetItemBycategory', {
      CategoryID: CategoryID,
    });
    return products;
    } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch cheesecake data');
  }
}


export async function spGetFeaturedItem(): Promise<Cheesecake[]> {
  let products: Cheesecake[] = [];
  try {
    products = await executeStoredProcedure('dbo.spGetFeaturedItem', {
      Featured: 1,
    });
    return products;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch classic cheesecake data');
  }
}



export async function spGetSingleItem(id: number): Promise<Cheesecake[]> {
  let products: Cheesecake[] = [];
  try {
    products = await executeStoredProcedure('dbo.spGetSingleItem', {
      FlavorID: id,
    });
    return products;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch classic cheesecake data');
  }
}