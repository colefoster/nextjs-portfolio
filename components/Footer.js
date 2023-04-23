import styles from './Footer.module.css'
import Link from 'next/link'
export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Link href="/emojis">
      <svg className='w-10 h-10 text-white fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="20 0 200 100"><text y=".9em" font-size="90">😻🐶</text></svg>
      </Link>
      </footer>
    </>
  )
}
