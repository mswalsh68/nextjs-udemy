import Image from 'next/image';
import classes from  './page.module.css';
import { getMealDetails } from '../../../data/data';
import Error from '@/app/error';
import { Meal } from '@/app/types/types';
import { notFound } from 'next/navigation';

export default async function MealsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;          // You added the await → error gone!
  const meal = await getMealDetails(slug);

  if (!meal) notFound();
  
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
