import Link from 'next/link';
import Image from 'next/image';

import classes from './mealitem.module.css';

export type MealitemProps = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
};

export default function Mealitem({ title, slug, image, summary, creator }: MealitemProps) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}