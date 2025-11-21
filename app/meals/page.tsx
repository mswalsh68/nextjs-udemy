import Link from 'next/link'
import React from 'react'

export default function MealsPage() {
  return (
    <main>
        <div>
            Meals Page
        </div>
        <p>
            <Link href="/meals/meal-1">Meal 1</Link>
            <Link href="/meals/meal-2">Meal 2</Link>
        </p>
    </main>
  )
}
