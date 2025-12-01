import Image from 'next/image';
import classes from  './page.module.css';
import { getMealDetails } from '../../../data/data';
import Error from '@/app/error';

export default async function MealsDetail({params}: {params: {slug: string}}) {
  const {slug} = params;
  const meals = await getMealDetails(slug); // returns an array

  if (meals.length === 0) {
    return <Error />;
  }         
  // Now we know meals[0] exists
  const meal = meals[0];
  
  return (
    <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image src={meal.image}      
              alt={meal.title}
              fill
        />
      </div>
      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creator}>
          by <a href={`mailto${'EMAIL'}`}>NAME</a>
        </p>
        <p className={classes.summary}>
          SUMMARY
        </p>
      </div>
    </header>

    <main>
      <p className={classes.instructions} dangerouslySetInnerHTML={{
        __html: '...',
      }}
      ></p>
    </main>

    </>
  )
}
