import styles from '../page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>
          <Link href={'/explore'}>explore</Link>
        </h1>
      </div>
    </main>
  )
}
