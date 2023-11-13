import { Agent, CredentialEventTypes, CredentialState, CredentialStateChangedEvent } from '@aries-framework/core'

/**
 * Wait for a credential to be in the wallet
 * @param agent
 */
export default async function waitForCredentialInWallet(agent: Agent) {
  return new Promise((resolve) => {
    agent.events.on<CredentialStateChangedEvent>(
      CredentialEventTypes.CredentialStateChanged,
      async ({ payload }) => {
        if (payload.credentialRecord.state === CredentialState.Done) {
          resolve(payload.credentialRecord)
        }
      }
    )
  })
}