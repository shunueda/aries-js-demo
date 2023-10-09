import { rm } from 'fs/promises'
import { homedir } from 'os'
import { Agent } from '@aries-framework/core'

export async function purgeDb(agent: Agent) {
  try {
    await rm(`${homedir()}/.afj/data/wallet/${agent.config.walletConfig?.id}`, {
      force: true,
      recursive: true,
    })
  } catch (_) {
    console.log("No cache to purge - skipping")
  }
}