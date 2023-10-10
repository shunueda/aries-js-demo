import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import 'dotenv/config'
import { FormEvent } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>Register DID from seed</div>
        <form onSubmit={onSubmit}>
          <input type='text' name='name' />
          <button type='submit'>Submit</button>
        </form>
      </main>
    </>
  )
}
