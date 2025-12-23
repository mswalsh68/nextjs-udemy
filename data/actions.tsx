// app/meals/share/actions.ts
'use server';

import { redirect } from 'next/navigation';
import slugify from 'slugify';
import xss from 'xss';
import path from 'path';
import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import { saveMeal } from './data';
import { Meal, MealFormData } from '@/app/types/types'; // Import both types

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Configure Cloudinary (uses env vars)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function shareMeal(formData: FormData) {
 // Extract and type the incoming form data
  const mealData: MealFormData = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
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
    throw new Error('Please fill in all required fields and upload a valid image.');
  }

  // Sanitize instructions
  const cleanInstructions = xss(mealData.instructions.trim());

  // Generate slug
  const slug = slugify(mealData.title.trim(), { lower: true, strict: true });

  // Handle image upload
  const extension = path.extname(mealData.image.name).toLowerCase();
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  if (!allowedExtensions.includes(extension)) {
    throw new Error('Invalid image format. Only JPG, JPEG, PNG, GIF, and WebP are allowed.');
    }

  let imageUrl: string;

  // PRODUCTION: Upload to Cloudinary
  if (process.env.NODE_ENV === 'production') {
    const buffer = Buffer.from(await mealData.image.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'meals',           // optional: organize in a folder
          public_id: slug,           // use slug as filename (unique per meal title)
          overwrite: true,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    imageUrl = uploadResult.secure_url; // HTTPS URL from Cloudinary CDN
  } else {
    // LOCAL DEV: Save to public/images (optional — for quick testing)
    const fileName = `${slug}${extension}`;
    const filePath = path.join(IMAGES_DIR, fileName);

    await fs.mkdir(IMAGES_DIR, { recursive: true });

    const buffer = Buffer.from(await mealData.image.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    imageUrl = `/images/${fileName}`;
  }

  /// Build the final Meal object for database insertion
  const meal = {
    title: mealData.title.trim(),
    summary: mealData.summary.trim(),
    instructions: cleanInstructions,
    image: imageUrl,
    creator: mealData.creator.trim(),
    creator_email: mealData.creator_email.trim(),
    slug,
  };

  // Save to database using your separated function
  await saveMeal(meal);

  // Redirect to meals list on success
  redirect('/meals');
}

/*
// Define final filename and path
  const fileName = `${slug}${extension}`;
  const filePath = path.join(IMAGES_DIR, fileName);

  // Ensure directory exists
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  // Save image file
  const buffer = Buffer.from(await mealData.image.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  // Public URL for the saved image
  const imageUrl = `/images/${fileName}`;

  */