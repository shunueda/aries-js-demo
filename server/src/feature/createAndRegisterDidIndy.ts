import { Issuer } from '../agent/issuer'
import { KeyType, TypedArrayEncoder } from '@aries-framework/core'
import fetchJson from '../util/fetch'
import { RegisteredDid } from '../models/RegisteredDid'

/**
 * Create and register a DID Indy
 * @param issuer
 * @param seed
 */
export default async function createAndRegisterDidIndy(issuer: Issuer, seed: string) {
  const indyDid = await createDidIndy(seed)
  await issuer.dids.import({
    did: indyDid,
    overwrite: true,
    privateKeys: [
      {
        privateKey: TypedArrayEncoder.fromString(seed),
        keyType: KeyType.Ed25519
      }
    ]
  })
  return indyDid
}

export async function createDidIndy(seed: string) {
  const unqualifiedIndyDid = (await fetchJson<RegisteredDid>('http://test.bcovrin.vonx.io/register', {
    method: 'POST',
    body: JSON.stringify({
      role: 'ENDORSER',
      alias: null,
      did: null,
      seed
    })
  })).did
  return `did:indy:bcovrin:test:${unqualifiedIndyDid}`
}