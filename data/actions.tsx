// app/meals/share/actions.ts
'use server';

import { redirect } from 'next/navigation';
import slugify from 'slugify';
import xss from 'xss';
import path from 'path';
import fs from 'fs/promises';
import { saveMeal } from './data';
import { Meal } from '@/app/types/types';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

export async function shareMeal(formData: FormData) {
  // Extract form data
  const mealData = {
    title: formData.get('title') as string | null,
    summary: formData.get('summary') as string | null,
    instructions: formData.get('instructions') as string | null,
    image: formData.get('image') as File | null,
    creator: formData.get('name') as string | null,
    creator_email: formData.get('email') as string | null,
  };

  // Validation
  if (
    !mealData.title?.trim() ||
    !mealData.summary?.trim() ||
    !mealData.instructions?.trim() ||
    !mealData.creator?.trim() ||
    !mealData.creator_email?.trim() ||
    !mealData.image ||
    mealData.image.size === 0
  ) {
    throw new Error('Please fill in all fields and upload a valid image.');
  }

  // Sanitize instructions
  const cleanInstructions = xss(mealData.instructions.trim());

  // Generate slug
  const slug = slugify(mealData.title.trim(), { lower: true, strict: true });

  // Handle image upload
  const extension = path.extname(mealData.image.name).toLowerCase();
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  if (!allowedExtensions.includes(extension)) {
    throw new Error('Invalid image format. Allowed: JPG, PNG, GIF, WebP');
  }

  const fileName = `${slug}${extension}`;
  const filePath = path.join(IMAGES_DIR, fileName);

  // Ensure directory exists
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  // Save image file
  const buffer = Buffer.from(await mealData.image.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const imageUrl = `/images/${fileName}`;

  // Build final Meal object
  const meal: Meal = {
    id: 0, // id will be set by the database
    title: mealData.title.trim(),
    summary: mealData.summary.trim(),
    instructions: cleanInstructions,
    image: imageUrl,                    // now a string (URL)
    creator: mealData.creator.trim(),
    creator_email: mealData.creator_email.trim(),
    slug,
  };

  // Save to database using your separated function
  await saveMeal(meal);

  // Redirect to meals list on success
  redirect('/meals');
}