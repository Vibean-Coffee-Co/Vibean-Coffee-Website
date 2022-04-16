import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vibean Coffee | Chikmagaluru</title>
        <meta name="description" content="Vibean Coffee | Chikmagaluru" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <h1 className="text-3xl">
      Vibean Coffee
      </h1>
    </div>
  )
}
