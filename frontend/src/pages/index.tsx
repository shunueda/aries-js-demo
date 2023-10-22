import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import 'dotenv/config'
import { FormEvent, useState } from 'react'

const API_URL = "http://localhost:4000"

export default function Home() {
  const [did, setDid] = useState('')
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    setDid(data.did)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.header}>Register DID from seed</h1>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input type='text' name='seed' className={styles.input} placeholder='Enter your seed...' />
            <button type='submit' className={styles.button}>Submit</button>
          </div>
          {did && <p className={styles.didText}>Your DID: <span className={styles.didValue}>{did}</span></p>}
        </form>
      </main>
    </>
  )
}
