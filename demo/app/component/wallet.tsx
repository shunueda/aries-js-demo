'use client'
import { FormEvent, useState } from 'react'
import { Wallet, WalletConfig } from '@aries-framework/core'

export default function Wallet() {
  const [wallet, setWallet] = useState<WalletConfig>({
    id: 'default',
    key: 'key'
  })

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(formData.get('wallet_id'))
    console.log(formData.get('wallet_key'))
    const response = await fetch('http://localhost:4000/api/wallet/open', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    setWallet({
      id: data.id,
      key: data.key
    })
  }

  return (
    <div>
      <h3>Current Wallet</h3>
      <p>Wallet ID: {wallet.id}</p>
      <p>Wallet Key: {wallet.key}</p>
      <h3>Change Wallet</h3>
      <form onSubmit={onSubmit}>
        <input type='text' name='wallet_id' placeholder='Wallet ID' />
        <input type='text' name='wallet_key' placeholder='Wallet Key' />
        <button type='submit'>Open</button>
      </form>
    </div>
  )
}
