import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to Meal Sharing App</h1>
        <p>
          <Link href="/meals">View Meals</Link>
          <Link href="/meals/share">Share Meals</Link>
          <Link href="/community">Community Page</Link>
        </p>
      </main>
    </div>
  );
}
