import Link from "next/link"
import { Suspense } from "react"

import classes from './page.module.css'
import MealsGrid from "./meals-grid"
import { getMeals } from "@/lib/meals"

export const metadata = {
    title: 'All meals',
    description: 'Browse our delicious meals!',
};

async function Meals() {
    const meals = await getMeals();

    return (
        <MealsGrid meals={meals} />
    )
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created <span className={classes.highlight}>by you!</span></h1>
                <p>Chooe your favourite recipe. Its easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share your favourite recipe!</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}